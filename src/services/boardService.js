import pieces from "../pieces"
export default {
    mixins: [pieces],
    data() {
        return {}
    },
    methods: {
        setBoard: function () {
            this.setCases();
            this.setPieces();
        },

        setPieces: function () {
            return this.board.map(c => c.activePiece = this.getFirstPiece(c.id));
        },

        setCases: function () {
            return this.columns.map((c, cIndex) => {
                return this.row.map((r, rIndex) => {
                    return this.board.push(Object.assign({
                        id: c + (r.toString()),
                        color: this.getColor(cIndex, rIndex)
                    }))
                })
            })
        },
        
        getColor: function (rowIndex, columnIndex) {
            const oddRow = this.isOdd(rowIndex + 1);
            const oddColumn = this.isOdd(columnIndex + 1);;
            if (oddRow) {
                return oddColumn ? "B" : "W";
            }
            return oddColumn ? "W" : "B";
        },

        isOdd: function (i) {
            return i % 2 === 0;
        },

        getFirstPiece: function (caseId) {
            return this.pieces.find(p => p.startingCase === caseId);
        },        

        highlightCases: function (casesId = []) {
            casesId.forEach(caseId => this.highlightCase(caseId));
        },

        highlightCase: function (caseId) {
            const boardCase = this.$refs.caseComponent.find(c => c.id === caseId);
            boardCase.highlightCase();
        },

        highlightCaptureCases: function (casesId = []) {
            casesId.forEach(caseId => this.highlightCaptureCase(caseId));
        },

        highlightCaptureCase: function (caseId) {
            const boardCase = this.$refs.caseComponent.find(c => c.id === caseId);
            boardCase.highlightCapture();
        },

        removeCasesHighlight: function () {
            this.$refs.caseComponent.forEach(caseObj => {
                caseObj.isHighlight = false;
                caseObj.isHighlightCapture = false;
            });
        },

        getColumn: function (caseItem) {
            return caseItem.id.split('')[0];
        },

        getLine: function (caseItem) {
            return parseInt(caseItem.id.split('')[1]);
        },        

        isCaseFree: function (caseId) {
            const boardCase = this.board.find(c => c.id === caseId);
            if (boardCase && !boardCase.activePiece) {
                return true;
            }
            return false;
        },
    }
}