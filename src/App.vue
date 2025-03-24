<template>
    <div id="app">
        <Header />
        <main class="container mt-4">
            <TextInput v-model="originalText" />
            <TextOutput :outputColumns="outputColumns" />
            <CharLimitInput v-model.number="charLimit" />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import TextInput from './components/TextInput.vue';
import TextOutput from './components/TextOutput.vue';
import CharLimitInput from './components/CharLimitInput.vue';
import { formatAndSplitTextIntoColumns } from './lib/format_and_split_text_into_columns';

export default defineComponent({
    components: {
        Header,
        TextInput,
        TextOutput,
        CharLimitInput,
    },
    data() {
        return {
            originalText: '',
            charLimit: 4500
        };
    },
    computed: {
        outputColumns(): string[][] {
            if (!this.originalText) return [];
            return formatAndSplitTextIntoColumns(this.originalText, this.charLimit);
        }
    }
});
</script>