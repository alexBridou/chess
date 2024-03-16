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
        }
    }
}