import pieces from "../pieces"
export default {
    mixins: [pieces],
    data() {
        return {isMock: false, mockBoard: null}
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

        isCase: function (caseId) {
            return this.board.find(c => c.id === caseId);
        },

        isCaseFree: function (caseId) {
            const board = this.isMock ? this.mockBoard : this.board;
            const boardCase = board.find(c => c.id === caseId);
            if (boardCase && !boardCase.activePiece) {
                return true;
            }
            return false;
        },

        getPieceOnCase: function (caseId) {
            const board = this.isMock ? this.mockBoard : this.board;
            const boardCase = board.find(c => c.id === caseId);
            return boardCase.activePiece;
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

        isOpponentPiece: function (color, caseId) {
            const board = this.isMock ? this.mockBoard : this.board;
            const piece = board.find(c => c.id === caseId).activePiece;
            return color !== piece.color;
        },

        getCasesWithoutCheck: function (selectedCase, caseList) {
            const arr = [];
            this.isMock = true;
            caseList.forEach(c => {
                const board = this.simulateMove(selectedCase, c);
                this.mockBoard = board;
                const attackedCases = this.getAttackedCases({
                    board
                });
                if (!attackedCases.includes(c)) {
                    arr.push(c);
                }
                this.mockBoard = null;
            });
            this.isMock = false;
            this.mockBoard = null;
            return arr;
            // const attackedCases = this.getAttackedCases();
            // return caseList.filter(c => !attackedCases.includes(c));
        },

        simulateMove: function (selectedCase, newCase) {
            // let testBoard = Object.assign([...this.board]);
            // const testBoard = [];
            // for (let i = 0; i < this.board.length; i++) {
            //     testBoard.push(Object.assign( this.board[i]))
            // }
            // const testBoard = [...this.board]
            const testBoard = JSON.parse(JSON.stringify(this.board));
            const rmCase = testBoard.find(c => c.id === selectedCase.id);
            const piece = rmCase.activePiece;
            rmCase.activePiece = null;
            const ncCase = testBoard.find(c => c.id === newCase);
            ncCase.activePiece = piece;
            return testBoard;

        },

        getAttackedCases: function (options = {}) {
            const activeCases = this.getActiveCases(options);
            const arr = [];
            activeCases.forEach(c => {
                const captures = this.getPieceCaptures(c, options);
                if (captures.length) {
                    arr.push(captures);
                }
            })
            return Array.from(new Set(arr.flat()));
        },

        isKingChecked: function (caseList) {
            let checked = false;
            caseList.forEach(c => {
                const piece = this.getPieceOnCase(c);
                if (piece.type === "king") {
                    checked = true;
                }
            });
            return checked;
        },

        getCheckedKings: function (caseList) {
            const arr = [];
            caseList.forEach(c => {
                const piece = this.getPieceOnCase(c);
                if (piece.type === "king") {
                    arr.push(piece);
                }
            });
            return arr;
        },

        getActiveCases: function (options = {}) {
            const board = options.board || this.board;
            return board.filter(c => {
                return !this.isCaseFree(c.id)
            });
        },

        getColumn: function (caseItem) {
            return caseItem.id.split('')[0];
        },

        getCompleteColumn: function (column) {
            return this.board.filter(caseItem => this.getColumn(caseItem) === column);
        },

        getLine: function (caseItem) {
            return parseInt(caseItem.id.split('')[1]);
        },

        getCompleteLine: function (line) {
            return this.board.filter(caseItem => this.getLine(caseItem) === line);
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
                        const caseId = (this.columns[previousColumnIndex - 1]).concat(previousLine - 1);
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
                        const caseId = (this.columns[previousColumnIndex + 1]).concat(previousLine - 1);
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
        }
    }
}