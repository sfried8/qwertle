<template>
    <header class="header">
        <div class="htp-icon" @click="$emit('how-to-play')">?</div>
        <div><h2>QWERTLE</h2></div>
        <div @click="$emit('statistics')">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    fill="white"
                    d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
                ></path>
            </svg>
        </div>
    </header>
</template>

<script>
export default {};
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
</style>
