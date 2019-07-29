/*
 * @Author: Baze
 * @Date:   2019-07-04 11:48:15
 * @Last Modified by:   Baze
 * @Last Modified time: 2019-07-29 19:03:40
 */

import math from 'mathjs/dist/math.js'
class Board {
    constructor() {
        this.boardMatrix = math.zeros(20, 20)
        this.previewMatrix = math.zeros(20, 20)
        this.tryX = 0
        this.tryY = 0
        this.tryPiece = null
        this.step = 0
        this.startPoints = [
            new Point(0, 0),
            new Point(0, 19),
            new Point(19, 19),
            new Point(19, 0)
        ]
        this.maxPlayerNum = 4
        this.players = {}
        this.playerIds = []
    }
    addPlayer(userId, player) {
        //  todo 判断玩家个数
        this.players[userId] = player
        this.playerIds.push(userId)
    }
    initTry() {
        this.tryX = 0
        this.tryY = 0
        this.tryPiece = null
    }
    tryMove(row, col, piece, userId) {
        console.log(row, col, piece, userId)
        let matrix = math.zeros(20, 20)
        let translation = new Point(row - 2, col - 2)
        let points = piece.translate(translation)
        for (let point of points) {
            if (point.x <= 19 && point.x >= 0 && point.y <= 19 && point.y >= 0) {
                matrix.set([point.y, point.x], userId)
            } else {
                return
            }
        }
        this.tryX = row - 2
        this.tryY = col - 2
        this.tryPiece = piece
        this.previewMatrix = matrix
    }
    move(userId, firstFlag) {
        console.log('now player', this.players[userId])
        if (this.tryPiece) {
            let translation = new Point(this.tryX, this.tryY)
            let points = this.tryPiece.translate(translation)

            //  验证合法性
            let flag = true
            if (firstFlag) {
                //  第一个必须从角落开始
                let startPoint = this.startPoints[this.playerIds.indexOf(userId)]
                console.log('first piece,start point:', startPoint)
                flag = startPoint.isIn(points)
            } else {
                //  后续的必须和之前
                //  角对角 不能边对边 不能和之前的重合
                let corFlag = false // corner to corner
                let sideFlag = true // side to side
                let blankFlag = true // must in blank
                for (let point of points) {
                    // 九个判断
                    // 空白
                    if (this.boardMatrix.get([point.y, point.x]) !== 0) {
                        blankFlag = false
                        break
                    }
                    //  边不靠
                    if (point.y + 1 <= 19 && this.boardMatrix.get([point.y + 1, point.x]) === userId) {
                        sideFlag = false
                        break
                    }
                    if (point.y - 1 >= 0 && this.boardMatrix.get([point.y - 1, point.x]) === userId) {
                        sideFlag = false
                        break
                    }
                    if (point.x + 1 <= 19 && this.boardMatrix.get([point.y, point.x + 1]) === userId) {
                        sideFlag = false
                        break
                    }
                    if (point.x - 1 >= 0 && this.boardMatrix.get([point.y, point.x - 1]) === userId) {
                        sideFlag = false
                        break
                    }
                    //  角对角
                    if (point.y + 1 <= 19 &&
                        point.x + 1 <= 19 &&
                        this.boardMatrix.get([point.y + 1, point.x + 1]) === userId) {
                        corFlag = true
                    }
                    if (point.y + 1 <= 19 &&
                        point.x - 1 >= 0 &&
                        this.boardMatrix.get([point.y + 1, point.x - 1]) === userId) {
                        corFlag = true
                    }
                    if (point.y - 1 >= 0 &&
                        point.x + 1 <= 19 &&
                        this.boardMatrix.get([point.y - 1, point.x + 1]) === userId) {
                        corFlag = true
                    }
                    if (point.y - 1 >= 0 &&
                        point.x - 1 >= 0 &&
                        this.boardMatrix.get([point.y - 1, point.x - 1]) === userId) {
                        corFlag = true
                    }
                }
                console.log(corFlag, sideFlag, blankFlag)
                flag = corFlag && sideFlag && blankFlag
            }
            if (flag) {
                for (let point of points) {
                    this.boardMatrix.set([point.y, point.x], userId)
                }
                this.initTry()
                this.step += 1
                return points.length
            } else {
                return 0
            }
        }
    }
}

// 棋子
class Piece {
    constructor(pieceData, userId) {
        this.userId = userId
        this.matrixData = math.multiply(math.matrix(pieceData), userId)
        this.pieceData = pieceData
        this.pointsData = pieceData.reduce(
            (array, row, y) => {
                let colArray = row.reduce((array, col, x) => {
                    if (col === 1) {
                        array.push(new Point(x, y))
                    }
                    return array
                }, [])
                return array.concat(colArray)
            }, [])
        this.translation = new Point(0, 0) //  平移量
        this.scale = 1 //  缩放 暂时不用
    }
    translate(translation) {
        return this.pointsData.map(point => {
            let x0 = point.x
            let y0 = point.y
            let [
                [x1],
                [y1],
                [z1] // eslint-disable-line no-unused-vars
            ] = math.multiply(
                [
                    [1, 0, translation.x],
                    [0, 1, translation.y],
                    [0, 0, 1]
                ], [
                    [x0],
                    [y0],
                    [1]
                ])
            return new Point(x1, y1)
        })
    }
    setTranslation(x, y) {
        this.translation = new Point(x, y)
    }
    rotate() {
        let rotation = math.pi / 2
        let matrixSize = this.matrixData.size()
        let matrix = math.zeros(matrixSize[0], matrixSize[1])
        let C = math.cos(rotation).toFixed()
        let S = math.sin(rotation).toFixed()
        let points = this.pointsData.map(point => {
            console.log(point)

            //  然后旋转
            let [
                [x1],
                [y1],
                [z1] // eslint-disable-line no-unused-vars
            ] = math.multiply([
                [C, -S, (1 - C) * 2 + S * 2],
                [S, C, (1 - C) * 2 - S * 2],
                [0, 0, 1]
            ], [
                [point.x],
                [point.y],
                [1]
            ])
            matrix.set([y1, x1], this.userId)
            return new Point(x1, y1)
        })
        this.pointsData = points
        this.matrixData = matrix
    }
    mirror() {
        let matrixSize = this.matrixData.size()
        let matrix = math.zeros(matrixSize[0], matrixSize[1])
        let points = []
        this.pointsData.forEach(point => {
            //  然后旋转
            let x1 = matrixSize[0] - 1 - point.x
            let y1 = point.y
            matrix.set([y1, x1], this.userId)
            points.push(new Point(x1, y1))
        })
        this.pointsData = points
        this.matrixData = matrix
    }
}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    isIn(points) {
        for (let point of points) {
            if (this.isEq(point)) {
                return true
            }
        }
        return false
    }
    isEq(point) {
        return this.x === point.x && this.y === point.y
    }
}

class Player {
    constructor(userId, board) {
        this.userId = userId
        this.board = board
        this.score = 0
        this.initPieces(userId)
        this.board.addPlayer(userId, this)
    }
    initPieces(userId) {
        this.firstFlag = true // 是否落子
        this.pieces = []
        pieceDatas.forEach(pieceData => {
            this.pieces.push(new Piece(pieceData, userId))
        })
    }
    tryMove(row, col, selectedPiece, selectedIndex) {
        this.tryIndex = selectedIndex
        this.board.tryMove(row, col, selectedPiece, this.userId)
    }
    move() {
        console.log('move userId', this.userId, this.tryIndex)
        let score = this.board.move(this.userId, this.firstFlag)
        console.log('player move flag', score)
        if (score) {
            this.firstFlag = false
            this.pieces.splice(this.tryIndex, 1)

            //  加分
            this.score += score
            if (this.pieces.length === 0 && score === 1) {
                this.score += 20
            } else if (this.pieces.length === 0) {
                this.score += 15
            }
            return true
        } else {
            return false
        }
    }
}

export default {
    Board,
    Player
}
const pieceDatas = [
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ]

]
