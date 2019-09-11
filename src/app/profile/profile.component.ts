import { Component, OnInit } from "@angular/core";
import { LcuService } from "../services/lcu.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
    constructor(private lcu: LcuService) {}

    ngOnInit() {
        this.lcu.get("lol-chat/v1/me", null).then(data => {
            console.log(data);
        });
    }
}
