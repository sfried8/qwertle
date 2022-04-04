<template>
  <div class="keyboard-container">
    <div
      class="keyboard-row"
      :style="{ 'margin-left': 20 * i + 'px' }"
      v-for="(row, i) in rows"
      :key="'row' + row[0]"
    >
      <div
        class="keyboard-key"
        v-for="l in row"
        :key="'letter' + l"
        :id="'key-' + l"
        :style="{
          'background-color':
            hoveringLetter && l.length === 1 && lettersToShow.indexOf(l) >= 0
              ? getColorFromDistance(hoveringLetter, l)
              : 'lightgray',
        }"
        @click="$emit('letter-typed', l)"
      >
        {{ l === "Backspace" ? "⌫" : l }}
      </div>
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
}
.keyboard-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.keyboard-key {
  width: 8vw;
  height: 50px;
  color: black;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5vw;
}
</style>
