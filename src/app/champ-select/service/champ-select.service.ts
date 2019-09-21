import { Injectable } from "@angular/core";
import { LcuService } from "../../services/lcu.service";

@Injectable({
    providedIn: "root",
})
export class ChampSelectService {
    /**
     * @public Boolean if ready check is enabled
     */
    public enableReadyCheck = false;

    /**
     * @public Ready check interval
     *
     * undefined if timer is not active
     */
    public readyCheck: ReturnType<typeof setTimeout>;

    constructor(public lcu: LcuService) {}

    /**
     * @public Toggle ready check
     *
     * Turns ready check on or off by calling either
     * this.breakReadyCheck or this.initReadyCheck method
     */
    public toggleReadyCheck(): void {
        if (this.enableReadyCheck) {
            this.breakReadyCheck();
            this.enableReadyCheck = false;
            console.log("Disabled ready check");
        } else {
            this.initReadyCheck();
            this.enableReadyCheck = true;
            console.log("Enabled ready check");
        }
    }

    /**
     * @private Initiate ready check
     *
     * Sets interval and start checking for
     * matchmaking status
     */
    private initReadyCheck(): void {
        this.readyCheck = setInterval(() => {
            this.lcu
                .get("lol-matchmaking/v1/ready-check")
                .then(res => {
                    // If ready check is pending and user didnt respond yet
                    if (res.state === "InProgress" && res.playerResponse === "None") {
                        console.log("Ready check pending...");

                        // Accept ready check
                        this.lcu.post("lol-matchmaking/v1/ready-check/accept").then(ready => {
                            console.log("Ready check accepted!", ready);
                        });
                    }
                })
                .catch(err => {
                    console.log("Not in Queue");
                });
        }, 1000);
    }

    /**
     * @private Stop ready check
     *
     * Clears ready check interval
     */
    private breakReadyCheck() {
        clearTimeout(this.readyCheck);
    }
}
