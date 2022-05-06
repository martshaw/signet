<template>
  <div class="c-marketing-sign">
    <input
      id="labelled-by-marketing-sign-label"
      class="
        c-marketing-sign__checkbox
        u-visually-hidden
      "
      type="checkbox"
      :checked="checkedvalue"
      @change="optForMarketing"
    />
    <label
      class="c-marketing-sign__label"
      :class="{'c-marketing-sign__label--important':applyImportant}"
      for="labelled-by-marketing-sign-label"
    >
      If you would like to sign up for marketing emails from Ernest Jones
      to keep up to date with the best offers, trends and styles,
      please tick this box
    </label>
  </div>
</template>

<script>
  export default {
    name: 'ProductMarketingSign',
    props: {
      mncVal: {
        type: Boolean,
        required: true
      },
      applyImportant: {
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        checkedvalue: false
      };
    },
    created () {
      this.checkedvalue = this.mncVal;
    },
    methods: {
      optForMarketing: function () {
        this.checkedvalue = !this.checkedvalue;
        this.$emit('update', this.checkedvalue);
      }
    }
  };
</script>

<style lang="scss" scoped>
	@use "../../../assets/styles/variables" as v;
	@use "../../../assets/styles/functions" as f;
	@use "../../../assets/styles/utilities" as u;

	.c-marketing-sign {
		display: block;
		margin-bottom: f.rem(15px);
		font-size: f.rem(13px);
		margin-top: f.rem(15px);

		&__checkbox {
			padding: 0;
			height: initial;
			width: initial;
			margin-bottom: 0;
			cursor: pointer;

			&:focus + label {
				outline: f.rem(1px) dotted;
			}
		}

		&__label {
			position: relative;
			cursor: pointer;
			font-size: f.rem(13px);
			color: v.$text-black;

			&--important {
				line-height: f.rem(21px);
				font-size: f.rem(16px);
				display: block;
				padding-left: f.rem(28px);
				text-indent: f.rem(-28px);
			}
		}
	}

	.c-marketing-sign label:before {
		content: "";
		-webkit-appearance: none;
		background-color: transparent;
		border: f.rem(1px) solid v.$text-black;
		padding: f.rem(8px);
		display: inline-block;
		position: relative;
		vertical-align: middle;
		cursor: pointer;
		margin-right: f.rem(5px);
	}

	.c-marketing-sign input:checked + label:after {
		content: "";
		display: block;
		position: absolute;
		top: f.rem(3px);
		left: f.rem(7px);
		width: f.rem(4px);
		height: f.rem(10px);
		border: solid v.$text-black;
		border-width: 0 f.rem(1px) f.rem(1px) 0;
		transform: rotate(45deg);
	}
</style>
