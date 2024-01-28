<template>
<ModalBase>
<br/>

            <h3>Settings</h3>
            <br/>
            <h4>Color Scheme</h4>
             <select :value="colorscheme" @change="setColorscheme">
        <option
            v-for="scheme in schemeNames"
            :key="scheme"
            :value="scheme"
            >{{ scheme.charAt(0).toUpperCase()+scheme.substring(1) }}</option>
        </select>
        <div class="accessibility-gauge">
            <span>FAR</span>
            <!-- <img src="@/assets/colorgauge.png"/> -->
            <div></div>
            <span>CLOSE</span>
        </div>
        <p>Note: The color gauge does NOT work on Firefox! Working on a fix, sorry Firefox users!</p>


    </ModalBase>
</template>

<script>
import schemes from '@/colorschemes';
import ModalBase from './ModalBase.vue';

export default {
    computed: {
        colorscheme() {
            return this.$store.state.colorschemename
        },
        schemeNames() {
            return Object.keys(schemes);
        },
        colorRange() {
            const currentscheme = this.$store.getters.colorscheme;
            return [`hsl(${currentscheme[0][0]}deg, ${currentscheme[0][1]}%, ${currentscheme[0][2]}%)`,
                `hsl(${currentscheme[1][0]}deg, ${currentscheme[1][1]}%, ${currentscheme[1][2]}%)`];
        },
    },
    methods:{
        setColorscheme(event) {
            this.$store.commit('set_current_scheme',event.target.value)

        }
    },
    components: { ModalBase }
};
</script>

<style>

.accessibility-gauge {
    margin:10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
        
    div {
        height:20px;
        width: 70%;
        background: linear-gradient(90deg in hsl, v-bind('colorRange[0]'), v-bind('colorRange[1]'));
        
    }
}

</style>
