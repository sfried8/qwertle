<template>
    <div class="app-container">
        <PageHeader
            @how-to-play="showingHowToPlay = true"
            @statistics="showingStatistics = true"
        ></PageHeader>
        <GameMain ref="gameMain" @statistics="showingStatistics = true" />
        <Transition name="modal-background">
            <div
                class="modal-background"
                v-if="showingStatistics || showingHowToPlay"
                @click="showingStatistics = showingHowToPlay = false"
            ></div>
        </Transition>
        <Transition appear name="modal">
            <HowToPlay
                class="modal"
                v-if="showingHowToPlay"
                @close="showingHowToPlay = false"
            ></HowToPlay>
        </Transition>
        <Transition appear name="modal">
            <StatisticsModal
                class="modal"
                v-if="showingStatistics"
                @close="showingStatistics = false"
            ></StatisticsModal>
        </Transition>
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
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: translate(0, 10vh);
}
body {
    background-color: #121213;
    width: calc(100vw - 16px);
    /* height: 100%; */
}
.modal-background-enter-active,
.modal-background-leave-active {
    transition: opacity 0.25s ease-in-out;
}
.modal-background-enter-from,
.modal-background-leave-to {
    opacity: 0 !important;
}
.modal-background {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0.5;
    background-color: black;
    /* transform: translate(0, 0); */
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
