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
    constructor(public electronService: ElectronService, private lcu: LcuService) {
        console.log("AppConfig/environment:", AppConfig);

        if (electronService.isElectron) {
            // console.log(process.env);
            // console.log("Electron ipcRenderer", electronService.ipcRenderer);
            // console.log("NodeJS childProcess", electronService.childProcess);

            console.log("Requesting LCU Connection...");
            this.lcu.requestLcuConnection();
        } else {
            console.warn("WEB MODE");
        }
    }
}
