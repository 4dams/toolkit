import { Injectable, NgZone } from "@angular/core";
import { ElectronService } from "../core/services";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as https from "https";

@Injectable({
    providedIn: "root",
})
export class LcuService {
    public profileBackground: string;
    public champTable: any = {};

    constructor(private electron: ElectronService, private zone: NgZone) {
        electron.ipcRenderer.on("getLcu", (event, connection) => {
            this.init(connection);
        });
    }

    public connection: {
        protocol: "http" | "https";
        address: string;
        port: number;
        username: string;
        password: string;
    };

    private http;

    private init(connection: any) {
        this.connection = connection;

        this.http = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
            headers: {
                Authorization: this.getAuthHeader(),
            },
        });

        this.zone.run(() => {
            console.log("Forced component re-rendering after IPC event");
        });

        this.getProfileBackground().then(backgroundUrl => {
            console.log("Received profile background!", backgroundUrl);
            this.profileBackground = backgroundUrl;

            this.zone.run(() => {
                console.log("Forced component re-rendering after IPC event");
            });
        });
    }

    public requestLcuConnection() {
        this.electron.ipcRenderer.send("getLcu");
    }

    private getAuthHeader() {
        return "Basic " + Buffer.from(this.connection.username + ":" + this.connection.password).toString("base64");
    }

    public get(path: string, params?: any) {
        return this.http
            .get(`https://${this.connection.address}:${this.connection.port}/${path}`, {
                params,
            })
            .then((res: AxiosResponse) => {
                return res.data;
            })
            .catch(err => {
                // console.error(err);
            });
    }

    public post(path: string, data?: any) {
        return this.http
            .post(`https://${this.connection.address}:${this.connection.port}/${path}`, data)
            .then((res: AxiosResponse) => {
                return res.data;
            })
            .catch(err => {
                // console.error(err);
            });
    }

    public put(path: string, data?: any) {
        return this.http
            .put(`https://${this.connection.address}:${this.connection.port}/${path}`, data)
            .then((res: AxiosResponse) => {
                return res.data;
            })
            .catch(err => {
                // console.error(err);
            });
    }

    public getProfileBackground(): Promise<string> {
        return new Promise((resolve, reject) => {
            // First get champion table
            this.get("lol-champions/v1/owned-champions-minimal").then(data => {
                data.map(champ => {
                    this.champTable[champ.id] = champ.name;
                });
                console.log("Champ table fetched!");

                this.get("lol-summoner/v1/current-summoner/summoner-profile").then(data => {
                    // Get champion name
                    const champ = this.champTable[
                        data.backgroundSkinId.toString().slice(0, data.backgroundSkinId.toString().length - 3)
                    ];

                    // Get skin id
                    const skin = parseInt(
                        data.backgroundSkinId.toString().slice(data.backgroundSkinId.toString().length - 3),
                        10
                    );

                    resolve(`https://static.4da.ms/toolkit/splashs/${champ}_${skin}.jpg`);
                });
            });
        });
    }

    public getBackgroundString() {
        return `url(../assets/img/backdrop_overlay.png) no-repeat center center fixed, url(${
            this.profileBackground ? this.profileBackground : "../assets/img/default_backdrop.png"
        }) no-repeat center center fixed`;
    }
}
