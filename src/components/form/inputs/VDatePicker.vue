<template>
    <b-form-group :label="$t(label)">
      <v-menu v-model="isMenuOpen" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-text-field
            :model-value="formattedDate"
            readonly
            :placeholder="$t(label)"
            variant="outlined"
            v-bind="props"
            hide-details
            class="text-field"
            height="40px"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="selectedDate"
          hide-actions
          title=""
          :min="min"
          @input="isMenuOpen = false"
          :color="color"
        >
          <template v-slot:header></template> 
        </v-date-picker>
      </v-menu>
    </b-form-group>
  </template>

  <script>
  export default {
    props: {
      modelValue: {
        type: Date,
        default: new Date(),
      },
      label: {
        type: String,
        default: "",
      },
      color: {
        type: String,
        default: "",
      },
      min: {
        type: Date,
        default: new Date(),
      },
    },
    emits: ["update:modelValue"],
    data() {
      return {
        isMenuOpen: false,
        selectedDate: this.modelValue ? new Date(this.modelValue) : new Date(),
      };
    },
    computed: {
      formattedDate() {
        return this.selectedDate ? this.selectedDate?.toLocaleDateString("en-CA") : "";
      },
    },
    watch: {
      selectedDate(newVal) {
        const newDate = this.getDate(newVal);
        this.$emit("update:modelValue", newDate);
      },
    },
  };
  </script >
  <style  >
  .v-overlay__content:has(> .v-date-picker) {
    min-width: auto !important;
  }
  .v-picker-title {
    padding: 0 !important;
  }

  .v-field__input {
    padding-bottom: 30px !important;
    height: 10px !important;
  }
  .v-field__field {
    padding: 0 !important;
    height: 40px !important;
    border-radius: 4px !important;
    border: 1px solid #dee2e6 !important;
  }
   .v-field--variant-outlined .v-field__outline__end {
    border: 1px solid #dee2e6 !important;
    border-right: none !important;
  }
  .v-field--variant-outlined .v-field__outline__start {
    border: 1px solid #dee2e6 !important;
    border-left: none !important;
  } 
  .v-text-field input{
    border:none
  }
  </style>
