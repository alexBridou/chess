<template>
    <div class="case" :style=" isBlack ? { 'background-color': 'black', 'opacity': 0.4 } : { 'background-color': 'white' }">
    </div>
</template>

<script>
export default {
    data () {
        return {
            isBlack: this.color === "B"
        }
    },
    props: {
        id: "",
        color: ""
    }
}
</script>

<style>
.case {
    display: inline-block;
    width: 50px;
    height: 50px;
}
</style>