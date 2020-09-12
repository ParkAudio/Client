export class RegionManager {

    constructor() {
        this.regions = [];
        this.preloaded = [];
    }

    leave(payload) {
        let region = payload.regionId
        if (region in this.regions) {
            const sound = this.regions[region];
            sound.fade(1, 0, 1000);
        }
    }

    enter(payload) {
        const regionId = payload.regionId;
        const mediaUrl = payload.mediaUrl;
        const start = new Date().getTime();

        //TODO: Make regions sync
        let ticks = payload.millis;

        if (this.regions[regionId] == null) {
            let audio = null;
            if (this.preloaded[mediaUrl] == null) {
                audio = new Howl({src: [mediaUrl], html5: true, autoplay: false, volume: 0, preload: false});
                this.regions[regionId] = audio;
                audio.load();
                audio.once("load", function () {
                    audio.play();
                    audio.loop(true);
                    audio.fade(0, 1, 1000);
                });
            } else {
                audio = this.preloaded[mediaUrl];
                this.regions[regionId] = audio;
                audio.volume(0);
                audio.play();
                audio.loop(true);
                audio.fade(0, 1, 1000);
            }
        } else {
            const audio = this.regions[regionId];
            audio.fade(0, 1, 1000);
        }
    }


}