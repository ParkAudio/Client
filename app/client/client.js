import * as io from "socket.io-client";
import msgpack from "@ygoe/msgpack";

export class Audioclient {
    constructor(address) {
        this.address = address;
        this.callbacks = [];

        this.connect();
    }

    connect() {
        this.io = io.connect(this.address);
        this.io.binaryType = "arrayBuffer";
        this.io.on("data", data => {
            const decoded = msgpack.deserialize(data);
            //check for callbacks
            const calls = this.callbacks.filter(x => x.type === decoded.type);
            for (let i = 0; i < calls.length; i++) {
                calls[i].callback(decoded.payload);
            }
        })
    }

    send(type, payload) {
        const data = {type: type, payload: payload};
        const bytes = msgpack.serialize(data);
        this.io.emit("msg", JSON.stringify(bytes));
    }

    on(type, callback) {
        this.callbacks.push({type: type, callback: callback});
    }
}