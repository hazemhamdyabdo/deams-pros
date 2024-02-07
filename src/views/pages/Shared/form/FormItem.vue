<template>
  <div>
    <label :for="id">{{ label }}</label>
    <template v-if="inputType === 'text' || inputType === 'number'">
      <input
        :style="$attrs.style"
        :type="inputType"
        :id="id"
        :name="name"
        :value="value"
        @input="handleInput"
        @blur="handleBlur"
      />
    </template>
    <template v-else-if="inputType === 'select'">
      <select
        :id="id"
        :name="name"
        :value="value"
        @input="handleInput"
        @blur="handleBlur"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator: (value) => ["text", "number", "select"].includes(value),
    },
    validation: {
      type: Function,
      default: () => true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  computed: {
    inputType() {
      return ["text", "number", "select"].includes(this.type)
        ? this.type
        : "text";
    },
  },
  methods: {
    handleInput(event) {
      const inputValue = event.target.value;

      if (this.validation(inputValue)) {
        this.errorMessage = "";
        this.$emit("update:value", inputValue);
      } else {
        this.errorMessage = "Invalid input";
      }
    },
    handleBlur() {
      // add validation or actions on blur if needed
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  border: none;
  border: 1px solid rgb(197, 196, 196);
  height: 2.5rem;
  border-radius: 4px;
}
select {
  width: 100%;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid rgb(197, 196, 196);
}

option {
  font-size: 1rem;
}
</style>
