<template>
  <div
    class="c-product-image"
    :class="className"
  >
    <a
      :href="url"
      class="c-product-image__link"
    >
      <picture>
        <source
          :srcset="`${src}-1490.webp`"
          type="image/webp"
          media="(min-width: 768px)"
        />
        <source
          :srcset="`${src}-1490.jpg`"
          type="image/jpg"
          media="(min-width: 768px)"
        />
        <source
          :srcset="`${src}-745.webp`"
          type="image/webp"
          media="(min-width: 640px)"
        />
        <source
          :srcset="`${src}-745.jpg`"
          type="image/jpg"
          media="(min-width: 640px)"
        />
        <source
          :srcset="`${src}-606.webp`"
          type="image/webp"
          media="(min-width: 500px)"
        />
        <source
          :srcset="`${src}-606.jpg`"
          type="image/jpg"
          media="(min-width: 500px)"
        />
        <source
          :srcset="`${src}-504.webp`"
          type="image/webp"
          media="(min-width: 400px)"
        />
        <source
          :srcset="`${src}-504.jpg`"
          type="image/jpg"
          media="(min-width: 400px)"
        />
        <source
          :srcset="`${src}-334.webp`"
          type="image/webp"
          media="(min-width: 200px)"
        />
        <source
          :srcset="`${src}-334.jpg`"
          type="image/jpg"
          media="(min-width: 200px)"
        />
        <img
          :src="`${src}-1490.jpg`"
          :alt="`${ name } - Product number ${ sku }`"
          class="c-product-image__src"
          loading="lazy"
        />
      </picture>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'ProductImage',

    props: {
      src: {
        type: String,
        required: true
      },

      name: {
        type: String,
        required: true
      },

      sku: {
        type: Number,
        required: true
      },

      url: {
        type: URL,
        required: true
      },

      className: {
        type: String,
        required: false
      }
    }
  };
</script>

<style lang="scss">
	@use "../../../assets/styles/functions" as f;

	.c-product-image {
		margin: 0 auto;
		width: clamp(f.rem(107px), 100%, f.rem(210px));

		&__link {
			display: block;
			text-decoration: none;
		}

		&__src {
			width: 100%;
		}
	}
</style>
