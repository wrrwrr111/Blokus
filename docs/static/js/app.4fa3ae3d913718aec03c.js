webpackJsonp([1],{0:function(e,t){},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("7+uW"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var o=i("VU/8")({name:"App"},n,!1,function(e){i("h/PQ")},null,null).exports,r=i("/ocq"),a=i("d7EF"),l=i.n(a),c=i("BO1k"),u=i.n(c),h=i("Zrlr"),d=i.n(h),v=i("wxAW"),y=i.n(v),f=i("G8fO"),p=i.n(f),m=function(){function e(){d()(this,e),this.boardMatrix=p.a.zeros(20,20),this.previewMatrix=p.a.zeros(20,20),this.tryX=0,this.tryY=0,this.tryPiece=null,this.step=0,this.startPoints=[new g(0,0),new g(0,19),new g(19,19),new g(19,0)],this.maxPlayerNum=4,this.players={},this.playerIds=[]}return y()(e,[{key:"addPlayer",value:function(e,t){this.players[e]=t,this.playerIds.push(e)}},{key:"initTry",value:function(){this.tryX=0,this.tryY=0,this.tryPiece=null}},{key:"tryMove",value:function(e,t,i,s){var n=p.a.zeros(20,20),o=new g(e-2,t-2),r=i.translate(o),a=!0,l=!1,c=void 0;try{for(var h,d=u()(r);!(a=(h=d.next()).done);a=!0){var v=h.value;if(!(v.x<=19&&v.x>=0&&v.y<=19&&v.y>=0))return;n.set([v.y,v.x],s)}}catch(e){l=!0,c=e}finally{try{!a&&d.return&&d.return()}finally{if(l)throw c}}this.tryX=e-2,this.tryY=t-2,this.tryPiece=i,this.previewMatrix=n}},{key:"move",value:function(e,t){if(console.log("now player",e),this.tryPiece){var i=new g(this.tryX,this.tryY),s=this.tryPiece.translate(i),n=!0;if(t){var o=this.startPoints[this.playerIds.indexOf(e)];console.log("first piece,start point:",o),n=o.isIn(s)}else{var r=!1,a=!0,l=!0,c=!0,h=!1,d=void 0;try{for(var v,y=u()(s);!(c=(v=y.next()).done);c=!0){var f=v.value;if(0!==this.boardMatrix.get([f.y,f.x])){l=!1;break}if(f.y+1<=19&&this.boardMatrix.get([f.y+1,f.x])===e){a=!1;break}if(f.y-1>=0&&this.boardMatrix.get([f.y-1,f.x])===e){a=!1;break}if(f.x+1<=19&&this.boardMatrix.get([f.y,f.x+1])===e){a=!1;break}if(f.x-1>=0&&this.boardMatrix.get([f.y,f.x-1])===e){a=!1;break}f.y+1<=19&&f.x+1<=19&&this.boardMatrix.get([f.y+1,f.x+1])===e&&(r=!0),f.y+1<=19&&f.x-1>=0&&this.boardMatrix.get([f.y+1,f.x-1])===e&&(r=!0),f.y-1>=0&&f.x+1<=19&&this.boardMatrix.get([f.y-1,f.x+1])===e&&(r=!0),f.y-1>=0&&f.x-1>=0&&this.boardMatrix.get([f.y-1,f.x-1])===e&&(r=!0)}}catch(e){h=!0,d=e}finally{try{!c&&y.return&&y.return()}finally{if(h)throw d}}console.log(r,a,l),n=r&&a&&l}if(n){var p=!0,m=!1,_=void 0;try{for(var x,b=u()(s);!(p=(x=b.next()).done);p=!0){var I=x.value;this.boardMatrix.set([I.y,I.x],e)}}catch(e){m=!0,_=e}finally{try{!p&&b.return&&b.return()}finally{if(m)throw _}}return this.initTry(),this.step+=1,s.length}return 0}}}]),e}(),_=function(){function e(t,i){d()(this,e),this.userId=i,this.matrixData=p.a.multiply(p.a.matrix(t),i),this.pieceData=t,this.pointsData=t.reduce(function(e,t,i){var s=t.reduce(function(e,t,s){return 1===t&&e.push(new g(s,i)),e},[]);return e.concat(s)},[]),this.translation=new g(0,0),this.scale=1}return y()(e,[{key:"translate",value:function(e){return this.pointsData.map(function(t){var i=t.x,s=t.y,n=p.a.multiply([[1,0,e.x],[0,1,e.y],[0,0,1]],[[i],[s],[1]]),o=l()(n,3),r=l()(o[0],1)[0],a=l()(o[1],1)[0];l()(o[2],1)[0];return new g(r,a)})}},{key:"setTranslation",value:function(e,t){this.translation=new g(e,t)}},{key:"rotate",value:function(){var e=this,t=p.a.pi/2,i=this.matrixData.size(),s=p.a.zeros(i[0],i[1]),n=p.a.cos(t).toFixed(),o=p.a.sin(t).toFixed(),r=this.pointsData.map(function(t){console.log(t);var i=p.a.multiply([[n,-o,2*(1-n)+2*o],[o,n,2*(1-n)-2*o],[0,0,1]],[[t.x],[t.y],[1]]),r=l()(i,3),a=l()(r[0],1)[0],c=l()(r[1],1)[0];l()(r[2],1)[0];return s.set([c,a],e.userId),new g(a,c)});this.pointsData=r,this.matrixData=s}},{key:"mirror",value:function(){var e=this,t=this.matrixData.size(),i=p.a.zeros(t[0],t[1]),s=[];this.pointsData.forEach(function(n){var o=t[0]-1-n.x,r=n.y;i.set([r,o],e.userId),s.push(new g(o,r))}),this.pointsData=s,this.matrixData=i}}]),e}(),g=function(){function e(t,i){d()(this,e),this.x=t,this.y=i}return y()(e,[{key:"isIn",value:function(e){var t=!0,i=!1,s=void 0;try{for(var n,o=u()(e);!(t=(n=o.next()).done);t=!0){var r=n.value;if(this.isEq(r))return!0}}catch(e){i=!0,s=e}finally{try{!t&&o.return&&o.return()}finally{if(i)throw s}}return!1}},{key:"isEq",value:function(e){return this.x===e.x&&this.y===e.y}}]),e}(),x={Board:m,Player:function(){function e(t,i){d()(this,e),this.userId=t,this.board=i,this.score=0,this.initPieces(t),this.board.addPlayer(t,this)}return y()(e,[{key:"initPieces",value:function(e){var t=this;this.firstFlag=!0,this.pieces=[],b.forEach(function(i){t.pieces.push(new _(i,e))})}},{key:"tryMove",value:function(e,t,i,s){this.tryIndex=s,this.board.tryMove(e,t,i,this.userId)}},{key:"move",value:function(){console.log("move userId",this.userId,this.tryIndex);var e=this.board.move(this.userId,this.firstFlag);return console.log("player move flag",e),!!e&&(this.firstFlag=!1,this.pieces.splice(this.tryIndex,1),this.score+=e,0===this.pieces.length&&1===e?this.score+=20:0===this.pieces.length&&(this.score+=15),!0)}}]),e}()},b=[[[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,1,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,1,0],[0,1,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,1,1,0,0],[0,1,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,1,0,0,0],[0,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[0,0,1,1,1],[0,1,1,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,1,1,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,1,0,1,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,0,0],[0,1,1,1,0],[0,1,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,1,0],[0,0,1,0,0],[0,1,1,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,1,1,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,1,0,0,0],[0,1,1,0,0],[0,0,1,1,0],[0,0,0,0,0]]],I=i("BcfP"),k={name:"Blokus",data:function(){return{board:new x.Board,players:{},selectedPiece:null,colClass:["","blue","yellow","red","green"],curId:1,myId:1,text:"",rooms:[],room:null,client:null}},mounted:function(){this.initClient(),this.getAvailableRooms()},methods:{initClient:function(){this.client=new I.Client("ws://140.143.2.208:2567"),console.log("client",this.client)},leaveRoom:function(){this.room.leave(),this.room=null,this.getAvailableRooms()},createRoom:function(){this.room=this.client.join("blokus-room",{create:!0}),this.addListeners(this.room)},getAvailableRooms:function(){var e=this;this.client.getAvailableRooms("blokus-room",function(t,i){console.log("rooms[0]",t&&t[0]),e.rooms=t})},joinByLastId:function(e){this.room=this.client.join(e),console.log("joinByLastId",e,this.room,this.client),this.addListeners(this.room)},addListeners:function(){var e=this;this.room.onJoin.add(function(){console.log("joined")}),this.room.onStateChange.add(function(t){console.log("initial room state:",t,t.players),e.initBoard(),e.initPlayers(t.players)}),this.room.onMessage.add(function(t){"selectPiece"===t.type&&e.selectPiece(t.userId,t.pieceIndex),"test"===t.type&&e.test(t.userId,t.row,t.col),"move"===t.type&&e.move(t.userId),"rotate"===t.type&&e.rotate(t.userId),"mirror"===t.type&&e.mirror(t.userId)})},initBoard:function(){this.board=new x.Board},initPlayers:function(e){for(var t in console.log(e),e){var i=e[t],s=i.index;console.log("player",i),this.players[s]=new x.Player(s,this.board),this.room.sessionId===t&&(this.myId=s,console.log("myId!!!",this.myId))}},selectPieceMsg:function(e,t){e===this.curId?e===this.myId?(this.text="",this.room.send({type:"selectPiece",userId:e,pieceIndex:t})):this.text="不是你的":this.text="没轮到你"},selectPiece:function(e,t){this.selectedPiece=this.players[e].pieces[t],this.selectedIndex=t,this.board.initTry()},testMsg:function(e,t,i){e===this.myId&&this.room.send({type:"test",userId:e,row:t,col:i})},test:function(e,t,i){console.log(e,t,i,this.selectedPiece,this.selectedIndex),this.players[e].tryMove(t,i,this.selectedPiece,this.selectedIndex)},moveMsg:function(e){e===this.myId&&this.room.send({type:"move",userId:e})},move:function(e){this.players[e].move()&&(this.selectedPiece=null,this.curId=this.board.playerIds[this.board.step%this.board.playerIds.length])},rotateMsg:function(e){e===this.myId&&this.room.send({type:"rotate",userId:e})},rotate:function(){this.selectedPiece&&this.selectedPiece.rotate()},mirrorMsg:function(e){e===this.myId&&this.room.send({type:"mirror",userId:e})},mirror:function(){this.selectedPiece&&this.selectedPiece.mirror()}}},w={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"blokus"},[i("div",{staticClass:"square"},[e._m(0),e._v(" "),i("div",{staticClass:"board"},[e._l(e.board.boardMatrix.valueOf(),function(t,s){return[e._l(t,function(t,n){return i("div",{key:20*s+n,staticClass:"cel",class:e.colClass[t]})}),e._v(" "),i("div",{key:s+"n",staticClass:"cel -hidden"},[e._v("\\n")])]})],2),e._v(" "),e.selectedPiece?i("div",{staticClass:"board"},[e._l(e.board.previewMatrix.valueOf(),function(t,s){return[e._l(t,function(t,n){return i("div",{key:20*s+n,staticClass:"cel",class:e.colClass[t],on:{mouseover:function(t){return e.testMsg(e.selectedPiece.userId,n,s)},click:function(t){return e.moveMsg(e.selectedPiece.userId)}}})}),e._v(" "),i("div",{key:s+"n",staticClass:"cel -hidden"},[e._v("\\n")])]})],2):e._e(),e._v(" "),e._l(e.players,function(t,s){return i("div",{key:s,staticClass:"player",class:"player"+s},e._l(t.pieces,function(s,n){return i("div",{key:n,staticClass:"piece",on:{click:function(i){return e.selectPieceMsg(t.userId,n)}}},[e._l(s.matrixData.valueOf(),function(t,s){return[e._l(t,function(t,n){return i("div",{key:5*s+n,staticClass:"cel",class:e.colClass[t]})}),e._v(" "),i("div",{key:s+"n",staticClass:"cel -hidden"},[e._v("\\n")])]})],2)}),0)}),e._v(" "),i("div",{staticClass:"choose"},[e._m(1),e._v(" "),e.selectedPiece?i("div",{staticClass:"piece",staticStyle:{"grid-area":"cp"}},[e._l(e.selectedPiece.matrixData.valueOf(),function(t,s){return[e._l(t,function(t,n){return i("div",{key:5*s+n,staticClass:"cel",class:e.colClass[t]})}),e._v(" "),i("div",{key:s+"n",staticClass:"cel -hidden"},[e._v("\\n")])]})],2):e._e(),e._v(" "),i("button",{staticStyle:{"grid-area":"btn1"},on:{click:function(t){return e.rotateMsg(e.selectedPiece.userId)}}},[e._v("旋转 rotate")]),e._v(" "),i("button",{staticStyle:{"grid-area":"btn2"},on:{click:function(t){return e.mirrorMsg(e.selectedPiece.userId)}}},[e._v("翻转 mirror")])]),e._v(" "),i("div",{staticClass:"scoreboard"},[i("p",[e._v("记分板 scoreboard")]),e._v(" "),e._l(e.players,function(t,s){return i("p",{key:s,staticClass:"player",class:e.colClass[s]},[e._v("\n        "+e._s("player"+t.userId+": "+t.score)+"\n      ")])}),e._v(" "),e.text?i("p",[e._v("提示:"+e._s(e.text))]):e._e()],2),e._v(" "),i("div",{staticClass:"room"},[e.room?[i("p",[e._v("当前房间号: "+e._s(e.room.id))]),e._v(" "),i("button",{on:{click:e.leaveRoom}},[e._v("退出房间")])]:[i("button",{on:{click:e.getAvailableRooms}},[e._v("刷新房间列表")]),e._v(" "),i("button",{on:{click:e.createRoom}},[e._v("创建房间")]),e._v(" "),i("ul",e._l(e.rooms,function(t,s){return i("li",{key:s},[e._v("\n            "+e._s(t.roomId+" "+t.clients+"/"+t.maxClients)+"\n            "),i("button",{on:{click:function(i){return e.joinByLastId(t.roomId)}}},[e._v("加入")])])}),0)]],2)],2)])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"info"},[i("div",{staticClass:"cn"},[i("p",[e._v("游戏流程")]),e._v(" "),i("p",[e._v("1、四位玩家各选择一种颜色的棋子，按照逆时针顺序轮流下棋。顺序为蓝、黄、红、绿，分别从左上、左下、右下、右上开局。")]),e._v(" "),i("p",[e._v("2、每位玩家第一步下棋，都必须覆盖住棋盘角落的起始点。")]),e._v(" "),i("p",[e._v("3、之后每一步新摆放的棋子，它的一个角必须与原有的同颜色的棋子的一个角接上。注意只能角对角，不能有边与边的接触。和其他颜色的棋子则没有限制。")]),e._v(" "),i("p",[e._v("4、一旦某玩家无法将自己的棋子按照规则放在棋盘上，则当轮该玩家宣布弃权，由下一个玩家继续。")]),e._v(" "),i("p",[e._v("当所有玩家都无法下棋时，则该局游戏结束。")])]),e._v(" "),i("div",{staticClass:"en"},[i("p",[e._v("How to Play:")]),e._v(" "),i("p",[e._v("1. Each player chooses a color and places that set of 21 pieces in front of his/her side of the board. The order of play is as follows: blue, yellow, red, and then green.")]),e._v(" "),i("p",[e._v("2. The first player (blue) places any of his/her pieces in a corner square. Play proceeds clockwise around the board (yellow, red, and green), each player putting their first piece down in one of the corner squares.")]),e._v(" "),i("p",[e._v("3. Play continues as each player lays down one piece during a turn.\n          Each new piece must touch at least one other piece of the same color, but only at the corners.\n          No flat edges of same color pieces can touch.\n          There are no restrictions on how pieces of different colors can touch one another.")]),e._v(" "),i("p",[e._v("4. Whenever a player is unable to place one of his/her remaining pieces on the board, that player must pass his/her turn.")]),e._v(" "),i("p",[e._v("End of Game:\n          The game ends when all players are blocked from laying down any more of their pieces. This also includes any players who may have placed all of their pieces on the board. Scores are tallied, and the player with the highest score is the winner.")]),e._v(" "),i("p",[e._v("Scoring:\n          Each player counts the number of unit squares in his/her remaining pieces (1 unit square = -1 point).\n          A player earns +15 points if all his/her pieces have been placed on the board plus 5 additional bonus points if the last piece placed on the board was the smallest piece (one square).")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticStyle:{"grid-area":"cin"}},[t("p",[this._v("当前选中 choosed")])])}]};var P=i("VU/8")(k,w,!1,function(e){i("kW60")},"data-v-52f11367",null).exports,C={name:"room",data:function(){return{rooms:[],roomKey:"",client:null,room:null}},mounted:function(){console.log("mounted"),this.client=new I.Client("ws://localhost:2567"),console.log(this.client),this.leave(),this.create(),this.getAvailableRooms()},methods:{addListeners:function(e){e.onJoin.add(function(){console.log(e.id),console.log("joined!")}),e.onLeave.add(function(){console.log("LEFT ROOM",arguments)}),e.onStateChange.add(function(e){console.log("chat update: ",e)})},leave:function(){this.room&&this.room.leave()},join:function(){this.room=this.clent.join("blokus-room"),this.addListeners(this.room)},create:function(){this.room=this.client.join("blokus-room",{create:!0}),this.addListeners(this.room)},joinByLastId:function(e){this.room=this.client.join(e),this.addListeners(this.room),this.getAvailableRooms()},getAvailableRooms:function(){var e=this;this.client.getAvailableRooms("blokus-room",function(t,i){console.log(t),e.rooms=t})}}},M={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("ul",e._l(e.rooms,function(t,s){return i("li",{key:s},[e._v("\n          "+e._s(t.roomId)+"\n          "),i("button",{on:{click:function(i){return e.joinByLastId(t.roomId)}}},[e._v("加入")])])}),0),e._v("\n  "+e._s(e.rooms)+"\n  ")])},staticRenderFns:[]},R=i("VU/8")(C,M,!1,null,null,null).exports;s.a.use(r.a);var E=new r.a({routes:[{path:"/",name:"Blokus",component:P},{path:"/room",name:"room",component:R}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:E,components:{App:o},template:"<App/>"})},"h/PQ":function(e,t){},kW60:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.4fa3ae3d913718aec03c.js.map