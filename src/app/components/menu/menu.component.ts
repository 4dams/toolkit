import { Component, OnInit } from "@angular/core";
import { LcuService } from "../../services/lcu.service";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
    constructor(public lcu: LcuService) {}

    ngOnInit() {}
}
