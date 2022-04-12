<template>
    <div class="app-container">
        <PageHeader
            @how-to-play="showingHowToPlay = true"
            @statistics="showingStatistics = true"
        ></PageHeader>
        <GameMain />
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

export default {
    name: "App",
    data() {
        return {
            qwertleData: {},
            showingHowToPlay: false,
            showingStatistics: false,
        };
    },
    mounted() {
        this.qwertleData = JSON.parse(
            window.localStorage.getItem("qwertleData") || "{}"
        );
        if (!this.qwertleData.seenHowToPlay) {
            this.showingHowToPlay = true;
            this.setQwertleData("seenHowToPlay", true);
        }
    },
    methods: {
        setQwertleData(name, value) {
            this.qwertleData[name] = value;
            window.localStorage.setItem(
                "qwertleData",
                JSON.stringify(this.qwertleData)
            );
        },
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
    height: calc(100vh - 16px);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    margin: auto;
}
.app-container {
    width: 100%;
    height: 100%;
}
</style>
