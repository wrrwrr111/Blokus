<template>
  <div class="hello">
    <div v-if="board" style="height:400px">
      <table style="z-index:0;position:absolute">
        <tr v-for="(row,y) in board.boardMatrix.valueOf()" :key="y" class="board row">
          <td v-for="(col,x) in row" :key="x" class="board col" :class="col?'red':''">
            {{col}}
          </td>
        </tr>
      </table>
      <table style="z-index:1;position:absolute" v-if="selectedPiece">
        <tr v-for="(row,y) in board.previewMatrix.valueOf()" :key="y" class="board row">
          <td v-for="(col,x) in row" :key="x" class="board col" :class="col?'red':''" @mouseover="test(x,y)" @click="move()">
            {{col}}
          </td>
        </tr>
      </table>
    </div>
    <hr>
    <button @click="rotate">旋转选中</button>
    <button @click="mirror">翻转选中</button>
    <div v-for="(player,index) in players" :key="index">
      <p>player{{index}}</p>
      <div v-if="selectedPiece">
        <table>
          <tr v-for="(row,index) in selectedPiece.matrixData.valueOf()" :key="index" class="piece row">
            <td v-for="(col,index) in row" class="piece col" :class="col?'red':''">
              {{col}}
            </td>
          </tr>
        </table>
      </div>
      <div style="display:flex;flex-wrap:wrap">
        <div v-for="(piece,index) in player.pieces" :key="index" style="margin:20px" @click="selectPiece(piece,index)">
          <table>
            <tr v-for="(row,index) in piece.matrixData.valueOf()" :key="index" class="piece row">
              <td v-for="(col,index) in row" class="piece col" :class="col?'red':''">
                {{col}}
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
      players: [],
      selectedPiece: null, //当前选中棋子
    }
  },
  mounted() {
    this.players.push(new blokus.Player(1,this.board))
  },
  methods: {
    test(row, col) {
      this.players[0].tryMove(row, col,this.selectedPiece,this.selectedIndex)
    },
    move(){
      this.players[0].move()
      this.selectedPiece = null;
    },
    selectPiece(piece,index) {
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

.red {
  background-color: red;
}

</style>
