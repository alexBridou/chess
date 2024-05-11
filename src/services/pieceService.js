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
                default:
                    return this.handlePawnSelection(selectedCase);
            }
        },

        getImageUrl: function (piece) {
            const name = piece.name.concat(piece.color);
            return "src/assets/pieces/" + name + ".png";
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

        ///////////////////// PAWN /////////////////////
        handlePawnSelection: function (selectedCase) {
            const possibleCases = this.getPawnMoving(selectedCase);
            const possibleTakes = this.getPawnCapture(selectedCase);
            this.highlightCases(possibleCases);
            this.highlightCaptureCases(possibleTakes);
            this.possibleCases = possibleCases;
            this.possibleTakes = possibleTakes;
        },

        isCase: function (caseId) {
            return this.board.find(c => c.id === caseId);
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
            this.capturedPieces.push(capturedPiece);
            const index = this.activePieces.indexOf(capturedPiece);
            this.activePieces.splice(index, 1);
            this.movePiece(caseToTake, piece);
            return this.$emit('pieceTaken', this.capturedPieces);

        }
    }
}