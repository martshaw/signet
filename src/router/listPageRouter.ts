/* eslint-disable vue/max-len, max-len */
// Packages
import historyRouter from 'instantsearch.js/es/lib/routers/history';

// Middleware
import {
  beautifyURLToRefinementURL,
  refinementURLToBeautifyURL
} from '@/middleware/URLTransform';
import { StateMapping, UiState } from 'instantsearch.js';
/* eslint-enable max-len, vue/max-len */

type RouteState = {
  [key: string]: string[] | string
}

const trackingId = [
  'utm_medium',
  'cm_mmc',
  '_$ja',
  'gclid',
  'wgu',
  'wgexpiry',
  'xnpe_tifc',
  'cid',
  'utm_source',
  'utm_campaign'
];
let count = 0;

const stateMapping: StateMapping<UiState, RouteState> = {
  /**
   * This runs to step up the UI and when ever the UI changes. The state
   * is passed onto createURL method
   */
  stateToRoute (uiState) {
    const indexUiState =
      uiState[window.Signet.VUE_APP_ALGOLIA_SEARCH_INDEX_PRODUCTS as string];

    // Break down all the refinements into there own categories
    const { refinementList, toggle, range, ratingMenu } = indexUiState;
    const refinements = Object.create(null);
    const toggleSwitches = Object.create(null);
    const rangeRefinement = Object.create(null);
    const ratingRefinement = Object.create(null);

    if (refinementList) {
      for (const indexUiStateKey in refinementList) {
        refinements[indexUiStateKey] = refinementList[indexUiStateKey];
      }
    }

    if (toggle) {
      for (const indexUiStateKey in toggle) {
        toggleSwitches[indexUiStateKey] = toggle[indexUiStateKey];
      }
    }

    if (range) {
      for (const indexUiStateKey in range) {
        rangeRefinement[indexUiStateKey] = range.current_price;
      }
    }

    if (ratingMenu) {
      for (const indexUiStateKey in ratingMenu) {
        ratingRefinement[indexUiStateKey] = ratingMenu.avg_overall_rating;
      }
    }

    const cat = indexUiState.menu && indexUiState.menu['category.lvl0'];

    return {
      query: indexUiState.query,
      'category.lvl0': cat,
      ...refinements,
      ...toggleSwitches,
      ...ratingRefinement,
      ...rangeRefinement
    };
  },

  /**
   * This runs when the page reloads. it will send the state from the URL
   * down to 'stateToRoute' so the UI can be updated
   */
  routeToState (routeState) {
    const refinements = Object.create(null);
    const toggleSwitches = Object.create(null);
    const rangeRefinement = Object.create(null);
    const ratingRefinement = Object.create(null);

    for (const routeStateKey in routeState) {
      switch (routeStateKey) {
        case 'on_sale_calc':
        case 'instock_website':
          toggleSwitches[routeStateKey] =
            JSON.parse(<string>routeState[routeStateKey]) as boolean;
          break;

        case 'current_price':
          rangeRefinement[routeStateKey] = routeState.current_price[0];
          break;

        case 'avg_overall_rating':
          ratingRefinement[routeStateKey] =
            parseFloat(routeState.avg_overall_rating[0]);
          break;

        default: {
          let refinement = routeState[routeStateKey];

          if (Array.isArray(refinement)) {
            refinement = refinement.map((entry: string) => {
              const separateWord = entry.toLowerCase().split(' ');
              for (let i = 0; i < separateWord.length; i++) {
                separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                  separateWord[i].substring(1);
              }
              return separateWord.join(' ');
            });
          }

          refinements[routeStateKey] = refinement;
          break;
        }
      }
    }

    /*
      As all the refinements are an Array but category lvl0 has to be
      a string.
      Some times this comes in as an array on Safari sometimes not.
     */
    const cat0 = routeState['category.lvl0'];
    const getCategory = cat0 && Array.isArray(cat0)
      ? routeState['category.lvl0'][0] : cat0;

    return {
      [window.Signet.VUE_APP_ALGOLIA_SEARCH_INDEX_PRODUCTS as string]: {
        query: routeState.query ? routeState.query[0] : undefined,
        menu: {
          'category.lvl0': getCategory
        },
        refinementList: {
          ...refinements
        },
        toggle: {
          ...toggleSwitches
        },
        range: {
          ...rangeRefinement
        },
        ratingMenu: {
          ...ratingRefinement
        }
      }
    };
  }
};

const router = historyRouter<RouteState>({
  windowTitle ({ category, query }) {
    const queryTitle = query ? `Results for "${query}"` : 'Search';

    if (category) {
      return `${category} – ${queryTitle}`;
    }

    return queryTitle;
  },
  createURL ({ qsModule, location, routeState }) {
    const queryParameters = Object.create(null);
    const urlParts = location.href.match(/^(.*?)\/l\//);
    const baseUrl = `${urlParts ? urlParts[0] : ''}`;

    for (const routeStateKey in routeState) {
      const hasQuery = routeStateKey === 'query' && routeState.query;
      const hasCategory = routeStateKey === 'category.lvl0' &&
        routeState['category.lvl0'];

      if (hasQuery && typeof routeState.query === 'string') {
        queryParameters.query = routeState.query;
      } else if (
        hasCategory && typeof routeState[routeStateKey] === 'string'
      ) {
        queryParameters[routeStateKey] = routeState['category.lvl0'];
      } else {
        // If the type is any think else just do an assignment
        queryParameters[routeStateKey] = routeState[routeStateKey];
      }
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: 'repeat'
    });

    const urlToBeautifyURL = refinementURLToBeautifyURL(queryString);
    console.log('routeState', urlToBeautifyURL);
    return `${baseUrl}${urlToBeautifyURL}`;
  },

  parseURL ({ qsModule, location }) {
    const { query = '' } = qsModule.parse(
      location.search.slice(1)
    );
    const beautifyURL = beautifyURLToRefinementURL(location);
    const params = beautifyURL || location.search;

    const refinements = Object.create(null);
    const searchParams = new URLSearchParams(params);
    const campaignIds: string[] = [];

    // if (count === 1) {
    //   return;
    // }
    for (const pair of searchParams.entries()) {
      const refinementName = pair[0].replace('/webstore/l/?', '');

      /*
       Check the search query for campaign tracking id's if one is found
       don't add it to the Algolia data
      */

      if (!trackingId.includes(refinementName)) {
        if (searchParams.getAll(refinementName).length > 1) {
          refinements[refinementName] = searchParams.getAll(refinementName);
        } else {
          console.log('here2', refinementName, pair[1]);
          // We need to put the values in an Array
          refinements[refinementName] = [pair[1]];
        }
      } else {
        // As we have found tracking ID we need to add them back to the URL
        campaignIds.push(refinementName.concat('=', encodeURI(pair[1])));
      }
    }

    if (campaignIds.length > 0) {
      setTimeout(() => {
        window.history.replaceState({}, '',
          `${location.pathname}?${campaignIds.join('&')}`);
      }, 900);
    }
    count = +1;
    return {
      query: decodeURIComponent(query as string),
      ...refinements
    };
  }
});

const listPageRouter = {
  router,
  stateMapping
};

export default listPageRouter;
