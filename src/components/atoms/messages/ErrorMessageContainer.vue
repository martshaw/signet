<template>
  <ul class="c-error-container">
    <li>
      <slot />
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'ErrorMessageContainer'
  };
</script>

<style lang="scss">
	@use "../../../assets/styles/variables" as v;
	@use "../../../assets/styles/functions" as f;

	.c-error-container {
		color: v.$checkout-invalid-entry;
		font-family: v.$body-font;
		font-size: f.rem(13px);
		list-style: none;
		margin: 0;
		padding-left: 0;
	}
</style>
