<template>
  <div class="hello">
    <div v-if="board" style="height:400px">
      <table class="board" style="z-index:0;position:absolute">
        <tr v-for="(row,y) in board.boardMatrix.valueOf()" :key="y"  class="row">
          <td v-for="(col,x) in row" :key="x" class="col" :class="colClass[col]">
            <!-- {{col}} -->
          </td>
        </tr>
      </table>
      <table class="board" style="z-index:1;position:absolute" v-if="selectedPiece">
        <tr v-for="(row,y) in board.previewMatrix.valueOf()" :key="y" class="board row">
          <td v-for="(col,x) in row" :key="x" class="board col" :class="colClass[col]" @mouseover="test(x,y)" @click="move()">
            <!-- {{col}} -->
          </td>
        </tr>
      </table>
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
    name: 'HelloWorld',
    data() {
        return {
            // board: math.zeros(20, 20)
            board: new blokus.Board(),
            players: {},
            selectedPiece: null, //当前选中棋子
            colClass: ['', 'red', 'yellow', 'blue', 'green'],
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
 .col {
    width: 16px;
    height: 16px;
    line-height: 16px;
}
.board{
  border-collapse:collapse;
}
 .board .row{
  border: 1px solid black;
 }
 .board .col{
  border: 1px solid black;
 }

.red {
    background-color: red;
}

.yellow {
    background-color: yellow;
}

.blue {
    background-color: blue;
}

.green {
    background-color: green;
}

</style>
