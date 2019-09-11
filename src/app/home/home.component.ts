import { Component, OnInit } from "@angular/core";
import { LcuService } from "../services/lcu.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    constructor(public lcu: LcuService) {}

    ngOnInit() {}
}
