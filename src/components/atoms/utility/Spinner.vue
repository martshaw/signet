<template>
  <div
    class="lds-ring"
  >
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<script>
  export default {
    name: 'Spinner'
  };
</script>

<style>
	.lds-ring {
		display: inline-block;
		position: absolute;
		width: 80px;
		height: 80px;
		left: 50%;
		top: 50%;
		transform: translate(-50%);
	}

	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid #bcacd5;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(.5, 0, .5, 1) infinite;
		border-color: #bcacd5 transparent transparent transparent;
	}

	.lds-ring div:nth-child(1) {
		animation-delay: -.45s;
	}

	.lds-ring div:nth-child(2) {
		animation-delay: -.3s;
	}

	.lds-ring div:nth-child(3) {
		animation-delay: -.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
