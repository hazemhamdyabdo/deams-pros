<template>
  <div>
    <FormInput
      id="username"
      name="username"
      label="Username"
      v-model="username"
      reqiued
      min-length="5"
      max-length="7"
    />
    <FormInput id="age" name="age" label="Age" type="number" v-model="age" />
    <FormInput
      id="gender"
      name="gender"
      label="Gender"
      type="select"
      :options="genderOptions"
      v-model="gender"
    />
  </div>
</template>

<script>
import FormInput from "./FormItem.vue";

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      username: "",
      age: null,
      gender: "",
      genderOptions: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    };
  },
  compouted: {
    validation() {
      return;
    },
  },
};
</script>
