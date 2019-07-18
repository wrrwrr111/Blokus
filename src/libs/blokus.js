/*
 * @Author: Baze
 * @Date:   2019-07-04 11:48:15
 * @Last Modified by:   Baze
 * @Last Modified time: 2019-07-18 09:52:27
 */

import math from 'mathjs/dist/math.js'
class Board {
  constructor() {
    this.boardMatrix = math.zeros(20, 20)
    this.previewMatrix = math.zeros(20, 20)
    this.tryX = 0
    this.tryY = 0
    this.tryPiece = null
  }
  initTry() {
    this.tryX = 0
    this.tryY = 0
    this.tryPiece = null
  }
  tryMove(row, col, piece,userId) {
    console.log(row,col,piece,userId)
    let matrix = math.zeros(20, 20)
    let translation = new Point(row - 2, col - 2)
    let points = piece.translate(translation)
    console.log(points)
    for (let point of points) {
      if (point.x < 20 && point.x >= 0 && point.y < 20 && point.y >= 0) {
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
  move(userId) {
    if (this.tryPiece) {
      let translation = new Point(this.tryX, this.tryY)
      let points = this.tryPiece.translate(translation)

      //todo 验证合法性
      for (let point of points) {
          this.boardMatrix.set([point.y, point.x], userId)
      }
      this.initTry()
      return true
    }
  }
}

// 棋子
class Piece {
  constructor(pieceData, userId) {
    this.userId = userId
    this.matrixData = math.multiply(math.matrix(pieceData),userId)
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
      console.log(point)
      let x0 = point.x
      let y0 = point.y
      let [
        [x1],
        [y1],
        [z1]
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
    let rotation = math.pi / 2;
    let matrixSize = this.matrixData.size()
    let matrix = math.zeros(matrixSize[0], matrixSize[1])
    let C = math.cos(rotation).toFixed()
    let S = math.sin(rotation).toFixed()
    let points = this.pointsData.map(point => {
      console.log(point)
      //然后旋转
      let [
        [x1],
        [y1],
        [z1]
      ] = math.multiply([
        [C, -S, (1 - C) * 2 + S * 2],
        [S, C, (1 - C) * 2 - S * 2],
        [0, 0, 1]
      ], [
        [point.x],
        [point.y],
        [1]
      ])
      console.log(x1,y1,this.userId)
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
      //然后旋转
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
}

class Player {
  constructor(userId,board) {
    this.userId = userId
    this.board = board
    this.initPieces(userId)
  }
  initPieces(userId) {
    this.pieces = []
    pieceDatas.forEach(pieceData => {
      this.pieces.push(new Piece(pieceData, userId))
    })
  }
  tryMove(row, col,selectedPiece,selectedIndex){
    this.tryIndex = selectedIndex
    this.board.tryMove(row, col,selectedPiece,this.userId)
  }
  move(){
    console.log("move",this.userId,this.tryIndex)
    let flag = this.board.move(this.userId)
    if(flag)
      this.pieces.splice(this.tryIndex,1)
  }
}

export default { Board, Player }
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
