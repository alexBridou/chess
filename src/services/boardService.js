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

        getDiagonals: function (selectedCase) {
            const rightUpDiag = this.getRightUpDiag(selectedCase);
            const leftUpDiag = this.getLeftUpDiag(selectedCase);
            const rightDownDiag = this.getRightDownDiag(selectedCase);
            const leftDownDiag = this.getLeftDownDiag(selectedCase);
            return [rightUpDiag, leftUpDiag, rightDownDiag, leftDownDiag].flat();
        },

        getLeftDownDiag: function (selectedCase) {
            const line = this.getLine(selectedCase);
            const column = this.getColumn(selectedCase);
            const currentColumnIndex = this.columns.indexOf(column);
            const arr = [];
            let previousColumnIndex = currentColumnIndex;
            let previousLine = line;
            let blocked = false;
            for (let i = 1; i < 8; i++) {
                if (!blocked) {
                    if (previousLine > 0 && previousColumnIndex > 0) {
                        const caseId = (this.columns[previousColumnIndex - 1]).concat(previousLine -1);
                        if (this.isCase(caseId)) {
                            arr.push(caseId);
                            if (!this.isCaseFree(caseId)) {
                                blocked = true;
                            }
                        }
                        previousLine--;
                        previousColumnIndex--;
                    }
                }
            }
            return arr;
        },

        getRightDownDiag: function (selectedCase) {
            const line = this.getLine(selectedCase);
            const column = this.getColumn(selectedCase);
            const currentColumnIndex = this.columns.indexOf(column);
            const arr = [];
            let previousColumnIndex = currentColumnIndex;
            let previousLine = line;
            let blocked = false;
            for (let i = 1; i < 8; i++) {
                if (!blocked) {
                    if (previousLine > 0 && previousColumnIndex < 7) {
                        const caseId = (this.columns[previousColumnIndex + 1]).concat(previousLine -1);
                        if (this.isCase(caseId)) {
                            arr.push(caseId);
                            if (!this.isCaseFree(caseId)) {
                                blocked = true;
                            }
                        }
                        previousLine--;
                        previousColumnIndex++;
                    }
                }
            }
            return arr;
        },

        getLeftUpDiag: function (selectedCase) {
            const line = this.getLine(selectedCase);
            const column = this.getColumn(selectedCase);
            const currentColumnIndex = this.columns.indexOf(column);
            const arr = [];
            let previousColumnIndex = currentColumnIndex;
            let previousLine = line;
            let blocked = false;
            for (let i = 1; i < 8; i++) {
                if (!blocked) {
                    if (previousLine <= 7 && previousColumnIndex > 0) {
                        const caseId = (this.columns[previousColumnIndex - 1]).concat(previousLine + 1);
                        if (this.isCase(caseId)) {
                            arr.push(caseId);
                            if (!this.isCaseFree(caseId)) {
                                blocked = true;
                            }
                        }
                        previousLine++;
                        previousColumnIndex--;
                    }
                }
            }
            return arr;
        },

        getRightUpDiag: function (selectedCase) {
            const line = this.getLine(selectedCase);
            const column = this.getColumn(selectedCase);
            const currentColumnIndex = this.columns.indexOf(column);
            const arr = [];
            let previousColumnIndex = currentColumnIndex;
            let previousLine = line;
            let blocked = false;
            for (let i = 1; i < 8; i++) {
                if (!blocked) {
                    if (previousLine <= 7 && previousColumnIndex < 7) {
                        const caseId = (this.columns[previousColumnIndex + 1]).concat(previousLine + 1);
                        if (this.isCase(caseId)) {
                            arr.push(caseId);
                            if (!this.isCaseFree(caseId)) {
                                blocked = true;
                            }
                        }
                        previousLine++;
                        previousColumnIndex++;
                    }
                }
            }
            return arr;
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