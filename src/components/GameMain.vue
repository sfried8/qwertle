<template>
    <div class="game-container">
        <div class="game-board">
            <div
                class="guess-container"
                v-for="previousGuess in guesses"
                :key="JSON.stringify(previousGuess)"
            >
                <div
                    class="previous-guess-letter"
                    v-for="(letter, i) in previousGuess"
                    :style="{
                        'background-color': getColorFromDistance(
                            letter.distance
                        ),
                    }"
                    :key="letter.letter + i"
                    @mouseenter="hoveringGuessLetter = letter.letter"
                >
                    {{ letter.letter }}
                </div>
            </div>

            <div v-if="guesses.length < 6">
                <div class="guess-container">
                    <div class="previous-guess-letter" :style="{}">
                        {{ letter0 }}
                    </div>
                    <div class="previous-guess-letter" :style="{}">
                        {{ letter1 }}
                    </div>
                    <div class="previous-guess-letter" :style="{}">
                        {{ letter2 }}
                    </div>
                    <div class="previous-guess-letter" :style="{}">
                        {{ letter3 }}
                    </div>
                    <div class="previous-guess-letter" :style="{}">
                        {{ letter4 }}
                    </div>
                </div>
            </div>

            <div
                class="guess-container"
                v-for="remainingGuess in Math.max(0, 5 - guesses.length)"
                :key="'placeholder' + remainingGuess"
            >
                <div
                    class="previous-guess-letter"
                    v-for="letter in 5"
                    :style="{}"
                    :key="'placeholder-letter' + letter"
                ></div>
            </div>
        </div>
        <QwertleKeyboard
            :highlight="answer.charAt(currentIndex)"
            :letters-to-show="currentLettersToShow"
            v-if="gameState === 'IN_PROGRESS'"
            @letter-typed="keyPress"
        />
        <h2 v-else-if="gameState === 'WIN'">YOU WIN!</h2>
        <h2 v-else>YOU LOSE! The word was "{{ answer }}"</h2>
    </div>
</template>
<script>
import { getDistance, getColorFromDistance } from "../qwerty.js";
import QwertleKeyboard from "./QwertleKeyboard";
import { ACCEPTABLE, ANSWERS } from "../dictionary.js";
import { getItem, setItem } from "../SaveDataManager";
import { saveToStats, endStreak } from "../stats";

export default {
    components: { QwertleKeyboard },
    watch: {
        answer(val) {
            setItem("answer", val);
        },
        gameState(val) {
            setItem("gameState", val);
        },
        guesses: {
            deep: true,
            handler(val) {
                setItem("guesses", val);
            },
        },
    },
    mounted() {
        // const answerArray = Object.keys(ANSWERS);

        // this.answer =
        //     answerArray[
        //         Math.floor(Math.random() * answerArray.length)
        //     ].toUpperCase();
        window.addEventListener("keydown", (e) => {
            this.keyPress(e.key);
        });
        this.gameState = getItem("gameState") || "IN_PROGRESS";
        setItem("gameState", this.gameState);
        const lastAnswer = getItem("answer");
        const answerArray = Object.keys(ANSWERS);

        const answerIndex = this.getDailyIndex();
        this.answer = answerArray[answerIndex].toUpperCase();
        this.guesses = getItem("guesses");

        if (this.answer !== lastAnswer) {
            this.resetGame();
        }

        const mostRecentFinishDay = getItem("mostRecentFinishDay");
        const daysSinceMostRecent = this.getDailyIndex() - mostRecentFinishDay;
        if (daysSinceMostRecent > 1) {
            endStreak();
        }
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
            gameState: "IN_PROGRESS",
        };
    },
    computed: {
        currentGuess() {
            return (
                this.letter0 +
                this.letter1 +
                this.letter2 +
                this.letter3 +
                this.letter4
            );
        },

        currentLettersToShow() {
            return this.guesses.map((g) => g[this.currentIndex]?.letter);
        },
    },
    methods: {
        checkVictory() {
            if (!this.guesses.length) {
                this.gameState = "IN_PROGRESS";
                return;
            }
            if (
                this.guesses[this.guesses.length - 1].every(
                    (g) => g.distance === 0
                )
            ) {
                this.gameState = "WIN";
                this.endGame();
            } else if (this.guesses.length === 6) {
                this.gameState = "LOSE";
                this.endGame();
            }
        },
        endGame() {
            setItem("mostRecentFinishDay", this.getDailyIndex());
            saveToStats(this.guesses.length, this.gameState === "WIN");
            setTimeout(() => {
                this.$emit("statistics");
            }, 1500);
        },
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
            this.letter0 =
                this.letter1 =
                this.letter2 =
                this.letter3 =
                this.letter4 =
                    "";
            this.currentIndex = 0;
        },
        getDailyIndex() {
            const today = new Date();
            const qwertleEpoch = new Date("04/14/2022");
            return Math.floor(
                (today.getTime() - qwertleEpoch.getTime()) / (1000 * 3600 * 24)
            );
        },
        resetGame() {
            this.resetLetters();
            this.guesses = [];
            const answerArray = Object.keys(ANSWERS);

            const answerIndex = this.getDailyIndex();
            this.answer = answerArray[answerIndex].toUpperCase();
            this.gameState = "IN_PROGRESS";
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
                    distance: getDistance(
                        this["letter" + i],
                        this.answer.charAt(i)
                    ),
                });
            }
            this.guesses.push(newGuess);
            this.resetLetters();
            this.checkVictory();
        },
    },
};
</script>
<style>
.game-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 4px;
    width: 100%;
}
.game-board {
    margin: 8px 0;
}
.guess-container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-grow: 2;
}
.previous-guess-letter {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    border: 2px solid #3a3a3c;
    margin: 2px;
}
</style>
