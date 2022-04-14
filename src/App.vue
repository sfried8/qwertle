<template>
    <div class="app-container">
        <PageHeader
            @how-to-play="showingHowToPlay = true"
            @statistics="showingStatistics = true"
        ></PageHeader>
        <GameMain @statistics="showingStatistics = true" />
        <HowToPlay
            v-if="showingHowToPlay"
            @close="showingHowToPlay = false"
        ></HowToPlay>
        <StatisticsModal
            v-if="showingStatistics"
            @close="showingStatistics = false"
        ></StatisticsModal>
    </div>
</template>

<script>
import GameMain from "./components/GameMain.vue";
import HowToPlay from "./components/HowToPlay.vue";
import StatisticsModal from "./components/StatisticsModal.vue";
import PageHeader from "./components/PageHeader.vue";
import { getItem, setItem } from "./SaveDataManager";

export default {
    name: "App",
    data() {
        return {
            showingHowToPlay: false,
            showingStatistics: false,
        };
    },
    mounted() {
        if (!getItem("seenHowToPlay")) {
            this.showingHowToPlay = true;
            setItem("seenHowToPlay", true);
        }
    },
    components: {
        GameMain,
        HowToPlay,
        PageHeader,
        StatisticsModal,
    },
};
</script>

<style>
body {
    background-color: #121213;
    width: calc(100vw - 16px);
    /* height: 100%; */
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #dddddd;
    width: 100%;
    height: 100%;
    margin: auto;
}
.app-container {
    width: 100%;
    height: 100%;
}
</style>
