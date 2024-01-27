<template>
    <div class="accessibility-container">
        <div class="accessibility-container-inner">
<br/>

            <h3>Settings</h3>
            <br/>
            <h4>Color Scheme</h4>
             <select v-model="localcolorScheme">
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
                    <div class="x-button" @click="$emit('close')">X</div>

        </div>
        
    </div>
</template>

<script>
import { schemes } from '@/colorschemes';
import { getItem } from '@/SaveDataManager';

export default {
    data() {
        return {
            localcolorScheme: ''
        }
    },
    props: ["colorscheme"],
    computed: {
        schemeNames() {
            return Object.keys(schemes)
        },
        colorRange() {
            const currentscheme = this.colorscheme
            return [`hsl(${currentscheme[0][0]}deg, ${currentscheme[0][1]}%, ${currentscheme[0][2]}%)`,
            `hsl(${currentscheme[1][0]}deg, ${currentscheme[1][1]}%, ${currentscheme[1][2]}%)`]
        },
    },
    watch: {
        localcolorScheme() {
            // this.colorscheme = this.localcolorScheme
            this.$emit('change-scheme',this.localcolorScheme)
        }
    },
    mounted() {
        this.localcolorScheme = getItem('colorscheme') || 'stoplight'
    },
};
</script>

<style>
.accessibility-container-inner {
    position: relative;
    width: 90%;
    max-width: 500px;
    height: 40%;
    max-height: 750px;
    background-color: #121213;
    overflow-y: auto;
}
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
.accessibility-container {
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
