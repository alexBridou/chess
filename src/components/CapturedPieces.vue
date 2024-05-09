<template>
    <div class="capturedPieces">
        <div v-bind:key="piece" v-for="piece in this.pieces">
            <img  class="pieceIcon" :src="this.getImageUrl(piece)" alt="">
        </div>
    </div>
</template>

<script>
import pieceService from "../services/pieceService"
export default {
    mixins: [pieceService],
    props: {
        pieces: []
    }
}
</script>

<style>
.capturedPieces {
    display: flex;
}
.pieceIcon {
    width: 20px;
    height: 20px;
}
</style>