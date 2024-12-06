<template>
    <div class="list-group mt-3">
        <label class="list-group-item">Output / 出力</label>
        <ul class="list-group">
            <li v-for="(column, index) in outputColumns" :key="index" class="list-group-item">
                <label :for="'text_area_' + index">
                    No.{{ index }}, Number of characters: {{ column.join("").length }}
                </label>
                <textarea class="form-control" :id="'text_area_' + index" readonly>{{ column.join("\n") }}</textarea>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TextOutput',
    props: {
        outputColumns: {
            type: Array as () => string[][],
            default: () => []
        }
    }
});
</script>