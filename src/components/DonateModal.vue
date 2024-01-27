<template>
    <div class="donate-container">
        <div class="donate-container-inner">
<br/>
<br/>
<br/>
            <h4>Like QWERTLE? Buy me a coffee if you want to support. Or don't!</h4>
            <a href="https://www.buymeacoffee.com/samfriedman" target="_blank">
                <img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
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
.donate-container-inner {
    position: relative;
    width: 90%;
    max-width: 500px;
    height: 40%;
    max-height: 750px;
    background-color: #121213;
    overflow-y: auto;
}
.donate-container {
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
