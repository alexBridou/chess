<template>
    <div class="piece-container">
        <img class="picto" :src="url" alt="">
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        url: "",
        color: "",
        name: ""
    }
}
</script>

<style>
.piece-container {
    display: flex;
    justify-content: center;
}

.picto {
    width: 60px;
    height: 60px;
    margin-top: 8%;
}
</style>