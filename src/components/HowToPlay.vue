<template>
    <div class="how-to-play-container">
        <div class="how-to-play-container-inner">
            <h3>How To Play</h3>
            <p>Guess the <strong>QWERTLE</strong> in six tries.</p>
            <p>
                Each guess must be a valid five-letter word. Hit the enter
                button to submit.
            </p>
            <p>
                After each guess, the color of the tiles will change to show how
                close each letter is on a QWERTY keyboard. The darker red the
                letter, the closer the keys are. A green letter is correct.
            </p>
            <h4>Example</h4>
            <div class="guess-container">
                <div class="previous-guess-letter correct">S</div>
                <div class="previous-guess-letter max-distance">Q</div>
                <div class="previous-guess-letter min-distance">U</div>
                <div class="previous-guess-letter mid-distance">A</div>
                <div class="previous-guess-letter max-distance">B</div>
            </div>
            <p>The first letter in the answer is <strong>S</strong></p>
            <p>The second letter is nowhere near <strong>Q</strong></p>
            <p>The third letter is very close to <strong>U</strong></p>
            <p>
                The fourth letter is a few keys away from
                <strong>A</strong>
            </p>
            <h4>A new QWERTLE will be available each day!</h4>
            <!-- <p> -->
            <!-- Something wrong?&nbsp;<button @click="reset">Reset game</button> -->
            <!-- </p> -->
            <div class="x-button" @click="$emit('close')">X</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        reset() {
            this.$parent.$parent.$refs.gameMain.resetGame();
            this.$emit("close");
        },
    },
};
</script>

<style>
.how-to-play-container-inner {
    position: relative;
    width: 90%;
    max-width: 500px;
    height: 90%;
    max-height: 750px;
    background-color: #121213;
}
.how-to-play-container {
    position: fixed;
    padding: 5vw;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
.min-distance {
    background-color: rgb(37, 3, 1);
}
.mid-distance {
    background-color: rgb(125, 8, 2);
}
.max-distance {
    background-color: rgb(255, 26, 0);
}
.correct {
    background-color: forestgreen;
}
.guess-container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.x-button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
}
</style>
