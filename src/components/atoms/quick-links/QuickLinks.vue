<template functional>
  <section class="quick-links">
    <ul
      class="quick-links__list"
    >
      <li
        v-for="link in props.links"
        :key="link.title"
        class="quick-links__item"
      >
        <a
          class="quick-links__link"
          :href="link.actionLink"
        >
          <img
            :src="link.imageUrl"
            :srcset="link.imageUrls ? link.imageUrls.join(',') : ''"
            sizes="(min-width: 64em) 94px, 55px"
            class="quick-links__image"
            alt=""
          />
          <span class="quick-links__item-title">{{ link.title }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'QuickLinks',
    props: {
      links: {
        type: Array,
        required: true
      }
    }
  });
</script>
