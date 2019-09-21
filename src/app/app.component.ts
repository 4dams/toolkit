import { Component } from "@angular/core";
import { ElectronService } from "./core/services";
import { AppConfig } from "../environments/environment";
import { LcuService } from "./services/lcu.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    constructor(public electronService: ElectronService, public lcu: LcuService) {
        console.log("AppConfig/environment:", AppConfig);

        if (electronService.isElectron) {
            console.log("Requesting LCU Connection...");
            this.lcu.requestLcuConnection();
        }
    }
}
