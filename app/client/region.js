export class RegionManager {

    constructor() {
        this.regions = [];
        this.preloaded = [];
    }

    leave(payload){
        let region = payload.regionId
        if(region in this.regions){
            const sound = this.regions[region];
            sound.fade(1, 0, 1000);
        }
    }

    enter(payload){
        const start = new Date().getTime();
		
		let ticks = payload.millis;
		
        if(this.regions[payload.regionId] == null){
            let audio = null;

            if(this.preloaded[payload.mediaUrl] == null){
                audio = new Howl({src: [payload.mediaUrl], html5: true, autoplay: false, volume: 0, preload: false});

                this.regions[payload.regionId] = audio;

                audio.load();

                audio.once("load", function () {
					let difference = new Date().getTime() - start;
					let seconds = (ticks * 50 / 1000);
					console.log("tickMillis = " + seconds);
					
                    audio.play();
                    audio.loop(true);
                    audio.fade(0, 1, 1000);

                });

            }else {

                audio = this.preloaded[payload.mediaUrl];

                this.regions[payload.regionId] = audio;
			
                
                audio.volume(0);
                audio.play();
                audio.loop(true);
                audio.fade(0, 1, 1000);
            }
        } else {
            const audio = this.regions[payload.regionId];
            audio.fade(0, 1, 1000);
        }
    }


}