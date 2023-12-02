<template>
    <div class="keyboard-container">
        <div
            class="keyboard-row"
            v-for="(row, i) in rows"
            :key="'row' + row[0]"
        >
            <div class="keyboard-margin" v-if="i === 1"></div>
            <div
                :class="['keyboard-key', { 'keyboard-key-long': l.length > 1 }]"
                v-for="l in row"
                :key="'letter' + l"
                :id="'key-' + l"
                :style="{
                    'background-color':
                        hoveringLetter &&
                        l.length === 1 &&
                        lettersToShow.indexOf(l) >= 0
                            ? getColorFromDistance(hoveringLetter, l)
                            : '#818384',
                }"
                @click="$emit('letter-typed', l)"
            >
                {{ l === "Backspace" ? "⌫" : l }}
            </div>
            <div class="keyboard-margin" v-if="i === 1"></div>
        </div>
    </div>
</template>

<script>
import { init, getDistance, getColorFromDistance } from "../qwerty";
export default {
    props: ["highlight", "lettersToShow"],
    async mounted() {
        await this.$nextTick();
        setTimeout(init, 100);
    },
    data() {
        return {
            hoveringLetter: "",
            rows: [
                ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
            ],
        };
    },
    methods: {
        getColorFromDistance(letterA, letterB) {
            const c = getColorFromDistance(getDistance(letterA, letterB));
            return c;
        },
    },
    watch: {
        highlight(newVal) {
            this.hoveringLetter = newVal;
        },
    },
};
</script>

<style>
.keyboard-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: 500px;
}
.keyboard-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.keyboard-key {
    user-select: none;
    border-radius: 5px;
    height: 60px;
    color: white;
    font-weight: bold;
    background-color: #818384;
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    margin: 2px;
}
.keyboard-key-long {
    flex: 1.5;
}
.keyboard-margin {
    flex: 0.5;
}
</style>
