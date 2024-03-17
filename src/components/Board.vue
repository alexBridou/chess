<template>
    <div class="board-container">
        <div class="board">
            <Case class="case" v-for="caseItem in this.board" v-bind:key="caseItem" :id="caseItem.id"
                :color="caseItem.color" :activePiece="caseItem.activePiece"></Case>
        </div>
    </div>
</template>

<script>
import Case from "./Case.vue";
import boardService from "../services/boardService";
export default {
    mixins: [boardService],
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
        console.log(this);
    },

    methods: {}

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