<template>
  <div ref="$element" class="datepicker-container">
    <div class="datepicker">
      <div class="datepicker__input">
        <input v-model="textValue" type="text">
      </div>
      <div class="datepicker__icon" @click="toggle">
        &#x1F4C6;
      </div>
    </div>
    <transition name="fade">
      <div v-if="isDropdown" class="datepicker__dropdown">
        <KpCalendar mode="month" :selected="internalValue.toISOString()" @date:selected="onDateSelected" />
      </div>
    </transition>
  </div>
</template>

<script setup>
  import KpCalendar from './KpCalendar.vue';
  import { ref, computed, watch, onBeforeUnmount } from 'vue';
  import moment from 'moment';

  const emit = defineEmits(['update:modelValue']);

  const selected = ref(null);
  const isDropdown = ref(false);
  const internalValue = ref(new Date());
  const textValue = ref('');
  const $element = ref(null);

  const props = defineProps({
    modelValue: { type: [String, Date], required: false, default: '' },
    displayFormat: { type: String, required: false, default: 'DD.MM.YYYY' },
  });

  const toggle = () => {
    isDropdown.value = !isDropdown.value;
  };

  const close = (e) => {
    if (!$element.value.contains(e.target)) {
      isDropdown.value = false;
    }
  };

  const text = computed(() => {
    const isoDate = internalValue.value && moment(internalValue.value).isValid()
      ? moment(internalValue.value).toISOString()
      : '';
    const result  =  isoDate ? moment(isoDate).format(props.displayFormat) : '';
    return result;
  });

  const onDateSelected = (isoDate) => {
    isDropdown.value = false;
    internalValue.value = isoDate ? new Date(isoDate) : null;
    textValue.value = text.value;
    emit('update:modelValue', internalValue.value);
  };

  // handle model property change:
  watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
    textValue.value = text.value;
  });

  // handle user text input:
  watch(textValue, (newValue) => {
    const mdt = moment(newValue, props.displayFormat );
    if (mdt.isValid()) {
      if (!mdt.isSame(internalValue.value, 'day')) {
        internalValue.value = mdt.toDate();
        emit('update:modelValue', internalValue.value);
      }
    }
  });

  if (props.modelValue) {
    const mdt = moment(props.modelValue);
    if (mdt.isValid()) {
      internalValue.value = mdt.toDate();;
      textValue.value = text.value;
    }
  }

  document.addEventListener('click', close);

  onBeforeUnmount(() => {
    document.removeEventListener('click', close);
  });

  defineExpose({ $element });
</script>

<style scoped>
  .datepicker-container {
    display: inline-block;
    position: relative;
  }

  .datepicker {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: stretch;
  }

  .datepicker__dropdown {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    position: absolute;
    left: 0;
    background: white;
    z-index: 10;
  }

  .datepicker__icon {
    cursor: pointer;
    border-width: 1px 1px 1px 0;
    border-radius: 0 4px 4px 0;
    border-style:  solid;
    border-color:  lightgray;
    background: #efefef;
    padding: 2px;
    width: 21px;
    height: 21px;
  }

  .datepicker__icon:hover {
    background: #e7e7e7;
  }

  @supports(-webkit-appearance: none) or (-moz-appearance: none) {
  input[type='text'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    --active: #275EFE;
    --active-inner: #fff;
    --focus: 2px rgba(198, 212, 255, 1);
    --border: #BBC1E1;
    --border-hover: #275EFE;
    --background: #fff;
    --disabled: #F6F8FF;
    --disabled-inner: #E1E6F9;
    border-radius: 4px 0 0 4px;
    border: 1px solid lightgray;
    padding: 5px;
  }

  input:focus-visible {
    outline-color: lightgray;
    outline-width: 1px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>