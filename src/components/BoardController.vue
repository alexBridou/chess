<template>
    <button v-on:click="onSwitchSide($event)">switch side</button>
    <Board ref="boardComponent"></Board>
</template>

<script>
import Board from "./Board.vue"
export default {
    components: {
        Board
    },

    methods: {
        onSwitchSide: function (e) {
            this.$refs.boardComponent.board.reverse()
        }
    }
}
</script>