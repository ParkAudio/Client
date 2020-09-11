import {Audioclient} from "./client/client";
import {RegionManager} from "./client/region";

const audioclient = new Audioclient("ws://localhost:1898")
const regionManager = new RegionManager();

//receive handshake
audioclient.on("handshake", (payload) => {
    console.log(payload.message)
})

//regions

audioclient.on("regions.play", (payload)=>{
    regionManager.enter(payload);
});

audioclient.on("regions.stop", (payload)=>{
    regionManager.leave(payload);
});

//wait until everything is loaded, then push token towards socket
audioclient.io.on("connect", function (){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("token")){
        console.log("Connecting with token: "+  urlParams.get("token"))
        audioclient.send("handshake",{
            token: urlParams.get("token")
        });
    }
});