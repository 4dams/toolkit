import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./service/profile.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
    constructor(public profile: ProfileService) {}

    ngOnInit() {
        // Update profile info when opening profile tab
        this.profile.updateProfileInfo();
    }
}
