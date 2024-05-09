<template>
    <div class="boardController">
        <button class="switch" v-on:click="onSwitchSide($event)">switch side</button>
        <Board ref="boardComponent"  @pieceTaken="onPieceTaken($event)"></Board>
        <CaptureZone  ref="captureZone"></CaptureZone>
    </div>
</template>

<script>
import Board from "./Board.vue"
import CaptureZone from "./CaptureZone.vue";
export default {
    components: {
        Board, CaptureZone
    },

    methods: {
        onSwitchSide: function (e) {
            this.$refs.boardComponent.board.reverse()
            this.$refs.captureZone.reverse();
        },
        
        onPieceTaken: function (capturedPieces) {
            this.$refs.captureZone.updateCaptureZone(capturedPieces);
        }
    }
}
</script>

<style>
.boardController {
    display: flex
}

.switch {
    height: 20px;
}
</style>