<template>
  <span
    v-if="badge.has('value')"
    class="product-badge"
    :style="badgeStyles"
  >
    {{ badge.get('value') }}
  </span>
</template>

<script>
  export default {
    name: 'ProductBadge',
    props: {
      badge: {
        type: Map,
        required: false
      }
    },
    computed: {
      badgeStyles () {
        return {
          color: this.badge.get('color'),
          background: this.badge.get('backgroundColor'),
          fontWeight: this.badge.get('fontWeight')
        };
      }
    }
  };
</script>

<style
  lang="scss"
  src="./product-badge.scss"
/>
