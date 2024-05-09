<template>
    <div class="board-container">
        <div class="board" v-on:click.right="onRightClick($event)">
            <Case class="case" ref="caseComponent" @caseSelection="onCaseSelection(caseItem)"
                v-for="caseItem in this.board" v-bind:key="caseItem" :id="caseItem.id" :color="caseItem.color"
                :activePiece="caseItem.activePiece" :isHighlight="false"></Case>
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
            activePieces: [], // pices on the board
            selectedPiece: null, // piece selected by player
            possibleCases: null,
            possibleTakes: null,
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
            if (caseObject.activePiece && !this.selectedPiece) {
                this.selectedPiece = caseObject.activePiece;
                return this.handlePieceSelection(caseObject)
            }
            return this.handleCaseSelection(caseObject);
        },

        onRightClick: function (e) {
            if (e) {
                e.preventDefault();
            }
            this.resetBoardSelection();
        },

        handlePieceSelection: function (caseObject) {
            this._handlePieceSelection(caseObject)
        },

        handleCaseSelection: function (caseObject) {
            if (this.possibleCases && this.possibleCases.find(p => p === caseObject.id)) {
                return this.movePiece(caseObject, this.selectedPiece);
            } else if (this.possibleTakes && this.possibleTakes.find(p => p === caseObject.id)) {
                return this.capturePiece(caseObject, this.selectedPiece);
            }
        },

        resetBoardSelection: function () {
            this.selectedPiece = null;
            this.possibleCases = null;
            this.removeCasesHighlight();
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