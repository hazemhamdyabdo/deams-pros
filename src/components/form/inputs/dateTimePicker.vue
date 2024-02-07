<template>
  <b-form-group :label="$t($attrs['label-text'])">
    <ValidationProvider
      ref="fieldValidator"
      v-slot="{ errors }"
      :rules="rules || ''"
      :vid="$attrs.name || ''"
      mode="eager"
    >
      <flat-pickr
        :value="inputValue"
        class="form-control"
        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i:S' }"
        @input="(v) => changeValue(v)"
      />
      <small class="text-danger">{{ errors[0] }}</small>
    </ValidationProvider>
  </b-form-group>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import flatPickr from "vue-flatpickr-component";

export default {
  components: {
    ValidationProvider,
    flatPickr,
  },
  props: {
    dir: {
      type: String,
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value"],
  data() {
    return {
      inputValue: "",
    };
  },
  mounted() {
    this.inputValue = this.getDate(this.value, true);
    this.changeValue(this.inputValue);
  },
  watch: {
    value(newVale) {
      this.inputValue = this.getDate(newVale, true);
      this.changeValue(this.inputValue);
    },
  },
  methods: {
    changeValue(val) {
      val = val || "";
      val = val.replace(" ", "T");
      this.$emit("update:value", val);
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
