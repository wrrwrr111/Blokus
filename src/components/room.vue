<template>
  <div>
    <ul>
        <li v-for ="room,index in rooms" :key="index">
            {{room.roomId}}
            <button @click="joinByLastId(room.roomId)">加入</button>
        </li>
    </ul>
    {{rooms}}
    <!-- 创建房间 -->
    <!-- 房间列表 -->
  </div>
</template>
<script>
import * as Colyseus from 'colyseus.js'
export default {
    name: 'room',
    data() {
        return {
            rooms: [],
            roomKey: '',
            client: null,
            room: null,
        }
    },
    mounted() {
        console.log("mounted")
        this.client = new Colyseus.Client('ws://localhost:2567')
        console.log(this.client)
        this.leave()
        this.create()
        this.getAvailableRooms()
    },
    methods: {
        addListeners(room) {
            room.onJoin.add(function() {
                console.log(room.id);
                console.log('joined!');
            })
            room.onLeave.add(function() {
                console.log("LEFT ROOM", arguments);
            })
            room.onStateChange.add(function(data) {
                console.log("chat update: ", data)
            })
        },
        leave(){
            this.room && this.room.leave()
        },
        join() {
            this.room = this.clent.join('blokus-room')
            this.addListeners(this.room)
        },
        create() {
            this.room = this.client.join('blokus-room', { create: true })
            this.addListeners(this.room)
        },
        joinByLastId(roomId) {
            this.room = this.client.join(roomId)
            this.addListeners(this.room)
            this.getAvailableRooms()
        },
        getAvailableRooms() {
            this.client.getAvailableRooms('blokus-room', (rooms, err) =>{
                console.log(rooms)
                this.rooms = rooms
            })
        }
    }
}

</script>
