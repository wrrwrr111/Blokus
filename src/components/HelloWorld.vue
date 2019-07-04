<template>
  <div class="hello">
    <div v-for="item,key in board.valueOf()"> {{item}}</div>
    <hr>
    <div v-for="player,key in players">
      <p>player{{key+1}}</p>
      <div style="display:flex;flex-wrap:wrap">
        <div v-for="piece,key in player.pieces">
          <div v-for="item,key in piece.pieceMatrix.valueOf()"> {{item}}</div>
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
      board: math.zeros(20, 20),
      players: []
    }
  },
  mounted() {
    for (let id = 1; id <= 4; id++) {
      this.players.push(new blokus.Player(id))
    }
    console.log(this.player)

  },
  methods: {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
