<template>
    <div class="container">
        <div class="board">
            <Case class="case" v-for="caseItem in this.board" v-bind:key="caseItem" :id="caseItem.id"
                :color="caseItem.color"></Case>
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
            columns: [
                "a", "b", "c", "d", "e", "f", "g", "h"
            ],
            row: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    },

    beforeMount() {
        this.setBoard();
        console.log(this)
        // this.setPieces(this.board)
    },

    methods: {}

}
</script>

<style>
.container {
    border: 1px solid black;
}

.board {
    display: flex;
    width: 400px;
    height: 400px;
    flex-direction: column-reverse;
    flex-wrap: wrap;
}
</style>