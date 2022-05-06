type StatusCode = 301 | 404 | 500

/**
 * Returns a number of error messages based the re response we get back form
 * the server
 *
 * @arg statusCode
 */
export const errorHandling = (statusCode: StatusCode) => {
  switch (statusCode) {
    case 301:
      return 'A redirect happened can we get this fixed please';

    case 404:
      return 'The URL is pointing to the wrong location, getting a 404 back';

    case 500:
      return 'Getting a 500 response back from the server';

    default:
      return 'A unknown error has occurred';
  }
};
