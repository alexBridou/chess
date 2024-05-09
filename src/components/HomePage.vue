<template>
    <BoardController v-if="gameStarted"></BoardController>
</template>

<script>
import BoardController from "./BoardController.vue"

export default {
    components: {
        BoardController
    },

    data() {
        return {
            gameStarted: true
        }
    }
}
</script>

<style></style>