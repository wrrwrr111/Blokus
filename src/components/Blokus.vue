<template>
  <div class="blokus">
    <div class="square">
      <div class="info">
        <div class="cn">
          <p>游戏流程</p>
          <p>1、四位玩家各选择一种颜色的棋子，按照逆时针顺序轮流下棋。顺序为蓝、黄、红、绿，分别从左上、左下、右下、右上开局。</p>
          <p>2、每位玩家第一步下棋，都必须覆盖住棋盘角落的起始点。</p>
          <p>3、之后每一步新摆放的棋子，它的一个角必须与原有的同颜色的棋子的一个角接上。注意只能角对角，不能有边与边的接触。和其他颜色的棋子则没有限制。</p>
          <p>4、一旦某玩家无法将自己的棋子按照规则放在棋盘上，则当轮该玩家宣布弃权，由下一个玩家继续。</p>
          <p>当所有玩家都无法下棋时，则该局游戏结束。</p>
        </div>
        <div class="en">
          <p>How to Play:</p>
          <p>1. Each player chooses a color and places that set of 21 pieces in front of his/her side of the board. The order of play is as follows: blue, yellow, red, and then green.</p>
          <p>2. The first player (blue) places any of his/her pieces in a corner square. Play proceeds clockwise around the board (yellow, red, and green), each player putting their first piece down in one of the corner squares.</p>
          <p>3. Play continues as each player lays down one piece during a turn.
            Each new piece must touch at least one other piece of the same color, but only at the corners.
            No flat edges of same color pieces can touch.
            There are no restrictions on how pieces of different colors can touch one another.</p>
          <p>4. Whenever a player is unable to place one of his/her remaining pieces on the board, that player must pass his/her turn.</p>
          <p>End of Game:
            The game ends when all players are blocked from laying down any more of their pieces. This also includes any players who may have placed all of their pieces on the board. Scores are tallied, and the player with the highest score is the winner.</p>
          <p>Scoring:
            Each player counts the number of unit squares in his/her remaining pieces (1 unit square = -1 point).
            A player earns +15 points if all his/her pieces have been placed on the board plus 5 additional bonus points if the last piece placed on the board was the smallest piece (one square).</p>
        </div>
      </div>
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
          <div v-for="(col,x) in row" :key="y*20+x" class="cel" :class="colClass[col]" @mouseover="testMsg(selectedPiece.userId,x,y)" @click="moveMsg(selectedPiece.userId)">
            <!-- {{col}} -->
          </div>
          <div class="cel -hidden" :key="y+'n'">\n</div>
        </template>
      </div>
      <div v-for="(player,index) in players" class="player" :class="'player'+index" :key="index">
        <div v-for="(piece,index) in player.pieces" class="piece" :key="index" @click="selectPieceMsg(player.userId,index)">
          <template v-for="(row,y) in piece.matrixData.valueOf()">
            <div v-for="(col,x) in row" class="cel" :class="colClass[col]" :key="y*5+x">
              <!-- {{col}} -->
            </div>
            <div class="cel -hidden" :key="y+'n'">\n</div>
          </template>
        </div>
      </div>
      <div class="choose">
        <div style="grid-area:cin">
          <p>当前选中 choosed</p>
        </div>
        <div v-if="selectedPiece" class="piece" style="grid-area:cp">
          <template v-for="(row,y) in selectedPiece.matrixData.valueOf()">
            <div v-for="(col,x) in row" class="cel" :class="colClass[col]" :key="y*5+x">
              <!-- {{col}} -->
            </div>
            <div class="cel -hidden" :key="y+'n'">\n</div>
          </template>
        </div>
        <button @click="rotateMsg(selectedPiece.userId)" style="grid-area:btn1">旋转 rotate</button>
        <button @click="mirrorMsg(selectedPiece.userId)" style="grid-area:btn2">翻转 mirror</button>
      </div>
      <div class="scoreboard">
        <p>记分板 scoreboard</p>
        <p v-for="(player,index) in players" class="player" :key="index" :class="colClass[index]">
          {{"player"+player.userId +": " + player.score}}
        </p>
        <p v-if="text">提示:{{text}}</p>
      </div>
      <div class="room">
        <template v-if="room">
          <p>当前房间号: {{room.id}}</p>
          <!-- <p>房间情况: {{room.clients}}/{{room.maxClients}}</p> -->
          <button @click="leaveRoom">退出房间</button>
        </template>
        <template v-else>
          <button @click="getAvailableRooms">刷新房间列表</button>
          <button @click="createRoom">创建房间</button>
          <ul>
            <li v-for="(room,index) in rooms" :key="index">
              {{room.roomId+' '+room.clients+'/'+room.maxClients}}
              <button @click="joinByLastId(room.roomId)">加入</button>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import blokus from '@/libs/blokus'
import * as Colyseus from 'colyseus.js'
export default {
    name: 'Blokus',
    data() {
        return {
            // board: math.zeros(20, 20)
            board: new blokus.Board(),
            players: {},
            selectedPiece: null, // 当前选中棋子
            colClass: ['', 'blue', 'yellow', 'red', 'green'],
            curId: 1,
            myId: 1,
            text: '',
            rooms: [],
            room: null,
            client: null
        }
    },
    mounted() {
        // this.players = {
        //     1: new blokus.Player(1, this.board),
        //     2: new blokus.Player(2, this.board),
        //     3: new blokus.Player(3, this.board),
        //     4: new blokus.Player(4, this.board)
        // }
        this.initClient()
        this.getAvailableRooms()
    },
    methods: {
        // room
        initClient() {
            this.client = new Colyseus.Client('ws://140.143.2.208:2567')
            console.log('client', this.client)
        },
        leaveRoom() {
            this.room.leave()
            this.room = null
            this.getAvailableRooms()
        },
        createRoom() {
            this.room = this.client.join('blokus-room', { create: true })
            this.addListeners(this.room)
        },
        getAvailableRooms() {
            this.client.getAvailableRooms('blokus-room', (rooms, err) => {
                console.log("rooms[0]", rooms && rooms[0])
                this.rooms = rooms
            })
        },
        joinByLastId(roomId) {
            this.room = this.client.join(roomId)
            console.log("joinByLastId", roomId, this.room, this.client)
            this.addListeners(this.room)
            // this.getAvailableRooms()
        },
        //  添加事件监听
        addListeners() {
            let that = this
            this.room.onJoin.add(function() {
                console.log("joined");
            });

            this.room.onStateChange.add((state) => {
                console.log("initial room state:", state, state.players);
                that.initBoard()
                that.initPlayers(state.players)
            });

            // 监听消息
            this.room.onMessage.add((data) => {
                if (data.type === 'selectPiece') {
                    that.selectPiece(data.userId, data.pieceIndex)
                }
                if (data.type === 'test') {
                    that.test(data.userId,data.row, data.col)
                }
                if (data.type === 'move') {
                    that.move(data.userId)
                }
                if (data.type === 'rotate') {
                    that.rotate(data.userId)
                }
                if (data.type === 'mirror') {
                    that.mirror(data.userId)
                }
            });
        },
        //初始化棋盘
        initBoard() {
            this.board = new blokus.Board()
        },
        //初始化玩家
        initPlayers(players) {
            console.log(players)
            for (let sessionId in players) {
                let player = players[sessionId]
                let index = player.index
                console.log("player", player)
                this.players[index] = new blokus.Player(index, this.board)
                if(this.room.sessionId === sessionId){
                    this.myId = index
                    console.log("myId!!!",this.myId)
                }
            }
        },
        //  发送选中消息
        selectPieceMsg(userId, pieceIndex) {
            if (userId !== this.curId) {
                this.text = '没轮到你'
                return
            }
            if (userId !== this.myId) {
                this.text = '不是你的'
                return
            }
            this.text = ''
            this.room.send({
                type: 'selectPiece',
                userId,
                pieceIndex
            })
        },
        selectPiece(userId, pieceIndex) {
            this.selectedPiece = this.players[userId].pieces[pieceIndex]
            this.selectedIndex = pieceIndex
            this.board.initTry()
        },
        testMsg(userId, row, col) {
            if (userId === this.myId) {
                this.room.send({
                    type: 'test',
                    userId,
                    row,
                    col
                })
            }
        },
        test(userId, row, col) {
            console.log(userId,row, col, this.selectedPiece, this.selectedIndex)
            this.players[userId].tryMove(row, col, this.selectedPiece, this.selectedIndex)
        },
        moveMsg(userId){
            if (userId === this.myId) {
                this.room.send({
                    type: 'move',
                    userId
                })
            }
        },
        move(userId) {
            let flag = this.players[userId].move()
            if (flag) {
                this.selectedPiece = null
                this.curId = this.board.playerIds[this.board.step % this.board.playerIds.length]
            }
        },
        rotateMsg(userId){
            if (userId === this.myId) {
                this.room.send({
                    type: 'rotate',
                    userId
                })
            }
        },
        rotate() {
            this.selectedPiece && this.selectedPiece.rotate()
        },
        mirrorMsg(userId){
            if (userId === this.myId) {
                this.room.send({
                    type: 'mirror',
                    userId
                })
            }
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
    /*background-color: #222222;*/
}

p {
    margin-top: 1vmin;
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

.room {
    grid-area: g1;
}

.info {
    grid-area: g7;
    text-align: left;
    height: 100%;
    overflow: auto;
}

.board {
    grid-area: g5;
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(20, 1fr);
    border: 0.1vmin solid currentColor;
}

.choose {
    grid-area: g3;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 1vmin;
    grid-template-areas:
        "cin cin cin cin"
        ". cp cp ."
        ". cp cp ."
        "btn1 btn1 btn2 btn2";
}

.scoreboard {
    grid-area: g9;
}

.player {
    display: grid;
    grid-gap: 0.5vmin;
}

.player1 {
    grid-area: g2;
    grid-template-columns: repeat(7, 7vmin);
    grid-template-rows: repeat(3, 7vmin);
}

.player2 {
    grid-area: g4;
    grid-template-columns: repeat(3, 7vmin);
    grid-template-rows: repeat(7, 7vmin);
}

.player3 {
    grid-area: g8;
    grid-template-columns: repeat(7, 7vmin);
    grid-template-rows: repeat(3, 7vmin);
}

.player4 {
    grid-area: g6;
    grid-template-columns: repeat(3, 7vmin);
    grid-template-rows: repeat(7, 7vmin);
}

.piece {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    border: 0.1vmin solid currentColor;
}

.cel {
    place-content: center;
    border: 0.1vmin solid currentColor;
    /*background-color: #aaaaaa;*/
}

.cel.-hidden {
    display: none;
}

.red {
    background-color: #FF0000;
}

.yellow {
    background-color: #FFaa00;
}

.blue {
    background-color: #009999;
}

.green {
    background-color: #00cc00;
}

</style>
