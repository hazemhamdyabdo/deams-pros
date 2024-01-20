Sure, I'll help you migrate this Vue 2 component to Vue 3. The main changes involve the setup function, reactive() instead of data(), ref() instead of this.$refs, and some tweaks in the template syntax. Here's the modified code:

```vue
<template>
  <b-form-group :label="hideLabel ? '' : $t($attrs['label-text'])">
    <ValidationProvider
      ref="fieldValidator"
      v-slot="{ errors }"
      :name="$t($attrs['label-text']) || ''"
      :rules="rules || ''"
      :vid="name || $attrs['label-text'] || placeholder || ''"
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
            :placeholder="$t(placeholder) || ''"
            :options="selectData.filter(filterFn)"
            :value="itemValue"
            v-bind="attrs"
            v-on="listeners"
            :dir="dir"
            :disabled="disabled"
            :readonly="readonly"
            :multiple="multiple"
            @input="(v) => { handelInput(v); }"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
            @option:selected="(v) => { $emit('change', v); }"
            @keyup.enter.prevent=""
            :state="errors.length > 0 ? false : null"
            v-b-tooltip.hover.v-danger
            :title="toolTipError ? errors[0] || '' : ''"
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
          :type="type"
          :placeholder="$t(placeholder) || ''"
          :options="selectData.filter(filterFn)"
          :value="itemValue"
          :name="$attrs['label-text'] || ''"
          :multiple="multiple"
          v-bind="attrs"
          v-on="listeners"
          :dir="dir"
          :disabled="disabled"
          :readonly="readonly"
          @input="(v) => { handelInput(v); }"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @wheel="$event.target.blur()"
          @option:selected="(v) => { $emit('change', v); }"
          :state="errors.length > 0 ? false : null"
          v-b-tooltip.hover.v-danger
          :title="toolTipError ? errors[0] || '' : ''"
        >
          <template v-if="$attrs.field === 'select'" #no-options>
            {{ $t("Sorry, no matching options") }}
          </template>
        </component>
        <small
          :class="{ 'd-none': !$attrs['label-text'] || toolTipError }"
          class="text-danger"
        >{{ errors[0] }}</small>
      </div>
    </ValidationProvider>
  </b-form-group>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import { ref, onMounted, watch } from 'vue';

export default {
  components: {
    ValidationProvider,
  },
  props: {
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
    value: {
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
      default: '',
    },
    itemId: {
      type: String,
      default: 'id',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    toolTipError: {
      type: Boolean,
      default: false,
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'input', 'change'],
  setup(props, { attrs, listeners }) {
    const name = attrs.name;
    const type = attrs.type;
    const placeholder = attrs.placeholder;
    let field = attrs.field;

    if (field === 'select') field = 'v-select';
    else field = 'b-form-input';

    const attrsWithoutReserved = Object.entries(attrs).reduce((obj, val) => {
      if (['field', 'name', 'placeholder', 'type', ...Object.keys(props)].indexOf(val[0]) === -1) obj[val[0]] = val[1];
      return obj;
    }, {});

    const listenersWithoutReserved = Object.entries(listeners).reduce((obj, val) => {
      if (['update:value', 'input', 'change'].indexOf(val[0]) === -1) obj[val[0]] = val[1];
      return obj;
    }, {});

    const selectData = ref([]);
    const itemValue = ref('');
    const isFocus = ref(false);
    const isDirty = ref(false);

options = () => {
      if (Array.isArray(props.options)) selectData.value = props.options;
      else {
        // Assuming $store is available globally, adjust as needed
        this.$store.dispatch('lookups/getEntity', props.options).then((data) => {
          selectData.value = data;
        });
      }
      handelValue(props.value);
    };

    const handelValue = (newVal) => {
      if (attrs.field === 'select') {
        if (!props.multiple) {
          itemValue.value = selectData.value.find((item) => item[props.itemId] === newVal) || null;
        } else {
          itemValue.value = newVal;
        }
      } else itemValue.value = newVal;
    };

    const handelInput = (val, isWriteAction = true) => {
      isDirty.value = isWriteAction;
      if (attrs.field === 'select') {
        if (!props.multiple) {
          val = val ? val[props.itemId] : null;
        }
      }
      context.emit('update:value', type === 'number' ? parseFloat(val) || 0 : val);
      context.emit('input', type === 'number' ? parseFloat(val) || 0 : val);
      if (this.$route.name !== 'items-category') {
        context.emit('update:value', type === 'number' && name !== 'discountPercentage' && name !== 'additionalNumber' && name !== 'code' && name !== 'scalesCode' && name !== 'acceptanceAgeDays' && name !== 'acceptanceAgeMonths' && name !== 'acceptanceAgeYears' ? parseFloat(val).toString() : val);
        context.emit('input', type === 'number' && name !== 'discountPercentage' && name !== 'additionalNumber' && name !== 'code' && name !== 'scalesCode' && name !== 'acceptanceAgeDays' && name !== 'acceptanceAgeMonths' && name !== 'acceptanceAgeYears' ? parseFloat(val).toString() : val);
      } else {
        context.emit('update:value', type === 'number' && name !== 'discountPercentage' && name !== 'additionalNumber' && name !== 'code' && name !== 'scalesCode' && name !== 'acceptanceAgeDays' && name !== 'acceptanceAgeMonths' && name !== 'acceptanceAgeYears' && name !== 'mainUnitBarcode' ? parseFloat(val).toString() : val);
        context.emit('input', type === 'number' && name !== 'discountPercentage' && name !== 'additionalNumber' && name !== 'code' && name !== 'scalesCode' && name !== 'acceptanceAgeDays' && name !== 'acceptanceAgeMonths' && name !== 'acceptanceAgeYears' && name !== 'mainUnitBarcode' ? parseFloat(val).toString() : val);
      }
    };

    const onFocus = () => {
      if (this.$route.name !== 'items-category') {
        if (type === 'number') itemValue.value = parseFloat(itemValue.value);
      }
    };

    const onBlur = () => {
      if (this.$route.name !== 'items-category') {
        if (type === 'number' && name !== 'discountPercentage' && name !== 'additionalNumber' && name !== 'code' && name !== 'scalesCode' && name !== 'acceptanceAgeDays' && name !== 'acceptanceAgeMonths' && name !== 'acceptanceAgeYears' && name !== 'mainUnitBarcode') itemValue.value = fraction(itemValue.value);
        if (type === 'number' && name === 'code' && name === 'mainUnitBarcode' && name === 'scalesCode') itemValue.value = (itemValue.value).toString();
      }
    };

    const onChange = (v) => {
      context.emit('change', v);
      if (type === 'number' && name !== 'discountPercentage' && name !== 'additionalNumber' && name !== 'code' && name !== 'scalesCode' && name !== 'acceptanceAgeDays' && name !== 'acceptanceAgeMonths' && name !== 'acceptanceAgeYears' && name !== 'mainUnitBarcode') itemValue.value = parseFloat(v).toFixed(this.currentBranch.decimalDigits);
      if (type === 'number' && name === 'code' && name === 'mainUnitBarcode' && name === 'scalesCode') itemValue.value = (itemValue.value).toString();
    };

    onMounted(() => {
      handeloptions();
      handelValue(props.value);
    });

    watch(() => props.options, handeloptions);
    watch(() => props.value, handelValue);

    return {
      name,
      type,
      placeholder,
      attrs: attrsWithoutReserved,
      field,
      lookup: attrs.lookup,
      listeners: listenersWithoutReserved,
      selectData,
      itemValue,
      isFocus,
      isDirty,
      handelInput,
      onFocus,
      onBlur,
      onChange,
    };
  },
};
</script>