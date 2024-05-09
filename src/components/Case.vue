<template>
    <div class="case" @click="$emit('caseSelection')"
        :style="isHighlightCapture ? { 'background-color': 'red' } : isBlack ? { 'background-color': 'grey' } : { 'background-color': 'white' }">
        <Piece v-if="activePiece" v-bind:key="activePiece" :name="activePiece.name" :url="getImageUrl(activePiece)"
            :caseId="this.id" :color="activePiece.color" :type="activePiece.type">
        </Piece>
        <HighlightDot v-if="isHighlight"></HighlightDot>
    </div>
</template>

<script>
import Piece from "../components/Piece.vue";
import HighlightDot from "../components/icons/HighlightDot.vue"
import pieceService from "../services/pieceService"
export default {
    components: { Piece, HighlightDot },
    mixins: [pieceService],
    data() {
        return {
            isBlack: this.color === "B",
            isHighlight: false,
            isHighlightCapture: false
        }
    },
    props: {
        id: "",
        color: "",
        activePiece: null
    },
    methods: {
        highlightCase: function () {
            this.isHighlight = true;
        },

        highlightCapture: function () {
            this.isHighlightCapture = true;
        }
    }
}
</script>

<style>
.case {
    display: inline-block;
    width: 70px;
    height: 70px;
}
</style>