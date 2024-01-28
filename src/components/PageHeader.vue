<template>
    <header class="header">

        <div @click="showModal('sidemenu')">☰</div>
        <div>
            <span>
                <h2 style="display:inline-block">QWERTLE</h2>
            </span>
            <span class="game-mode">{{ isDaily ? 'DAILY' : 'PRACTICE' }}</span>
        </div>

        <!-- <span></span> -->
        <div style="display: flex;">


            <div class="htp-icon" @click="showModal('how-to-play')">?</div>
        </div>
    </header>
</template>

<script>


export default {
    computed: {
        isDaily() {
            return this.$route.name == 'daily'
        }
    },
    methods: {
        showModal(modalName) {
            this.$store.commit('show_modal', modalName)
        },

    }
};
</script>

<style>
.header {
    padding: 0 20px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    border-bottom: 1px #3a3a3c solid;
}

.htp-icon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
    border: 2px solid white;
    border-radius: 50%;
}

.game-mode {
    margin-left: 7px;
    font-size: smaller;
    color: #6a6a6c
}
</style>
