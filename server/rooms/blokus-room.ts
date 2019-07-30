import { Room } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
    @type("number")
    score = 0;

    @type("number")
    index = 0;
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();
    index = [1,2,3,4];

    something = "This attribute won't be sent to the client-side";

    createPlayer (id: string) {
        this.players[ id ] = new Player();
        this.players[ id ].index = this.index.shift()
    }

    removePlayer (id: string) {
        this.index.push(this.players[ id ].index)
        this.index.sort()
        delete this.players[ id ];
    }

    addScore (id: string, score: number) {
        this.players[ id ].score += score
    }
}

export class BlokusRoom extends Room<State> {
    maxClients = 4;

    onInit (options) {
        console.log("BlokusRoom created!", options);

        this.setState(new State());
    }

    onJoin (client) {
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        console.log("BlokusRoom received message from", client.sessionId, ":", data);
        // this.state.addScore(client.sessionId, data);
        this.broadcast(data);
    }

    onDispose () {
        console.log("Dispose BlokusRoom");
    }

}
