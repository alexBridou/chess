<template>
    <div class="case" @click="$emit('caseSelection')"
        :style="isBlack ? { 'background-color': 'grey' } : { 'background-color': 'white' }">
        <Piece v-if="activePiece" v-bind:key="activePiece" :name="activePiece.name" :url="getImageUrl()"
            :caseId="this.id" :color="activePiece.color" :type="activePiece.type">
        </Piece>
        <HighlightDot v-if="isHighlight"></HighlightDot>
    </div>
</template>

<script>
import Piece from "../components/Piece.vue";
import HighlightDot from "../components/icons/HighlightDot.vue"
export default {
    components: { Piece, HighlightDot },
    data() {
        return {
            isBlack: this.color === "B",
            isHighlight: false
        }
    },
    props: {
        id: "",
        color: "",
        activePiece: null
    },
    methods: {
        getImageUrl: function () {
            const name = this.activePiece.name.concat(this.activePiece.color);
            return "src/assets/pieces/" + name + ".png";
        },

        highlightCase: function () {
            this.isHighlight = true;
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