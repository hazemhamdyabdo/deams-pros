<template>
  <b-form-group :label="hideLable ? '' : $t($attrs['label-text'])">
    <Field
      ref="fieldValidator"
      v-slot="{ errors }"
      :name="$t($attrs['label-text']) || $t($attrs['name'])"
      :id="$t($attrs['label-text']) || $t($attrs['name'])"
      :rules="rules || ''"
      v-model="localValue"
      @input="
        (v) => {
          handelInput(v);
        }
      "
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      :vid="name || $attrs['label-text'] || $attrs['name'] || ''"
      mode="eager"
    >
      <div class="q-mb-md">
        <b-input-group
          :size="attrs.size"
          class="mb-0"
          v-if="Object.keys($slots).length"
        >
          <template v-if="$slots.prepend" #prepend>
            <slot name="prepend" />
          </template>
          <template v-if="$slots.append" #append>
            <slot name="append" />
          </template>
          <component
            ref="input1"
            :is="field"
            :type="type"
            label="customInput"
            :placeholder="placeholder || ''"
            :options="testOptions"
            v-model="localValue"
            v-bind="{ ...attrs, ...bindOptions }"
            v-on="listeners"
            :id="$t($attrs['label-text']) || $t($attrs['name'])"
            :dir="dir"
            :disabled="disabled"
            :readonly="readonly"
            :multiple="multiple"
            @input="
              (v) => {
                handelInput(v);
              }
            "
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
            @option:selected="
              (v) => {
                $emit('change', v);
              }
            "
            @keyup.enter.prevent=""
            :state="errors && errors.length > 0 ? false : null"
            v-b-tooltip.hover.v-danger
            :title="toolTipError && errors ? errors[0] || '' : ''"
          >
            <template v-if="$attrs.field === 'select'" #no-options>
              {{ $t("Sorry, no matching options") }}
            </template>
          </component>
        </b-input-group>

        <component
          v-else
          ref="input2"
          :is="field"
          :id="$t($attrs['label-text']) || $t($attrs['name'])"
          :type="type"
          label="customInput"
          :placeholder="placeholder || ''"
          :options="testOptions"
          v-model="localValue"
          :name="$attrs['name'] || $attrs['label-text'] || ''"
          :multiple="multiple"
          v-bind="{ ...attrs, ...bindOptions }"
          v-on="listeners"
          :dir="dir"
          :disabled="
            disabled || ($attrs.name === 'code' && $route.params.id > 0)
          "
          :readonly="readonly"
          @change="onChange"
          @input="
            (v) => {
              handelInput(v);
            }
          "
          @focus="onFocus"
          @blur="onBlur"
          @wheel="$event.target.blur()"
          @option:selected="
            (v) => {
              $emit('change', v);
            }
          "
          :state="errors && errors.length > 0 ? false : null"
          v-b-tooltip.hover.v-danger
          :title="toolTipError && errors ? errors[0] || '' : ''"
          :class="{ rtl: $i18n.locale === 'ar' }"
        >
          <template v-if="$attrs.field === 'select'" #no-options>
            {{ $t("Sorry, no matching options") }}
          </template>
        </component>
        <small
          :class="{
            'd-none':
              (!$attrs['name'] && !$attrs['label-text']) || toolTipError,
          }"
          class="text-danger"
          >{{ errors[0] }}</small
        >
      </div>
    </Field>
  </b-form-group>
</template>

<script>
import { defineRule, Field, useField } from "vee-validate";

export default {
  components: {
    Field,
  },
  props: {
    label: {
      type: String,
    },
    filterFn: {
      type: Function,
      default: () => true,
    },
    options: {
      type: [Array, String],
      default: () => [],
    },
    dir: {
      type: String,
    },
    bindOptions: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: [Number, String, Object, Array],
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: String,
      default: "",
    },
    itemId: {
      type: String,
      default: "id",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    toolTipError: {
      type: Boolean,
      default: false,
    },
    hideLable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:value", "input", "change", "update:modelValue"],
  setup(props, context) {
    let { attrs } = context;

    const { name, placeholder, type, lookup } = attrs;

    let { field } = attrs;
    const { errorMessage, validate, value } = useField(attrs["label-text"]);

    if (field === "select") field = "vue-select";
    else field = "b-form-input";
    const errors = [];

    attrs = Object.entries(attrs).reduce((obj, val) => {
      /* eslint-disable prefer-destructuring */
      if (
        [
          "field",
          "name",
          "placeholder",
          "type",
          "lookup",
          ...Object.keys(props),
        ].indexOf(val[0]) === -1
      )
        obj[val[0]] = val[1];
      return obj;
    }, {});

    const updateAndValidate = () => {
      value.value = props.modelValue; // Update the value to trigger reactivity

      validate(); // Trigger revalidation
    };

    const listeners = Object?.entries(context.attrs).reduce((obj, val) => {
      if (["update:modelValue"].indexOf(val[0]) === -1) obj[val[0]] = val[1];
      return obj;
    }, {});

    return {
      name,
      type,
      placeholder,
      attrs,
      field,
      lookup,
      errors,
      listeners,
      errors: errorMessage,
      updateAndValidate,
    };
  },
  data() {
    return {
      selectData: [],
      localValue: "",
      isFocus: false,
      isDirty: false,
    };
  },
  watch: {
    options: {
      immediate: true,
      handler(newValue) {
        this.handeloptions(newValue);
      },
    },
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.localValue = newValue;
      },
    },
    localValue: {
      deep: true,
      handler(newValue) {
        this.emitValue(newValue);
      },
    },
  },
  computed: {
    testOptions() {
      return this.selectData
        .map((item) => ({
          id: item.id,
          text: item[this.label],
          ...item,
        }))
        .filter(this.selectData.length > 0 ? this.filterFn : () => true);
    },
  },
  methods: {
    handeloptions() {
      if (Array.isArray(this.options)) {
        this.selectData = this.options;
      } else {
        this.$store.dispatch("lookups/getEntity", this.options).then((data) => {
          this.selectData = data;
        });
      }
    },
    emitValue(value) {
      this.$emit(
        "update:modelValue",
        this.type === "number" ? parseFloat(value) || 0 : value
      );

      this.$emit("input", value);
    },
    handelValue(newVal) {
      if (this.$attrs.field === "select") {
        this.emitValue(newVal);
        if (!this.multiple) {
          this.emitValue(
            this.selectData.find((item) => {
              return item[this.itemId] === newVal;
            }) || null
          );
        } else {
          this.emitValue(newVal);
        }
      } else {
        this.emitValue(newVal);

        this.updateAndValidate();
      }
    },
    handelInput(val, isWriteAction = true) {
      this.isDirty = isWriteAction;
      if (this.$attrs.field === "select") {
        if (!this.multiple) {
          val = val ? val[this.itemId] : null;
        }
      }

      this.emitValue(val);

      this.updateAndValidate();
    },
    onFocus() {
      //
    },
    onBlur() {
      //
    },
    onChange(v) {
      this.emitValue(v);
      this.updateAndValidate();
    },
  },
};

defineRule("numeric", (value) => {
  if (value) {
    const regex = /^\d*\.?\d+$/;
    const isNumeric = regex.test(value);
    const hasLength = value.toString().trim().length > 0;

    return isNumeric && hasLength;
  }
  return true;
});

defineRule('string', (value)=> {
  if (value) {
    const regex = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s]+$/;
    const isString = regex.test(value);
    const hasLength = value.toString().trim().length > 0;

    return isString & hasLength;
    
  }
  return true;
})
</script>

<style scoped>
.rtl {
  direction: rtl;
}
</style>
