<template>
    <div class="statistics-container">
        <h3>Statistics</h3>
        <table style="width: 100%">
            <thead>
                <td>Current<br />Streak</td>
                <td>Longest<br />Streak</td>
                <td>Games<br />Played</td>
                <td>Games<br />Won</td>
                <td>Win<br />Percent</td>
            </thead>
            <tr>
                <td>{{ stats.currentStreak }}</td>
                <td>{{ stats.maxStreak }}</td>
                <td>{{ stats.gamesPlayed }}</td>
                <td>{{ stats.gamesWon }}</td>
                <td>{{ stats.winPercentage }}</td>
            </tr>
        </table>
        <div class="guess-distribution">
            guess distribution WIP
            <!-- <div>
                1:
                <div
                    class="guess-bar"
                    :style="{ width: stats.guesses[1] + '00px' }"
                />
            </div>
            <div>
                2:
                <div
                    class="guess-bar"
                    :style="{ width: stats.guesses[2] + '00px' }"
                />
            </div>
            <div>
                3:
                <div
                    class="guess-bar"
                    :style="{ width: stats.guesses[3] + '00px' }"
                />
            </div>
            <div>
                4:
                <div
                    class="guess-bar"
                    :style="{ width: stats.guesses[4] + '00px' }"
                />
            </div>
            <div>
                5:
                <div
                    class="guess-bar"
                    :style="{ width: stats.guesses[5] + '00px' }"
                />
            </div>
            <div>
                6:
                <div
                    class="guess-bar"
                    :style="{ width: stats.guesses[6] + '00px' }"
                />
            </div>
            <div>
                X:
                <div
                    class="guess-bar guess-bar-fail"
                    :style="{ width: stats.guesses['fail'] + '00px' }"
                />
            </div> -->
        </div>
        <div class="x-button" @click="$emit('close')">X</div>
    </div>
</template>

<script>
import { getItem, setItem } from "../SaveDataManager";
export default {
    mounted() {
        const existingStats = getItem("stats");
        if (!existingStats) {
            setItem("stats", this.stats);
        } else {
            this.stats = existingStats;
        }
    },
    data() {
        return {
            stats: {
                guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
                currentStreak: 0,
                gamesPlayed: 0,
                gamesWon: 0,
                maxStreak: 0,
                winPercentage: 0,
            },
        };
    },
};
</script>

<style>
.guess-bar {
    height: 50px;
    border-radius: 5px;
    background-color: forestgreen;
    display: inline-block;
    margin: 8px;
}
.guess-bar-fail {
    background-color: red;
}
.guess-distribution {
    padding: 5px;
}
.statistics-container {
    position: fixed;
    padding: 5vw;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #121213;
    color: white;
}
.x-button {
    position: fixed;
    top: 7vw;
    right: 7vw;
    width: 25px;
    height: 25px;
}
.statistics-container tr td {
    font-size: 32px;
}
.statistics-container thead td {
    font-size: 14px;
}
</style>
