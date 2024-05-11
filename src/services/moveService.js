export default {
    mixins: [],
    data() {
        return {}
    },
    methods: {

        ///////////////////// BISHOP /////////////////////

        getBishopMoving: function (selectedCase) {
            const diagonals = this.getDiagonals(selectedCase);
            const possibleCaptures = this._getBishopCapture(selectedCase, diagonals);
            const legalMoves = this.cleanBishopMoves(diagonals, possibleCaptures);
            return legalMoves;
        },

        cleanBishopMoves: function (diagonals, possibleCaptures) {
            const legalMoves = diagonals.map(c => {
                if (!possibleCaptures.find(p => p === c)) {
                    if (this.isCaseFree(c)) {
                        return c;
                    }
                }
                return;
            })
            return legalMoves.filter(v => v);
        },

        getBishopCapture: function (selectedCase) {
            const diagonals = this.getDiagonals(selectedCase);
            return this._getBishopCapture(selectedCase, diagonals);
        },

        _getBishopCapture: function (selectedCase, legalCases) {
            const arr = [];
            for (let i = 0; i < legalCases.length; i++) {
                if (!this.isCaseFree(legalCases[i]) && this.isOpponentPiece(selectedCase.activePiece.color, legalCases[i])) {
                    arr.push(legalCases[i]);
                }
            }
            return arr;
        },


        ///////////////////// KNIGHT /////////////////////
        getKnightMoving: function (selectedCase) {
            const possibleCases = this.getKnightPossibleCases(selectedCase);
            return possibleCases;
        },

        getKnightCapture: function (selectedCase, possibleCases) {
            const arr = [];
            for (let i = 0; i < possibleCases.length; i++) {
                if (!this.isCaseFree(possibleCases[i]) && this.isOpponentPiece(selectedCase.activePiece.color, possibleCases[i])) {
                    arr.push(possibleCases[i]);
                }
            }
            return arr;
        },

        filterKnightCases: function (availableCases, possibleTakes) {
            if (!possibleTakes.length) {
                return availableCases;
            }
            for (let i = 0; i < availableCases.length; i++) {
                if (possibleTakes.find(item => item === availableCases[i])) {
                    availableCases.splice(i, 1);
                }
            }
            return availableCases;
        },


        getKnightPossibleCases: function (selectedCase) {
            const isWhite = selectedCase.activePiece.color === "W";
            const column = this.getColumn(selectedCase);
            const line = this.getLine(selectedCase);
            const currentColumnIndex = this.columns.indexOf(column);
            const previousColumn = this.columns[isWhite ? currentColumnIndex - 1 : currentColumnIndex + 1] || "";
            const nextColumn = this.columns[isWhite ? currentColumnIndex + 1 : currentColumnIndex - 1] || "";
            const previousTwoColumns = this.columns[isWhite ? currentColumnIndex - 2 : currentColumnIndex + 2] || "";
            const nextTwoColumns = this.columns[isWhite ? currentColumnIndex + 2 : currentColumnIndex - 2] || "";
            const fwdOneLine = isWhite ? line + 1 : line - 1;
            const fwdTwoLines = isWhite ? line + 2 : line - 2;
            const backOneLine = isWhite ? line - 1 : line + 1;
            const backTwoLines = isWhite ? line - 2 : line + 2;

            const oneColumnMoves = [previousColumn, nextColumn].map(c => {
                let arr = [];
                const caseOne = c.concat(fwdTwoLines.toString())
                if (this.isCase(caseOne)) {
                    if (this.isCaseFree(caseOne) || this.isOpponentPiece(selectedCase.activePiece.color, caseOne)) {
                        arr.push(caseOne);
                    }
                }
                const caseTwo = c.concat(backTwoLines.toString())
                if (this.isCase(caseTwo)) {
                    if (this.isCaseFree(caseTwo) || this.isOpponentPiece(selectedCase.activePiece.color, caseTwo)) {
                        arr.push(caseTwo);
                    }
                }
                return arr;
            }).flat();

            const twoColumnsMoves = [previousTwoColumns, nextTwoColumns].map(c => {
                let arr = [];
                const caseOne = c.concat(fwdOneLine.toString());
                if (this.isCase(caseOne)) {
                    if (this.isCaseFree(caseOne) || this.isOpponentPiece(selectedCase.activePiece.color, caseOne)) {
                        arr.push(caseOne);
                    }
                }
                const caseTwo = c.concat(backOneLine.toString());
                if (this.isCase(caseTwo)) {
                    if (this.isCaseFree(caseTwo) || this.isOpponentPiece(selectedCase.activePiece.color, caseTwo)) {
                        arr.push(caseTwo);
                    }
                }
                return arr;
            }).flat();
            return oneColumnMoves.concat(twoColumnsMoves);

        },

        ///////////////////// PAWN /////////////////////
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
            const previousColumn = this.columns[isWhite ? currentColumnIndex - 1 : currentColumnIndex + 1] || "";
            const nextColumn = this.columns[isWhite ? currentColumnIndex + 1 : currentColumnIndex - 1] || "";
            const leftCase = previousColumn.concat(isWhite ? line + 1 : line - 1);
            const rightCase = nextColumn.concat(isWhite ? line + 1 : line - 1);
            if (this.isCase(leftCase)) {
                if (!this.isCaseFree(leftCase) && this.isOpponentPiece(selectedCase.activePiece.color, leftCase)) {
                    possibleCases.push(leftCase);
                }
            }
            if (this.isCase(rightCase)) {
                if (!this.isCaseFree(rightCase) && this.isOpponentPiece(selectedCase.activePiece.color, rightCase)) {
                    possibleCases.push(rightCase);
                }
            }
            return possibleCases;
        }
    }
}