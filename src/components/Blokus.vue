<template>
  <div class="blokus">
    <div class="square">
      <div class="board" style="">
        <template v-for="(row,y) in board.boardMatrix.valueOf()">
          <div v-for="(col,x) in row" :key="y*20+x" class="cel" :class="colClass[col]">
            <!-- {{col}} -->
          </div>
          <div class="cel -hidden" :key="y+'n'">\n</div>
        </template>
      </div>
      <div class="board" style="" v-if="selectedPiece">
        <template v-for="(row,y) in board.previewMatrix.valueOf()">
          <div v-for="(col,x) in row" :key="y*20+x" class="cel" :class="colClass[col]" @mouseover="test(x,y)" @click="move()">
            <!-- {{col}} -->
          </div>
          <div class="cel -hidden" :key="y+'n'">\n</div>
        </template>
      </div>
      <div v-for="(player,index) in players" class="player" :class="'player'+index" :key="index">
        <div v-for="(piece,index) in player.pieces" class="piece" :key="index" @click="selectPiece(piece,index)">
          <template v-for="(row,y) in piece.matrixData.valueOf()">
            <div v-for="(col,x) in row" class="cel" :class="colClass[col]" :key="y*5+x">
              <!-- {{col}} -->
            </div>
            <div class="cel -hidden" :key="y+'n'">\n</div>
          </template>
        </div>
      </div>
      <div v-if="selectedPiece" class="piece" style="grid-area:g1">
        <template v-for="(row,y) in selectedPiece.matrixData.valueOf()">
          <div v-for="(col,x) in row" class="cel" :class="colClass[col]" :key="y*5+x">
            <!-- {{col}} -->
          </div>
          <div class="cel -hidden" :key="y+'n'">\n</div>
        </template>
      </div>
      <div style="grid-area:g3">
        <button @click="rotate">旋转选中</button>
        <button @click="mirror">翻转选中</button>
      </div>
    </div>
  </div>
</template>
<script>
// import math from 'mathjs/dist/math.js'

import blokus from '@/libs/blokus'

export default {
    name: 'Blokus',
    data() {
        return {
            // board: math.zeros(20, 20)
            board: new blokus.Board(),
            players: {},
            selectedPiece: null, // 当前选中棋子
            colClass: ['', 'red', 'orange', 'blue', 'green']
        }
    },
    mounted() {
        this.players = {
            1: new blokus.Player(1, this.board),
            2: new blokus.Player(2, this.board),
            3: new blokus.Player(3, this.board),
            4: new blokus.Player(4, this.board)
        }
    },
    methods: {
        test(row, col) {
            let userId = this.selectedPiece.userId
            console.log(userId)
            this.players[userId].tryMove(row, col, this.selectedPiece, this.selectedIndex)
        },
        move() {
            let userId = this.selectedPiece.userId
            this.players[userId].move()
            this.selectedPiece = null
        },
        selectPiece(piece, index) {
            this.selectedPiece = piece
            this.selectedIndex = index
            this.board.initTry()
            console.log(this.selectedPiece)
        },
        rotate() {
            this.selectedPiece && this.selectedPiece.rotate()
        },
        mirror() {
            this.selectedPiece && this.selectedPiece.mirror()
        }
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    height: 100vh;
    display: grid;
    /*place-content:center;*/
    background-color: #222222;
}

.square {
    background-color: white;
    display: grid;
    grid-template-columns: 22vmin 52vmin 22vmin;
    grid-template-rows: 22vmin 52vmin 22vmin;
    grid-gap: 1vmin;
    grid-template-areas:
        "g1 g2  g3"
        "g4 g5  g6"
        "g7 g8  g9"
}

.col {
    width: 16px;
    height: 16px;
    line-height: 16px;
}

.board {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(20, 1fr);
    border: 1px solid currentColor;
    grid-area: g5;
}

.cel {
    display: grid;
    place-content: center;
    border: 1px solid currentColor;
}

.cel.-hidden {
    display: none;
}

.player {
    display: grid;
    grid-gap: 0.5vmin;
}

.player1 {
    grid-template-columns: repeat(7, 7vmin);
    grid-template-rows: repeat(3, 7vmin);
    grid-area: g2;
}

.player2 {
    grid-template-columns: repeat(3, 7vmin);
    grid-template-rows: repeat(7, 7vmin);
    grid-area: g4;
}

.player3 {
    grid-template-columns: repeat(7, 7vmin);
    grid-template-rows: repeat(3, 7vmin);
    grid-area: g8;
}

.player4 {
    grid-template-columns: repeat(3, 7vmin);
    grid-template-rows: repeat(7, 7vmin);
    grid-area: g6;
}

.piece {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    border: 1px solid currentColor;
}

.red {
    background-color: #FF0000;
}

.orange {
    background-color: #FF7400;
}

.blue {
    background-color: #009999;
}

.green {
    background-color: #00cc00;
}

</style>
