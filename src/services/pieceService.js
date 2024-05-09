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
            const possibleTakes = this.getPawnCapture(selectedCase);
            this.highlightCases(possibleCases);
            this.highlightCaptureCases(possibleTakes);
            this.possibleCases = possibleCases;
            this.possibleTakes = possibleTakes;
        },

        getPawnMoving: function (selectedCase) {
            const isWhite = selectedCase.activePiece.color === "W";
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

        getPawnCapture: function (selectedCase) {
            const isWhite = selectedCase.activePiece.color === "W";
            const column = this.getColumn(selectedCase);
            const line = this.getLine(selectedCase);
            const possibleCases = [];
            const currentColumnIndex = this.columns.indexOf(column);
            const previousColumn = this.columns[isWhite ? currentColumnIndex - 1 : currentColumnIndex + 1];
            const nextColumn = this.columns[isWhite ? currentColumnIndex + 1 : currentColumnIndex - 1];
            const leftCase = previousColumn.concat(isWhite ? line + 1 : line - 1);
            const rightCase = nextColumn.concat(isWhite ? line + 1 : line - 1);
            if (!this.isCaseFree(leftCase) && this.isOpponentPiece(selectedCase.activePiece.color, leftCase)) {
                possibleCases.push(leftCase);
            }
            if (!this.isCaseFree(rightCase) && this.isOpponentPiece(selectedCase.activePiece.color, rightCase)) {
                possibleCases.push(rightCase);
            }
            return possibleCases;
        },

        isOpponentPiece: function (color, caseId) {
            const piece = this.board.find(c => c.id === caseId).activePiece;
            return color !== piece.color;
        },

        movePiece: function (caseToMove, pieceToMove) {
            const newCase = this.board.find(i => i.id === caseToMove.id);
            const previousCase = this.board.find(c => c.activePiece && c.activePiece.id === pieceToMove.id);
            previousCase.activePiece = null;
            newCase.activePiece = pieceToMove;
            this.resetBoardSelection();
        },

        capturePiece: function (caseToTake, piece) {
            const capturedPiece = this.board.find(c => c.id === caseToTake.id).activePiece;
            const index = this.activePieces.indexOf(capturedPiece);
            this.activePieces.splice(index, 1);
            this.movePiece(caseToTake, piece);

        }
    }
}