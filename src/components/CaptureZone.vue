<template>
    <div class="captureZone"
        :style="isReversed ? { 'flex-direction': 'column-reverse' } : { 'flex-direction': 'column' }">
        <CapturedPieces :pieces="this.white"></CapturedPieces>
        <CapturedPieces :pieces=this.black></CapturedPieces>
    </div>
</template>

<script>
import CapturedPieces from "./CapturedPieces.vue";
export default {
    components: {
        CapturedPieces
    },
    data() {
        return {
            white: [],
            black: [],
            isReversed: false
        }
    },
    methods: {
        updateCaptureZone: function (capturedPieces) {
            const lastTaken = capturedPieces[capturedPieces.length - 1];
            if (lastTaken.color === "W") {
                return this.white.push(lastTaken)
            }
            return this.black.push(lastTaken)
        },

        reverse: function () {
            this.isReversed = !!!this.isReversed;
        }
    }
}
</script>

<style>
.captureZone {
    display: flex;
    height: 560px;
    width: 20%;
    justify-content: space-between;
}
</style>
