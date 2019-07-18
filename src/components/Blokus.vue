<template>
  <div class="blokus">
    <div style="height:400px">
      <div class="board" style="z-index:0;position:absolute">
        <template v-for="(row,y) in board.boardMatrix.valueOf()">
          <div v-for="(col,x) in row" :key="y*20+x" class="board_one" :class="colClass[col]">
            <!-- {{col}} -->
          </div>
          <div class="board_one -hidden">\n</div>
        </template>
      </div>
      <div class="board" style="z-index:1;position:absolute" v-if="selectedPiece">
        <template v-for="(row,y) in board.previewMatrix.valueOf()">
          <div v-for="(col,x) in row" :key="y*20+x" class="board_one" :class="colClass[col]" @mouseover="test(x,y)" @click="move()">
            <!-- {{col}} -->
          </div>
          <div class="board_one -hidden">\n</div>
        </template>
      </div>
      <table v-if="selectedPiece" style="position:absolute;left:450px">
        <tr v-for="(row,index) in selectedPiece.matrixData.valueOf()" :key="index" class="piece row">
          <td v-for="(col,index) in row" class="piece col" :class="colClass[col]">
            <!-- {{col}} -->
          </td>
        </tr>
      </table>
    </div>
    <hr>
    <button @click="rotate">旋转选中</button>
    <button @click="mirror">翻转选中</button>
    <div v-for="(player,index) in players" :key="index">
      <p>player{{index}}</p>
      <div style="display:flex;flex-wrap:wrap">
        <div v-for="(piece,index) in player.pieces" :key="index" style="margin:20px" @click="selectPiece(piece,index)">
          <table>
            <tr v-for="(row,index) in piece.matrixData.valueOf()" :key="index" class="piece row">
              <td v-for="(col,index) in row" class="piece col" :class="colClass[col]">
                <!-- {{col}} -->
              </td>
            </tr>
          </table>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
import math from 'mathjs/dist/math.js'

import blokus from '@/libs/blokus'

export default {
    name: 'Blokus',
    data() {
        return {
            // board: math.zeros(20, 20)
            board: new blokus.Board(),
            players: {},
            selectedPiece: null, //当前选中棋子
            colClass: ['', 'red', 'orange', 'blue', 'green'],
        }
    },
    mounted() {
        this.players = {
            1: new blokus.Player(1, this.board),
            2: new blokus.Player(2, this.board),
            3: new blokus.Player(3, this.board),
            4: new blokus.Player(4, this.board),
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
            this.selectedPiece = null;
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

.col {
    width: 16px;
    height: 16px;
    line-height: 16px;
}

.board {
  width: 20rem;
  height: 20rem;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  border: 1px solid currentColor;
  cursor: pointer;
}

.board_one {
  display: grid;
  place-content: center;
  border: 1px solid currentColor;
}
.board_one.-hidden {
  display: none;
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
