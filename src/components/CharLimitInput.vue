<template>
    <div class="input-group mb-3 mt-3">
        <div class="input-group-prepend">
            <span class="input-group-text">Character limit / 文字数制限</span>
        </div>
        <input type="number" min="1000" class="form-control" v-model="localLimit"
            placeholder="More than 1000 / 1000以上を入力してください" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'CharLimitInput',
    props: {
        modelValue: {
            type: Number,
            default: 4500
        }
    },
    setup(props, { emit }) {
        const localLimit = ref(props.modelValue);

        watch(localLimit, (newValue) => {
            emit('update:modelValue', newValue);
        });

        return {
            localLimit
        };
    }
});
</script>