<template>
  <!-- eslint-disable vue/no-v-html -->
  <span
    class="c-product-offer"
    :class="theme"
    v-html="offer"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<script>
  export default {
    name: 'ProductFlag',

    props: {
      offer: {
        type: String
      },

      theme: {
        type: String
      }
    }
  };
</script>

<style lang="scss">
	@use "../../../assets/styles/variables" as v;
	@use "../../../assets/styles/functions" as f;

	.c-product-offer {
		background: #5d5c5c;
		border-radius: 0 f.rem(4px) f.rem(4px) 0;
		color: white;
		font-family: v.$body-font;
		font-size: f.rem(13px);
		padding: f.rem(7px) f.rem(20px) f.rem(9px);
		position: absolute;
		top: 0;
		left: 0;

		a {
			color: inherit;

			&:hover,
			&:focus {
				text-decoration: none;
			}
		}
	}

	.product-stock-badge {
		border: f.rem(1px) solid v.$product-stock-badge-border-color;
		border-radius: 0;
		padding: f.rem(7px);
		color: v.$product-stock-badge-border-color;
		font-size: f.rem(16px);
		background-color: v.$product-stock-badge-background-color;
		z-index: 1;
	}
</style>
