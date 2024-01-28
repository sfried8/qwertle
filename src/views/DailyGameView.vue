<template>
    <div class="app-container">
        <GameMain ref="gameMain"/>
    </div>
</template>

<script>
import GameMain from "@/components/GameMain.vue";


export default {
    name: "App",
    data() {
        return {

        };
    },

    components: {
        GameMain,
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