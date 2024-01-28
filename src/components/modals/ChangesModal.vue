<template>
    <ModalBase>
        <br />

        <h4>New in version {{ APP_VERSION }}</h4>
        <p>Practice mode! Switch between Practice and Daily mode in the menu by tapping ☰</p>
        <!-- <p> -->
        <!-- Something wrong?&nbsp;<button @click="reset">Reset game</button> -->
        <!-- </p> -->
    </ModalBase>
</template>

<script>
import ModalBase from './ModalBase.vue';

export default {
    components: { ModalBase }
};
</script>

<style></style>
