<template>
    <ModalBase>
        <br />

        <h4>Changelog</h4>
        <div style="text-align:left;" v-for="change in changes" :key="change.version">
            <p>{{ change.version }}</p>
            <ul>
                <li v-if="change.features.length">
                    Features
                    <ul>
                        <li v-for="feature in change.features" :key="change.version + feature">{{ feature }}</li>
                    </ul>
                </li>
                <li v-if="change.bugfixes.length">
                    Bugfixes
                    <ul>
                        <li v-for="bugfix in change.bugfixes" :key="change.version + bugfix">{{ bugfix }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- <p> -->
        <!-- Something wrong?&nbsp;<button @click="reset">Reset game</button> -->
        <!-- </p> -->
    </ModalBase>
</template>

<script>
import { CHANGES } from '@/changelog';
import ModalBase from './ModalBase.vue';

export default {
    computed: {
        changes() {
            return CHANGES
        }
    },
    components: { ModalBase }
};
</script>

<style></style>
