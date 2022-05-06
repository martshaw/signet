<script lang="ts">
/* eslint-disable max-len, vue/max-len */
  // Types
  import type LineItemBaseClass from '@/middleware/LineItemClasses/LineItemBaseClass';

  // Packages
  import Vue, { CreateElement, PropType, VNode } from 'vue';

  // Middleware

  // Services

  // Helpers

  // Stores

  // Atoms

  // Molecules

  // Organisms
  /* eslint-enable max-len, vue/max-len */

  export default Vue.extend({
    name: 'AdaptiveProductImage',
    functional: true,

    props: {
      product: {
        type: Object as PropType<LineItemBaseClass>,
        required: true
      },

      loading: {
        type: String,
        default: 'eager',
        required: false,
        validator: (value: string): boolean => /(eager)|(loading)/.test(value)
      },

      defaultSize: {
        type: String,
        default: '1490',
        required: false
      }
    },

    // eslint-disable-next-line no-undef
    render (createElement: CreateElement, { props, data }): VNode | VNode[] {
      const isPersonalised = props.product?.personalisedId;
      const imageOptions = {} as HTMLImageElement;
      // @ts-ignore
      const getSku = props.product.productSku || props.product.sku;
      // @ts-ignore
      const getImage = props.product.image || props.product.imageSrc;

      imageOptions.loading = props.loading.toString();
      imageOptions.alt = `${props.product.name} - Product number: ${getSku}`;
      imageOptions.src = getImage.toString();
      // @ts-ignore
      imageOptions.class = data.staticClass ? data.staticClass : null;

      if (typeof data.attrs !== 'undefined') {
        Object.keys(data.attrs).forEach((attribute: string) => {
          // @ts-ignore
          imageOptions[attribute] = data.attrs[attribute];
        });
      }

      if (!isPersonalised) {
        imageOptions.src = imageOptions.src
          .concat('-', props.defaultSize, '.jpg');
        imageOptions.srcset = `${getImage}-60.webp 60w,
        ${getImage}-100.webp 100w,
        ${getImage}-168.webp 168w,
        ${getImage}-200.webp 200w,
        ${getImage}-250.webp 250w,
        ${getImage}-291.webp 291w,
        ${getImage}-333.webp 333w,
        ${getImage}-504.webp 504w,
        ${getImage}-606.webp 606w,
        ${getImage}-745.webp 746w,
        ${getImage}-1490.webp 1490w`;
      }

      return createElement('img', {
        attrs: imageOptions
      });
    }
  });
</script>
