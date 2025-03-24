<template>
    <div class="form-group">
        <label for="original">Input / 入力</label>
        <textarea id="original" class="form-control" v-model="localValue" placeholder="Paste Here. / ここに貼り付けてください."
            rows="5"></textarea>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'TextInput',
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const localValue = ref(props.modelValue);

        watch(localValue, (newValue) => {
            emit('update:modelValue', newValue);
        });

        return {
            localValue
        };
    }
});
</script>