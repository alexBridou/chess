import moveService from "./moveService";
export default {
    mixins: [moveService],
    data() {
        return {}
    },
    methods: {
        _handlePieceSelection: function (selectedCase) {
            switch (selectedCase.activePiece.type) {
                case "pawn":
                    return this.handlePawnSelection(selectedCase);
                case "knight":
                    return this.handleKnightSelection(selectedCase);
                case "bishop":
                    return this.handleBishopSelection(selectedCase);
                case "rook":
                    return this.handleRookSelection(selectedCase);
                case "queen":
                    return this.handleQueenSelection(selectedCase);
                case "king":
                    return this.handleKingSelection(selectedCase);
                default:
                    return this.handlePawnSelection(selectedCase);
            }
        },

        getPieceCaptures: function (selectedCase) {
            switch (selectedCase.activePiece.type) {
                case "pawn":
                    return this.getPawnCapture(selectedCase);
                case "knight":
                    const availableCases = this.getKnightMoving(selectedCase);
                    return this.getKnightCapture(selectedCase, availableCases);
                case "bishop":
                    return this.getBishopCapture(selectedCase);
                case "rook":
                    return this.getRookCapture(selectedCase);
                case "queen":
                    return this.getQueenCapture(selectedCase);
                case "king":
                    return this.getKingCapture(selectedCase);
                default:
                    return this.getPawnCapture(selectedCase);
            }
        },

        getImageUrl: function (piece) {
            const name = piece.name.concat(piece.color);
            return "src/assets/pieces/" + name + ".png";
        },

        movePiece: function (caseToMove, pieceToMove) {
            const newCase = this.board.find(i => i.id === caseToMove.id);
            const previousCase = this.board.find(c => c.activePiece && c.activePiece.id === pieceToMove.id);
            previousCase.activePiece = null;
            newCase.activePiece = pieceToMove;
            this.resetBoardSelection();
            return this.$emit('pieceMoved', {
                newCase,
                pieceToMove
            });
        },

        capturePiece: function (caseToTake, piece) {
            const capturedPiece = this.board.find(c => c.id === caseToTake.id).activePiece;
            this.capturedPieces.push(capturedPiece);
            const index = this.activePieces.indexOf(capturedPiece);
            this.activePieces.splice(index, 1);
            this.movePiece(caseToTake, piece);
            return this.$emit('pieceTaken', this.capturedPieces);

        },

        handleKingSelection: function (selectedCase) {
            const possibleCases = this.getKingMoving(selectedCase);
            this.highlightCases(possibleCases);
            // this.highlightCaptureCases(possibleTakes);
            this.possibleCases = possibleCases;
            this.possibleTakes = []
            // this.possibleTakes = possibleTakes;
        },

        handleQueenSelection: function (selectedCase) {
            const possibleCases = this.getQueenMoving(selectedCase);
            const possibleTakes = this.getQueenCapture(selectedCase);
            this.highlightCases(possibleCases);
            this.highlightCaptureCases(possibleTakes);
            this.possibleCases = possibleCases;
            this.possibleTakes = possibleTakes;
        },

        handleRookSelection: function (selectedCase) {
            const possibleCases = this.getRookMoving(selectedCase);
            const possibleTakes = this.getRookCapture(selectedCase);
            this.highlightCases(possibleCases);
            this.highlightCaptureCases(possibleTakes);
            this.possibleCases = possibleCases;
            this.possibleTakes = possibleTakes;
        },

        handleBishopSelection: function (selectedCase) {
            const possibleCases = this.getBishopMoving(selectedCase);
            const possibleTakes = this.getBishopCapture(selectedCase);
            this.highlightCases(possibleCases);
            this.highlightCaptureCases(possibleTakes);
            this.possibleCases = possibleCases;
            this.possibleTakes = possibleTakes;
        },

        handleKnightSelection: function (selectedCase) {
            const availableCases = this.getKnightMoving(selectedCase);
            const possibleTakes = this.getKnightCapture(selectedCase, availableCases);
            const possibleCases = this.filterKnightCases(availableCases, possibleTakes);
            this.highlightCases(possibleCases);
            this.highlightCaptureCases(possibleTakes);
            this.possibleCases = possibleCases;
            this.possibleTakes = possibleTakes;
        },

        handlePawnSelection: function (selectedCase) {
            const possibleCases = this.getPawnMoving(selectedCase);
            const possibleTakes = this.getPawnCapture(selectedCase);
            this.highlightCases(possibleCases);
            this.highlightCaptureCases(possibleTakes);
            this.possibleCases = possibleCases;
            this.possibleTakes = possibleTakes;
        }
    }
}