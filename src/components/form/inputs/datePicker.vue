<template>
  <label> {{ $t($attrs["label-text"]) }}</label>
  <datepicker
    v-model="inputValue"
    :required="rules ? true : false"
    aria-labels="date"
    :min-date="min"
    :locale="locale"
    :dir="dir"
    :format="format"
    :enable-time-picker="disableTime"
    @update:model-value="handleDate"
    :disabled="disabled"
  />
</template>

<script>
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  props: {
    dir: {
      type: String,
      default: "rtl",
    },
    disableTime: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      default: "ar-EG",
    },
    modelValue: {
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
    min: {
      type: Date,
      default: new Date(),
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      inputValue: "",
      fiscalYearStart: "",
      fiscalYearEnd: "",
      date: new Date(),
    };
  },
  beforeMount() {
    this.fiscalYearStart =
      JSON.stringify(this.currentYear) !== "{}"
        ? this.currentYear.startDate
        : this.company.fiscalYearStart;
    this.fiscalYearEnd =
      JSON.stringify(this.currentYear) !== "{}"
        ? this.currentYear.endDate
        : this.company.fiscalYearEnd;
  },
  mounted() {
    this.inputValue = this.getDate(this.value);
    if (this.$attrs.name === "fromDate") {
      this.inputValue = this.getDate(this.fiscalYearStart);
    }
    if (this.$attrs.name === "toDate") {
      this.inputValue = this.getDate(this.fiscalYearEnd);
    }
    this.format(this.inputValue);
  },
  methods: {
    format(val = this.date) {
      const date = new Date(val);
      // Get day, month, and year
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();

      // Construct formatted date string
      return `${day}/${month}/${year}`;
    },
    handleDate(val) {
      val = this.format(val) || "";
      this.$emit("update:modelValue", val);
    },
  },
  watch: {
    inputValue(newVale) {
      const formattedDate = this.getDate(newVale);
      this.$emit("update:modelValue", formattedDate);
    },
  },
};
</script>

<style></style>
