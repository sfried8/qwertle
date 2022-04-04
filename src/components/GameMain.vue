<template>
  <div class="game-container">
    <div
      class="guess-container"
      v-for="previousGuess in guesses"
      :key="JSON.stringify(previousGuess)"
    >
      <div
        class="previous-guess-letter"
        v-for="(letter, i) in previousGuess"
        :style="{
          'background-color': getColorFromDistance(letter.distance),
          border: 'black 1px solid',
        }"
        :key="letter.letter + i"
        @mouseenter="hoveringGuessLetter = letter.letter"
      >
        {{ letter.letter }}
      </div>
    </div>

    <div v-if="victory === null">
      <div class="guess-container">
        <div
          class="previous-guess-letter"
          :style="{
            'background-color': 'white',
            border: 'black 1px solid',
          }"
        >
          {{ letter0 }}
        </div>
        <div
          class="previous-guess-letter"
          :style="{
            'background-color': 'white',
            border: 'black 1px solid',
          }"
        >
          {{ letter1 }}
        </div>
        <div
          class="previous-guess-letter"
          :style="{
            'background-color': 'white',
            border: 'black 1px solid',
          }"
        >
          {{ letter2 }}
        </div>
        <div
          class="previous-guess-letter"
          :style="{
            'background-color': 'white',
            border: 'black 1px solid',
          }"
        >
          {{ letter3 }}
        </div>
        <div
          class="previous-guess-letter"
          :style="{
            'background-color': 'white',
            border: 'black 1px solid',
          }"
        >
          {{ letter4 }}
        </div>
      </div>
      <div
        class="guess-container"
        v-for="remainingGuess in 5 - guesses.length"
        :key="'placeholder' + remainingGuess"
      >
        <div
          class="previous-guess-letter"
          v-for="letter in 5"
          :style="{
            border: 'black 1px solid',
          }"
          :key="'placeholder-letter' + letter"
        ></div>
      </div>
    </div>
    <div>
      <QwertleKeyboard
        :highlight="answer.charAt(currentIndex)"
        :letters-to-show="currentLettersToShow"
        v-if="victory === null"
        @letter-typed="keyPress"
      />
      <h2 v-else-if="victory">
        YOU WIN!
        <button @click="resetGame()">Play Again</button>
      </h2>
      <h2 v-else>
        YOU LOSE! The word was "{{ answer }}"
        <button @click="resetGame()">Play Again</button>
      </h2>
    </div>
  </div>
</template>
<script>
import { getDistance, getColorFromDistance } from "../qwerty.js";
import QwertleKeyboard from "./QwertleKeyboard";
import { ACCEPTABLE, ANSWERS } from "../dictionary.js";

export default {
  components: { QwertleKeyboard },
  mounted() {
    const answerArray = Object.keys(ANSWERS);

    this.answer = answerArray[
      Math.floor(Math.random() * answerArray.length)
    ].toUpperCase();
    window.addEventListener("keydown", (e) => {
      this.keyPress(e.key);
    });
  },
  data() {
    return {
      hoveringGuessLetter: "",
      answer: "",
      guesses: [],
      currentIndex: 0,
      letter0: "",
      letter1: "",
      letter2: "",
      letter3: "",
      letter4: "",
    };
  },
  computed: {
    currentGuess() {
      return (
        this.letter0 + this.letter1 + this.letter2 + this.letter3 + this.letter4
      );
    },
    victory() {
      if (!this.guesses.length) {
        return null;
      }
      if (
        this.guesses[this.guesses.length - 1].every((g) => g.distance === 0)
      ) {
        return true;
      }
      if (this.guesses.length === 6) {
        return false;
      }
      return null;
    },
    currentLettersToShow() {
      return this.guesses.map((g) => g[this.currentIndex]?.letter);
    },
  },
  methods: {
    keyPress(key) {
      if (key === "Backspace" && this.currentIndex > 0) {
        this.currentIndex -= 1;
        this["letter" + this.currentIndex] = "";
      } else if (key === "Enter") {
        this.submitGuess();
      } else if (key.length === 1 && this.currentIndex < 5) {
        this["letter" + this.currentIndex] = key.toUpperCase();
        this.currentIndex += 1;
      }
    },
    getColorFromDistance(distance) {
      return getColorFromDistance(distance);
    },
    resetLetters() {
      this.letter0 = this.letter1 = this.letter2 = this.letter3 = this.letter4 =
        "";
      this.currentIndex = 0;
    },
    resetGame() {
      this.resetLetters();
      this.guesses = [];
      const answerArray = Object.keys(ANSWERS);

      this.answer = answerArray[
        Math.floor(Math.random() * answerArray.length)
      ].toUpperCase();
    },
    submitGuess() {
      if (this.currentGuess.length !== 5) {
        return;
      }
      if (
        !ACCEPTABLE[this.currentGuess.toUpperCase()] &&
        !ANSWERS[this.currentGuess.toUpperCase()]
      ) {
        alert("not a word!");
        return;
      }
      const newGuess = [];
      for (let i = 0; i < 5; i++) {
        newGuess.push({
          letter: this.currentGuess.charAt(i),
          distance: getDistance(this["letter" + i], this.answer.charAt(i)),
        });
      }
      this.guesses.push(newGuess);
      this.resetLetters();
    },
  },
};
</script>
<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.guess-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.previous-guess-letter {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: skyblue;
}
</style>
