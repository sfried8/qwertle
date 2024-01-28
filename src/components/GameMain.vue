<template>
    <div class="game-container">
        <div class="game-board-and-gauge">
            <div class="game-board">
                <div class="guess-container" v-for="(previousGuess, i) in guesses" :key="JSON.stringify(previousGuess)">
                    <div class="previous-guess-letter" v-for="(letter, j) in previousGuess" :style="{
                        'background-color': i == guesses.length - 1 && isAnimating ? '' : colorsOfPreviousGuesses[i][j],
                        'color': i == guesses.length - 1 && isAnimating || colorsOfPreviousGuesses[i][j] != 'white' ? 'white' : 'black',
                        'text-shadow': i == guesses.length - 1 && isAnimating || colorsOfPreviousGuesses[i][j] != 'white' ? '' : 'none',
                        'animation-name': i == guesses.length - 1 && isAnimating ? 'flip-reveal' + j : '',
                        'animation-duration': '550ms',
                        'animation-delay': 300 * j + 'ms',
                        'animation-fill-mode': 'forwards'
                    }" :key="letter.letter + j" @mouseenter="hoveringGuessLetter = letter.letter">
                        {{ letter.letter }}
                    </div>
                </div>

                <div v-if="guesses.length < 6">
                    <div class="guess-container" :class="isWiggling ? 'wrongAnswer' : ''">
                        <div class="previous-guess-letter" @click="currentIndex = 0"
                            :style="{ borderColor: !isAnimating && gameState == 'IN_PROGRESS' && currentIndex == 0 ? 'white' : '' }">
                            {{ letter0 }}
                        </div>
                        <div class="previous-guess-letter" @click="currentIndex = 1"
                            :style="{ borderColor: !isAnimating && gameState == 'IN_PROGRESS' && currentIndex == 1 ? 'white' : '' }">
                            {{ letter1 }}
                        </div>
                        <div class="previous-guess-letter" @click="currentIndex = 2"
                            :style="{ borderColor: !isAnimating && gameState == 'IN_PROGRESS' && currentIndex == 2 ? 'white' : '' }">
                            {{ letter2 }}
                        </div>
                        <div class="previous-guess-letter" @click="currentIndex = 3"
                            :style="{ borderColor: !isAnimating && gameState == 'IN_PROGRESS' && currentIndex == 3 ? 'white' : '' }">
                            {{ letter3 }}
                        </div>
                        <div class="previous-guess-letter" @click="currentIndex = 4"
                            :style="{ borderColor: !isAnimating && gameState == 'IN_PROGRESS' && currentIndex == 4 ? 'white' : '' }">
                            {{ letter4 }}
                        </div>
                    </div>
                </div>

                <div class="guess-container" v-for="remainingGuess in Math.max(0, 5 - guesses.length)"
                    :key="'placeholder' + remainingGuess">
                    <div class="previous-guess-letter" v-for="letter in 5" :style="{}" :key="'placeholder-letter' + letter">
                    </div>
                </div>
            </div>
            <div class="gauge">
                <span>FAR</span>
                <!-- <img src="@/assets/colorgauge.png"/> -->
                <div></div>
                <span>CLOSE</span>
            </div>
        </div>
        <QwertleKeyboard :highlight="isAnimating ? '' : answer.charAt(currentIndex)" :letters-to-show="currentLettersToShow"
            v-if="gameState === 'IN_PROGRESS'" @letter-typed="keyPress" />
        <h2 v-else-if="gameState === 'WIN'">YOU WIN!</h2>
        <h2 v-else>YOU LOSE! The word was "{{ answer }}"</h2>
        <div class="play-again-btn" @click="resetGame" v-if="!isDaily && gameState != 'IN_PROGRESS'">Play again</div>
    </div>
</template>
<script>
import { getDistance, getColorFromDistance } from "../qwerty.js";
import QwertleKeyboard from "./QwertleKeyboard";
import { ACCEPTABLE, ANSWERS } from "../dictionary.js";
import { saveToStats, endStreak } from "../stats";
import { useToast } from "vue-toastification";

export default {
    components: { QwertleKeyboard },
    props: ['isDaily'],
    watch: {
        answer(val) {
            if (this.isDaily) {
                this.$store.commit('set_answer', val);
            }
        },
        guesses: {
            deep: true,
            handler(val) {
                if (this.isDaily) {

                    this.$store.commit('set_guesses', val)
                }
            },
        },
        gameState(val) {

            this.$store.commit('set_game_state', val)
        }
    },
    mounted() {
        window.addEventListener("keydown", (e) => {
            this.keyPress(e.key);
        });

        const lastAnswer = this.isDaily ? this.$store.state.answer : null
        const answerArray = Object.keys(ANSWERS);

        const answerIndex = this.isDaily ? this.getDailyIndex() : Math.floor(Math.random() * answerArray.length);
        this.answer = answerArray[answerIndex].toUpperCase();
        this.guesses = this.isDaily ? this.$store.state.guesses : [];

        if (this.answer !== lastAnswer) {
            this.resetGame();
        }

        if (this.isDaily) {

            const mostRecentFinishDay = this.$store.state.mostRecentFinishDay;
            const daysSinceMostRecent = this.getDailyIndex() - mostRecentFinishDay;
            if (daysSinceMostRecent > 1) {
                endStreak(this.$store);
            }
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
        colorRange() {
            const currentscheme = this.$store.getters.colorscheme
            return [`hsl(${currentscheme[0][0]}deg, ${currentscheme[0][1]}%, ${currentscheme[0][2]}%)`,
            `hsl(${currentscheme[1][0]}deg, ${currentscheme[1][1]}%, ${currentscheme[1][2]}%)`]
        },
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
            return this.guesses.map(g => {
                return g.map(l => getColorFromDistance(l.distance, this.$store.getters.colorscheme))
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
            if (this.isDaily) {
                this.$store.commit('set_most_recent_finished_day', this.getDailyIndex());
                saveToStats(this.guesses.length, this.gameState === "WIN", this.$store);
                setTimeout(() => {
                    this.$store.commit('show_modal', "statistics");
                }, 1500);
            }
        },
        keyPress(key) {
            if (this.isAnimating) {
                return
            }
            if (key === "Backspace" && this.currentIndex > 0) {
                if (!this["letter" + this.currentIndex]) {
                    this.currentIndex -= 1;
                }
                this["letter" + this.currentIndex] = "";
            } else if (key === "Enter") {
                this.submitGuess();
            } else if (key.length === 1 && this.currentIndex < 5) {
                this["letter" + this.currentIndex] = key.toUpperCase();
                while (this["letter" + this.currentIndex]) {
                    this.currentIndex += 1;
                }
            }
        },
        getColorFromDistance(distance) {
            return getColorFromDistance(distance, this.$store.getters.colorscheme);
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
            const qwertleEpoch = new Date("04/13/2022");
            return Math.floor(
                (today.getTime() - qwertleEpoch.getTime()) / (1000 * 3600 * 24)
            );
        },
        resetGame() {
            this.resetLetters();
            this.guesses = [];
            const answerArray = Object.keys(ANSWERS);

            const answerIndex = this.isDaily ? this.getDailyIndex() : Math.floor(Math.random() * answerArray.length);
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

            }, 1750);
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

.game-board-and-gauge {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    max-width: 500px;
}

.gauge {
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
        height: 240px;
        width: 20px;

    }

    div {
        height: 240px;
        width: 20px;
        background: linear-gradient(in hsl, v-bind('colorRange[0]'), v-bind('colorRange[1]'));

    }
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
    text-shadow: 1px 1px 2px black;
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
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[0]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[0] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[0] == "white" ? "none" : ""');
    }

    100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[0]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[0] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[0] == "white" ? "none" : ""');
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
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[1]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[1] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[1] == "white" ? "none" : ""');
    }

    100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[1]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[1] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[1] == "white" ? "none" : ""');
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
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[2]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[2] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[2] == "white" ? "none" : ""');
    }

    100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[2]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[2] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[2] == "white" ? "none" : ""');
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
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[3]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[3] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[3] == "white" ? "none" : ""');
    }

    100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[3]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[3] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[3] == "white" ? "none" : ""');
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
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[4]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[4] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[4] == "white" ? "none" : ""');
    }

    100% {
        background-color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[4]');
        color: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[4] == "white" ? "black" : ""');
        text-shadow: v-bind('colorsOfPreviousGuesses[guesses.length - 1]?.[4] == "white" ? "none" : ""');
        transform: rotateX(0deg);
    }
}

.wrongAnswer {
    animation-name: wiggle;
    animation-duration: 110ms;
    animation-iteration-count: 5;
}

.play-again-btn {
    user-select: none;
    border-radius: 5px;
    height: 60px;
    color: white;
    font-weight: bold;
    background-color: forestgreen;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;

}

@keyframes wiggle {
    0% {
        transform: translate(0, 0);
    }

    33% {
        transform: translate(5px, 0);
    }

    66% {
        transform: translate(-5px, 0);
    }

    100% {
        transform: translate(0, 0);
    }
}
</style>
