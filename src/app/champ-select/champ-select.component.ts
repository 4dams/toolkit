import { Component, OnInit } from "@angular/core";
import { ChampSelectService } from "./service/champ-select.service";

@Component({
    selector: "app-champ-select",
    templateUrl: "./champ-select.component.html",
    styleUrls: ["./champ-select.component.css"],
})
export class ChampSelectComponent implements OnInit {
    constructor(public champSelect: ChampSelectService) {}

    ngOnInit() {}
}
