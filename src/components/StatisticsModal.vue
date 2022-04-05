<template>
    <div class="statistics-container">
        <h3>Statistics</h3>
        <p>coming soon...</p>
        <div class="x-button" @click="$emit('close')">X</div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.statistics-container {
    position: fixed;
    padding: 5vw;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #121213;
    color: white;
}
.x-button {
    position: fixed;
    top: 7vw;
    right: 7vw;
    width: 25px;
    height: 25px;
}
</style>
