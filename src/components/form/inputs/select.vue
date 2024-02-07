<template>
  <vue-select v-model="selectedValue" :options="optionsData" @input="handleChange" label="customInput" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    labelText: String,
    options: Array,
    label: String,
  },
  data() {
    return {
      selectedValue: this.value,
    };
  },
  computed: {
    optionsData() {
      return this.options.map((item) => ({
        id: item.id,
        text: item[this.label],
        ...item, // Adding arabicNamee to preserve it
      }));
    },
  },
  methods: {
    handleChange(newValue) {
      console.log(newValue)
      this.selectedValue = newValue;
      this.$emit('input', newValue);
    },
  },
  watch: {
    value(newValue) {
      this.selectedValue = newValue;
    },
  },
};
</script>

<style>
/* Any necessary styles */
.form-select.is-valid:not([multiple]):not([size]),
.form-select.is-valid:not([multiple])[size='1'],
.was-validated .form-select:valid:not([multiple]):not([size]),
.was-validated .form-select:valid:not([multiple])[size='1'] {
  background-image: url('https://cdn4.iconfinder.com/data/icons/ios-edge-glyph-3/25/Down-Carrot-512.png') !important;
}

.form-select.is-valid,
.was-validated .form-select:valid {
  border-color: darkgray !important;
}

select option:hover {
  background-color: #ff9f43 !important;
  color: white !important;
  padding: 4px !important;
}
</style>