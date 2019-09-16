import { Component, OnInit } from "@angular/core";
import { LcuService } from "../services/lcu.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
    public tiers = [
        {
            label: "Challenger",
            value: "CHALLENGER",
        },
        {
            label: "Grand Master",
            value: "GRANDMASTER",
        },
        {
            label: "Master",
            value: "MASTER",
        },
        {
            label: "Diamond",
            value: "DIAMOND",
        },
        {
            label: "Platinum",
            value: "PLATINUM",
        },
        {
            label: "Gold",
            value: "GOLD",
        },
        {
            label: "Silver",
            value: "SILVER",
        },
        {
            label: "Bronze",
            value: "BRONZE",
        },
        {
            label: "Iron",
            value: "IRON",
        },
    ];
    public divisions = [
        {
            label: "I",
            value: "I",
        },
        {
            label: "II",
            value: "II",
        },
        {
            label: "III",
            value: "III",
        },
        {
            label: "IV",
            value: "IV",
        },
        {
            label: "V",
            value: "V",
        },
    ];
    public queues = [
        {
            label: "Ranked Solo/Duo",
            value: "RANKED_SOLO_5x5",
        },
        {
            label: "Ranked Flex 5v5",
            value: "RANKED_FLEX_SR",
        },
        {
            label: "Ranked Flex 3v3",
            value: "RANKED_FLEX_TT",
        },
        {
            label: "Teamfight Tactics",
            value: "RANKED_TFT",
        },
    ];

    public form = {
        customName: "",
        customStatus: "",
        customRank: {
            division: "",
            tier: "",
            queue: "",
        },
    };

    public profile = {
        summoner: {
            icon: 29,
            level: 0,
            name: "Loading...",
            id: "Loading...",
            tier: "Loading...",
            division: "Loading...",
            queue: "Loading...",
        },
    };

    constructor(private lcu: LcuService) {}

    ngOnInit() {
        this.updateProfileInfo();
    }

    public updateProfileInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.lcu
                .get("lol-chat/v1/me")
                .then(me => {
                    console.log(me);
                    // Prefill form
                    this.form.customRank.division = me.lol.rankedLeagueDivision;
                    this.form.customRank.tier = me.lol.rankedLeagueTier;
                    this.form.customRank.queue = me.lol.rankedLeagueQueue;
                    this.form.customName = me.name;
                    this.form.customStatus = me.statusMessage;

                    // Set local profile information
                    this.profile.summoner.icon = me.icon;
                    this.profile.summoner.level = me.lol.level;
                    this.profile.summoner.name = me.name;
                    this.profile.summoner.id = me.id;
                    this.profile.summoner.division = me.lol.rankedLeagueDivision;
                    this.profile.summoner.tier = me.lol.rankedLeagueTier;
                    this.profile.summoner.queue = me.lol.rankedLeagueQueue;
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    public profileCrestUrl(tier: string) {
        switch (tier) {
            case "UNRANKED":
                return "../../assets/img/crests/crest_unranked.png";

            case "IRON":
                return "../../assets/img/crests/crest_unranked.png";

            case "BRONZE":
                return "../../assets/img/crests/crest_unranked.png";

            case "SILVER":
                return "../../assets/img/crests/crest_unranked.png";

            case "GOLD":
                return "../../assets/img/crests/crest_gold.png";

            case "PLATINUM":
                return "../../assets/img/crests/crest_unranked.png";

            case "DIAMOND":
                return "../../assets/img/crests/crest_diamond.png";

            case "MASTER":
                return "../../assets/img/crests/crest_master.png";

            case "GRANDMASTER":
                return "../../assets/img/crests/crest_unranked.png";

            case "CHALLENGER":
                return "../../assets/img/crests/crest_challenger.png";

            default:
                return "../../assets/img/crests/crest_unranked.png";
        }
    }

    public setRank() {
        this.lcu
            .put("lol-chat/v1/me", {
                lol: {
                    rankedLeagueDivision: this.form.customRank.division,
                    rankedLeagueQueue: this.form.customRank.queue,
                    rankedLeagueTier: this.form.customRank.tier,
                },
            })
            .then(res => {
                console.log(res);
                this.updateProfileInfo();
            })
            .catch(err => {
                console.log(err);
            });
    }

    public setSummonerName() {
        this.lcu
            .put("lol-chat/v1/me", {
                name: this.form.customName,
            })
            .then(res => {
                console.log(res);
                this.updateProfileInfo();
            })
            .catch(err => {
                console.log(err);
            });
    }

    public setStatus() {
        this.lcu
            .put("lol-chat/v1/me", {
                statusMessage: this.form.customStatus,
            })
            .then(res => {
                console.log(res);
                this.updateProfileInfo();
            })
            .catch(err => {
                console.log(err);
            });
    }
}
