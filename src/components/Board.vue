<template>
    <div class="board-container">
        <div class="board">
            <Case class="case" ref="caseComponent" @caseSelection="onCaseSelection(caseItem)" v-for="caseItem in this.board" v-bind:key="caseItem" :id="caseItem.id"
                :color="caseItem.color" :activePiece="caseItem.activePiece" :isHighlight="false" ></Case>
        </div>
    </div>
</template>

<script>
import Case from "./Case.vue";
import boardService from "../services/boardService";
import pieceService from "../services/pieceService"
export default {
    mixins: [boardService, pieceService],
    components: {
        Case
    },
    props:
        {},

    data() {
        return {
            board: [],
            activePieces: [],
            columns: [
                "a", "b", "c", "d", "e", "f", "g", "h"
            ],
            row: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    },

    beforeMount() {
        this.setBoard();
        this.activePieces = this.pieces;
        console.log(this);
    },

    methods: {
        onCaseSelection: function (caseObject) {
            if (caseObject.activePiece) {
                return this.handlePieceSelection(caseObject)
            }
            return false;
        },

        handlePieceSelection: function (caseObject) {
            this._handlePieceSelection(caseObject)
        }
    }

}
</script>

<style>
.board-container {
    border: 1px solid black;
}

.board {
    display: flex;
    width: 560px;
    height: 560px;
    flex-direction: column-reverse;
    flex-wrap: wrap;
}
</style>