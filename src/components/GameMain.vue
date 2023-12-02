<template>
    <div class="game-container">
        <div class="game-board">
            <div
                class="guess-container"
                v-for="(previousGuess, i) in guesses"
                :key="JSON.stringify(previousGuess)"
            >
                <div
                    class="previous-guess-letter"
                    v-for="(letter, j) in previousGuess"
                    :style="{
                        'background-color': i == guesses.length-1 && isAnimating? '':colorsOfPreviousGuesses[i][j],
                        'animation-name': i == guesses.length-1 && isAnimating ? 'flip-reveal'+j : '',
                        'animation-duration': '550ms',
                        'animation-delay': 600*j + 'ms',
                        'animation-fill-mode':'forwards'
                    }"
                    :key="letter.letter + j"
                    @mouseenter="hoveringGuessLetter = letter.letter"
                >
                    {{ letter.letter }}
                </div>
            </div>

            <div v-if="guesses.length < 6">
                <div class="guess-container" :class="isWiggling ? 'wrongAnswer':''">
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
            :highlight="isAnimating ? '' : answer.charAt(currentIndex)"
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
import { useToast } from "vue-toastification";

export default {
    components: { QwertleKeyboard },
    watch: {
        answer(val) {
            setItem("answer", val);
        },
        // gameState(val) {
        //     setItem("gameState", val);
        // },
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
        // this.gameState = getItem("gameState") || "IN_PROGRESS";
        // setItem("gameState", this.gameState);
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
            isAnimating: false,
            isWiggling: false,
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
        gameState() {
            if (this.isAnimating) {
                return "IN_PROGRESS"
            }
            if (
                this.guesses.length > 0 &&
                this.guesses[this.guesses.length - 1].every(
                    (g) => g.distance === 0
                )
            ) {
                return "WIN";
            } else if (this.guesses.length === 6) {
                return "LOSE";
            }
            return "IN_PROGRESS";
        },
        colorsOfPreviousGuesses() {
            return this.guesses.map(g=>{
                return g.map(l=>getColorFromDistance(l.distance))
            })
        }
    },
    methods: {
        checkVictory() {
            if (this.gameState !== "IN_PROGRESS") {
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
            if (this.isAnimating) {
                return
            }
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
        },
        submitGuess() {
            if (this.currentGuess.length !== 5) {
                return;
            }
            if (
                !ACCEPTABLE[this.currentGuess.toUpperCase()] &&
                !ANSWERS[this.currentGuess.toUpperCase()]
            ) {
                this.isWiggling = true
                setTimeout(() => {
                    this.isWiggling = false
                }, 550);
                useToast().error("Not a word!", {
                    timeout: 3000,
                    hideProgressBar: true,
                    icon: false,
                });
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
            this.guesses.push(newGuess)
            this.resetLetters();
            this.isAnimating = true
            setTimeout(() => {

                this.isAnimating = false
                this.checkVictory();
                
            }, 2950);
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

@keyframes flip-reveal0 {
    0% {
        background-color: #121213;
        transform: rotateX(0);
    }
    50% {
        background-color: #121213;
        transform: rotateX(-90deg);
    }
    51% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[0]');
    }
    100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[0]');
        transform: rotateX(0deg);
    }
}
@keyframes flip-reveal1 {
    0% {
        background-color: #121213;
        transform: rotateX(0);
    }
    50% {
        background-color: #121213;
        transform: rotateX(-90deg);
    }
    51% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[1]');
    }
    100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[1]');
        transform: rotateX(0deg);
    }
}
@keyframes flip-reveal2 {
    0% {
        background-color: #121213;
        transform: rotateX(0);
    }
    50% {
        background-color: #121213;
        transform: rotateX(-90deg);
    }
    51% {
                background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[2]');
            }
            100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[2]');
        transform: rotateX(0deg);
    }
}
@keyframes flip-reveal3 {
    0% {
        background-color: #121213;
        transform: rotateX(0);
    }
    50% {
        background-color: #121213;
        transform: rotateX(-90deg);
    }
    51% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[3]');
    }
    100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[3]');
        transform: rotateX(0deg);
    }
}
@keyframes flip-reveal4 {
    0% {
        background-color: #121213;
        transform: rotateX(0);
    }
    50% {
        background-color: #121213;
        transform: rotateX(-90deg);
    }
    51% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[4]');    }
        100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length-1]?.[4]');    
        transform: rotateX(0deg);
    }
}
.wrongAnswer {
    animation-name: wiggle;
    animation-duration:  110ms;
    animation-iteration-count: 5;
}
@keyframes wiggle {
    0% {
        transform: translate(0,0);
    }
    33% {
        transform: translate(5px,0);
    }
    66% {
        transform: translate(-5px,0);
    }
    100% {
        transform: translate(0,0);
    }
}
</style>
