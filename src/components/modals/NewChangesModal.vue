<template>
    <ModalBase>
        <br />

        <h4>NEW CHANGES</h4>
        <div style="text-align:left;">

            <ul v-if="features.length">
                <li v-for="feature in features" :key="feature">{{ feature }}</li>
            </ul>
            <p v-if="features.length && bugfixes.length">Also,</p>
            <ul v-if="bugfixes.length">
                <li v-for="bugfix in bugfixes" :key="bugfix">{{ bugfix }}</li>
            </ul>
        </div>
        <!-- <p> -->
        <!-- Something wrong?&nbsp;<button @click="reset">Reset game</button> -->
        <!-- </p> -->
    </ModalBase>
</template>

<script>
import ModalBase from './ModalBase.vue';
import { getChangesSince } from '@/changelog'

export default {
    data() {
        return {
            features: [],
            bugfixes: []
        }
    },
    mounted() {
        const lastSeenVersion = this.$store.state.penultimateSeenVersion
        const newChanges = getChangesSince(lastSeenVersion)
        this.features.push(...newChanges.features)
        this.bugfixes.push(...newChanges.bugfixes)
    },
    components: { ModalBase }
};
</script>

<style></style>
