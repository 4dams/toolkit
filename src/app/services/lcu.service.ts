import { Injectable, NgZone } from "@angular/core";
import { ElectronService } from "../core/services";
import axios, { AxiosResponse, AxiosInstance } from "axios";
import * as https from "https";

@Injectable({
    providedIn: "root",
})
export class LcuService {
    /**
     * @public Profile background url
     *
     * String containing url to profile background (championName_skinId)
     */
    public profileBackground: string;

    /**
     * @public Champion table
     *
     * Object with the following layout:
     * Key: ID
     * Value: Name
     */
    public champTable: any = {};

    /**
     * @public LCU connection data
     *
     * Object containing Lcu connection info
     * undefined if no connection is received yet
     */
    public connection: {
        protocol: "http" | "https";
        address: string;
        port: number;
        username: string;
        password: string;
    };

    /**
     * AxiosInstance we use as out http client
     * comes with pre-set https settings and Authorization header
     */
    private http: AxiosInstance;

    constructor(private electron: ElectronService, private zone: NgZone) {
        // Listen for getLcu events, if received, initiate app
        electron.ipcRenderer.on("getLcu", (event, connection) => {
            this.init(connection);
        });
    }

    /**
     * @private Initialize our application
     *
     * @param connection LCU connection info, equal to this.connection
     */
    private init(connection: any) {
        this.connection = connection;

        // Create AxiosInstance
        this.http = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
            headers: {
                Authorization: this.getAuthHeader(),
            },
        });

        // Get profile background
        this.getProfileBackground().then(backgroundUrl => {
            console.log("Received profile background!", backgroundUrl);
            this.profileBackground = backgroundUrl;

            // Update zone
            this.zone.run(() => {
                console.log("Forced component re-rendering after IPC event");
            });
        });
    }

    /**
     * @public Request connection info from main process
     */
    public requestLcuConnection(): void {
        this.electron.ipcRenderer.send("getLcu");
    }

    /**
     * @private Return Authorization header
     */
    private getAuthHeader(): string {
        return "Basic " + Buffer.from(this.connection.username + ":" + this.connection.password).toString("base64");
    }

    /**
     * @public GET Http request
     *
     * @param path String of which url we send request to
     * @param params Object key/value
     */
    public get(path: string, params?: any): Promise<any> {
        return this.http
            .get(`https://${this.connection.address}:${this.connection.port}/${path}`, {
                params,
            })
            .then((res: AxiosResponse) => {
                return res.data;
            });
    }

    /**
     * @public POST Http request
     *
     * @param path String of which url we send request to
     * @param params Request payload
     */
    public post(path: string, data?: any): Promise<any> {
        return this.http
            .post(`https://${this.connection.address}:${this.connection.port}/${path}`, data)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    }

    /**
     * @public PUT Http request
     *
     * @param path String of which url we send request to
     * @param params Request payload
     */
    public put(path: string, data?: any): Promise<any> {
        return this.http
            .put(`https://${this.connection.address}:${this.connection.port}/${path}`, data)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    }

    /**
     * @public Get Toolkit background image
     *
     * First fetch champ table to resolve champ name by id
     * Then get current summoner profile including champ id and champ name
     * which both have to be parsed first
     */
    public getProfileBackground(): Promise<string> {
        return new Promise((resolve, reject) => {
            // Get champion table
            this.get("lol-champions/v1/owned-champions-minimal").then(data => {
                data.map(champ => {
                    this.champTable[champ.id] = champ.name;
                });

                // Get summoner profile
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

                    // Resolve url
                    resolve(`https://static.4da.ms/toolkit/splashs/${champ}_${skin}.jpg`);
                });
            });
        });
    }

    /**
     * @public Get background string
     *
     * Combines previously fetched backgroundUrl and background overlay
     * then transform it into css property
     */
    public getBackgroundString(): string {
        return `url(../assets/img/backdrop_overlay.png) no-repeat center center fixed, url(${
            this.profileBackground ? this.profileBackground : "../assets/img/default_backdrop.png"
        }) no-repeat center center fixed`;
    }
}
