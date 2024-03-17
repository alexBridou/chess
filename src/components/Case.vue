<template>
    <div class="case" :style="isBlack ? { 'background-color': 'grey' } : { 'background-color': 'white' }">
        <Piece v-if="activePiece" v-bind:key="activePiece" :name="activePiece.name" :url="getImageUrl()">
        </Piece>
    </div>
</template>

<script>
import Piece from "../components/Piece.vue";
export default {
    components: { Piece },
    data() {
        return {
            isBlack: this.color === "B"
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