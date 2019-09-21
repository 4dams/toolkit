import { Injectable } from "@angular/core";
import { LcuService } from "../../services/lcu.service";

@Injectable({
    providedIn: "root",
})
export class ProfileService {
    /**
     * @public List of selectable tiers
     *
     * Array including objects with label and value key
     * used in select-component
     */
    public tiers: Array<{ label: string; value: string }> = [
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

    /**
     * @public List of selectable divisions
     *
     * Array including objects with label and value key
     * used in select-component
     */
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
        {
            label: "VI",
            value: "VI",
        },
        {
            label: "VII",
            value: "VII",
        },
        {
            label: "VIII",
            value: "VIII",
        },
        {
            label: "IX",
            value: "IX",
        },
        {
            label: "X",
            value: "X",
        },
    ];

    /**
     * @public List of selectable queue types
     *
     * Array including objects with label and value key
     * used in select-component
     */
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

    /**
     * @public Form including modifyable profile info
     *
     * This is where all information of the profile-tab
     * is being stored and the ngModel-tags refer to
     */
    public form = {
        customName: "",
        customStatus: "",
        customRank: {
            division: "",
            tier: "",
            queue: "",
        },
    };

    /**
     * @public Summoner profile banner thingy
     *
     * Holds the information of the user on the left
     * side of the profile tab
     */
    public summoner = {
        icon: 29,
        level: 0,
        name: "Loading...",
        id: "Loading...",
        tier: "Loading...",
        division: "Loading...",
        queue: "Loading...",
    };

    constructor(public lcu: LcuService) {}

    /**
     * @public Update profile information
     *
     * Requests most user information from the League Client
     * then fills forms with the data
     */
    public updateProfileInfo(): Promise<any> {
        return this.lcu
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
                this.summoner.icon = me.icon;
                this.summoner.level = me.lol.level;
                this.summoner.name = me.name;
                this.summoner.id = me.id;
                this.summoner.division = me.lol.rankedLeagueDivision;
                this.summoner.tier = me.lol.rankedLeagueTier;
                this.summoner.queue = me.lol.rankedLeagueQueue;
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * @public Get profile background banner
     *
     * Returns background url relative to project root
     * by given tier
     *
     * @param tier One of the cases below
     */
    public crest(tier: string): string {
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

    /**
     * @public Set custom rank on profile card
     *
     * Update rank data based on selection in profile form
     */
    public setRank(): Promise<any> {
        return this.lcu
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

    /**
     * @public Set custom summoner name on profile card (local)
     */
    public setSummonerName(): Promise<any> {
        return this.lcu
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

    /**
     * @public Set custom status name on profile card
     */
    public setStatus(): Promise<any> {
        return this.lcu
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
