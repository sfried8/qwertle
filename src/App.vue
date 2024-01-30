<template>
    <div class="app-container">
        <PageHeader></PageHeader>
        <router-view></router-view>
        <Transition name="modal-background">
            <div class="modal-background" v-if="currentmodal != null" @click="hidemodal"></div>
        </Transition>
        <Transition appear name="modal">
            <component v-if="currentmodal != null && !showMenu" :is="currentmodal"></component>
        </Transition>
        <Transition name="sidemenu">
            <SideMenu v-if="showMenu"></SideMenu>
        </Transition>
    </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import { getChangesSince } from "./changelog";
import SideMenu from "./components/SideMenu.vue";



export default {
    name: "App",
    created() {
        this.$store.commit('initialize_store')
    },
    mounted() {
        setTimeout(() => {

            if (!this.$store.state.seenHowToPlay) {
                this.$store.commit('show_modal', 'how-to-play')
                this.$store.commit('set_seen_how_to_play')
            } else {
                const newChanges = getChangesSince(this.$store.state.lastSeenVersion)
                if (newChanges.features.length) {
                    this.$store.commit('show_modal', 'newchanges')
                }
            }
            this.$store.commit('set_last_seen_version', this.APP_VERSION)
        }, 500);
    },
    computed: {
        showMenu() {
            return this.$store.state.currentlyShownModalName == 'sidemenu'
        },
        currentmodal() {
            return this.$store.getters.currentlyShownModal
        }
    },
    components: {
        PageHeader,
        SideMenu
    },
    methods: {
        hidemodal() {
            this.$store.commit('hide_modal')
        }
    }
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

.sidemenu-enter-active,
.sidemenu-leave-active {
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}

.sidemenu-enter-from,
.sidemenu-leave-to {
    opacity: 0;
    transform: translate(-50vw, 0);
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