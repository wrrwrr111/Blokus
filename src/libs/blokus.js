/*
 * @Author: Baze
 * @Date:   2019-07-04 11:48:15
 * @Last Modified by:   Baze
 * @Last Modified time: 2019-07-04 21:25:27
 */

import math from 'mathjs/dist/math.js'
class Board {
  constructor() {
    this.boardMatrix = math.zeros(20, 20)
  }
}

// 棋子
class Piece {
  constructor(pieceData,id) {
    this.pieceMatrix = math.multiply(math.matrix(pieceData),id)
  }
}

class Player {
  constructor(id) {
    this.id = id
    this.initPieces(id)
  }
  initPieces(id) {
    this.pieces = []
    pieceDatas.forEach(pieceData => {
      this.pieces.push(new Piece(pieceData,id))
    })
  }
}

export default { Player }
const pieceDatas = [
  [
    [1]
  ],
  [
    [1, 1]
  ],
  [
    [1, 1, 1]
  ],
  [
    [1, 0],
    [1, 1]
  ],
  [
    [1, 1, 1, 1]
  ],
  [
    [1, 0, 0],
    [1, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1, 1, 1, 1, 1]
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 1, 1]
  ],
  [
    [0, 1, 0, 0],
    [1, 1, 1, 1]
  ],
  [
    [0, 1, 1, 1],
    [1, 1, 0, 0]
  ],
  [
    [1, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 1, 1],
    [1, 0, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [1, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
  ]

]
