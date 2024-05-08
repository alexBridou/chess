export default {
    data() {
        return {}
    },
    methods: {
        _handlePieceSelection: function (selectedCase) {
            switch (selectedCase.activePiece.type) {
                case "pawn":
                    return this.handlePawnSelection(selectedCase);
                default:
                    return this.handlePawnSelection(selectedCase);
            }
        },

        handlePawnSelection: function (selectedCase) {
            const possibleCases = this.getPawnMoving(selectedCase);
            this.highlightCases(possibleCases);
            this.possibleCases = possibleCases;
        },

        getPawnMoving: function (selectedCase) {
            const isWhite = selectedCase.activePiece.color === "W"
            const column = this.getColumn(selectedCase);
            const line = this.getLine(selectedCase);
            const possibleCases = [];
            const fwdOneCase = column.concat((isWhite ? line + 1 : line - 1).toString());
            if (this.isCaseFree(fwdOneCase)) {
                possibleCases.push(fwdOneCase)
            }
            const hasNotMoved = selectedCase.id === selectedCase.activePiece.startingCase;
            if (hasNotMoved && this.isCaseFree(fwdOneCase)) {
                const fwdTwoCases = column.concat((isWhite ? line + 2 : line - 2).toString());
                if (this.isCaseFree(fwdTwoCases)) {
                    possibleCases.push(fwdTwoCases)
                }
            }
            return possibleCases;
        },

        movePiece: function (caseToMove, pieceToMove) {
            const newCase = this.board.find(i => i.id === caseToMove.id);
            const previousCase = this.board.find(c => c.activePiece && c.activePiece.id === pieceToMove.id);
            previousCase.activePiece = null;
            newCase.activePiece = pieceToMove;
            this.resetBoardSelection();
        }
    }
}