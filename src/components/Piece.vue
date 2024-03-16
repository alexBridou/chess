<template>
    <div class="container">
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
        url: "src/assets/pieces/B.png",
        color: "",
        name: ""
    },
    methods: {
        getImageUrl: function () {
            return "src/assets/pieces/B.png";
        }
    }
}
</script>

<style>
.container {
    display: flex;
}
.picto {
    width: 50px;
    height: 50px;
}
</style>