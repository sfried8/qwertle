<template>
    <div class="modal-container" @click.self="hide">
        <div class="modal-container-inner">

            <slot></slot>
            <div class="x-button" @click="hide">X</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        hide() {
            this.$store.commit('hide_modal')
        }
    }
};
</script>

<style>
@media screen and (max-height:750px) {
    .modal-container-inner {
        max-height: 95vh;
    }
}

@media screen and (min-height:750px) {
    .modal-container-inner {
        max-height: 750px;
    }
}

.modal-container-inner {
    position: relative;
    width: 90%;
    max-width: 500px;
    /* height: 40%; */
    padding: 10px;
    background-color: #121213;
    overflow-y: auto;
}

.modal-container {
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


.x-button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
}
</style>
