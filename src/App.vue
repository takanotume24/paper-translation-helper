<template>
    <div id="app">
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a href="#" class="navbar-brand">📄📚 Paper Translation Helper 📚📄</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mr-auto"></ul>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link"
                                    href="https://github.com/takanotume24/paper-translation-helper/wiki/%E4%BD%BF%E3%81%84%E6%96%B9">使い方</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link"
                                    href="https://github.com/takanotume24/paper-translation-helper/issues">ご意見･ご要望</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link"
                                    href="https://github.com/takanotume24/paper-translation-helper/">Repository</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://github.com/takanotume24/">@takanotume24</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <main class="container mt-4">
            <div class="form-group">
                <label for="original">Input / 入力</label>
                <textarea id="original" class="form-control" v-model="originalText"
                    placeholder="Paste Here. / ここに貼り付けてください." rows="5"></textarea>
            </div>
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
            <div class="input-group mb-3 mt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Character limit / 文字数制限</span>
                </div>
                <input type="number" min="1000" class="form-control" v-model.number="charLimit"
                    placeholder="More than 1000 / 1000以上を入力してください">
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatAndSplitTextIntoColumns } from './lib/format_and_split_text_into_columns';

export default defineComponent({
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
