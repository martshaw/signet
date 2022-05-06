<template>
  <div
    href="javascript:void(0)"
    class="--syte-start-camera-upload c-syte"
    :data-camera-button-placement="placement"
  >
    <svg
      viewBox="0 0 24 25"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      class="c-syte-icon"
    >
      <path
        d="M14.768 6.74162C14.6353 6.4264 14.3266 6.22141 13.9846
          6.22141H10.0154C9.67337 6.22141 9.36467 6.4264 9.23197 6.74162L8.7621
          7.85777H7.38462C6.22984 7.85777 5.15 8.67667 5.15 9.93505V14.8441C5.15
          16.1025 6.22984 16.9214 7.38462 16.9214H16.6154C17.7702 16.9214 18.85
          16.1025 18.85 14.8441V9.93505C18.85 8.67667 17.7702 7.85777 16.6154
          7.85777H15.2379L14.768 6.74162Z"
        stroke-width="1.7"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
      <circle
        cx="12"
        cy="12.0714"
        r="2.2"
        stroke-width="1.6"
      />
      <path
        d="M16 1.07141L20 1.07141C21.6569 1.07141 23 2.41456 23 4.07141L23
          8.07141"
        stroke-width="1.7"
      />
      <path
        d="M8 1.07141L4 1.07141C2.34315 1.07141 1 2.41456 1 4.07141L1 8.07141"
        stroke-width="1.7"
      />
      <path
        d="M23 16.0714L23 20.0714C23 21.7283 21.6569 23.0714 20 23.0714L16
          23.0714"
        stroke-width="1.7"
      />
      <path
        d="M8 23.0714L4 23.0714C2.34315 23.0714 1 21.7283 1 20.0714L1 16.0714"
        stroke-width="1.7"
      />
    </svg>

    <slot />
  </div>
</template>

<script>
  export default {
    name: 'SyteButton',

    props: {
      placement: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss" src="./syte.scss" />
