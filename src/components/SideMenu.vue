<template>
    <div class="side-menu-container">
        <div class="side-menu-item" @click="showModal('how-to-play')">
            <div class="side-menu-icon">?</div>
            <div>How to play</div>
        </div>
        <div class="side-menu-item" @click="toggleDaily">
            <div class="side-menu-icon">{{ isDaily ? '∞' : '🗓' }}</div>
            <div>{{ isDaily ? 'Practice' : 'Daily' }}</div>
        </div>
        <div class="side-menu-item" @click="showModal('statistics')">
            <div class="side-menu-icon"> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path fill="white" d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z">
                    </path>
                </svg></div>
            <div>Daily Stats</div>
        </div>

        <div class="side-menu-item" @click="showModal('accessibility')">
            <div class="side-menu-icon">⚙</div>
            <div>Settings</div>
        </div>
        <div class="side-menu-item" @click="showModal('donate')">
            <div class="side-menu-icon">$</div>
            <div>Donate</div>
        </div>
        <div style="flex-grow:2">

        </div>
        <div>Made by <br />Sam Friedman</div>
        <div>v{{ APP_VERSION }}</div>
        <div class="x-button" @click="hide">X</div>
    </div>
</template>

<script>
export default {
    methods: {
        hide() {
            this.$store.commit('hide_modal')
        },
        showModal(modal) {
            this.$store.commit('show_modal', modal)
        },
        toggleDaily() {
            this.hide()
            window.umami.track('switch-mode', { isDaily: this.isDaily })
            this.$router.push(this.isDaily ? 'practice' : 'daily')
        }
    },
    computed: {
        isDaily() {
            return this.$route.name == 'daily'
        }
    }
};
</script>

<style>
.side-menu-container {
    position: fixed;
    padding: 5vw;
    left: 0;
    right: 50%;
    top: 0;
    bottom: 0;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #121213;
}

.side-menu-icon {
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 25px;
    font-weight: bold;
    margin-right: 10px;
}

.side-menu-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    padding: 12.5px;
    width: 90%;
    vertical-align: middle;
    line-height: 25px;
    border-bottom: 1px #3a3a3c solid;

}

.x-button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
}
</style>
