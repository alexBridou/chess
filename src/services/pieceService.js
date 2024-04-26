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
            console.log(selectedCase);
            const possibleCases = this.getPawnMoving(selectedCase);
            console.log(possibleCases);
        },

        getPawnMoving: function (selectedCase) {
            const column = selectedCase.id.split('')[0];
            const line = parseInt(selectedCase.id.split('')[1]);
            const possibleCases = [];
            const fwdOneCase = column.concat((line + 1).toString());
            if (this.isCaseFree(fwdOneCase)) {
                possibleCases.push(fwdOneCase)
            }
            const hasNotMoved = selectedCase.id === selectedCase.activePiece.startingCase;
            if (hasNotMoved) {
                const fwdTwoCases = column.concat((line + 2).toString());
                if (this.isCaseFree(fwdTwoCases)) {
                    possibleCases.push(fwdTwoCases)
                }
            }
            possibleCases.forEach(c => this.highlightCase(c));

            return "ssss"
        },

        isCaseFree: function (caseId) {
            const boardCase = this.board.find(c => c.id === caseId);
            if (!boardCase.activePiece) {
                return true;
            }
            return false;
        },

        highlightCase: function (caseId) {
                // const boardCase = this.board.find(caseObj => caseObj.id === caseId);
                const boardCase = this.$refs.caseComponent.find(c => c.id === caseId)
               boardCase.highlightCase();
        }
    }
}