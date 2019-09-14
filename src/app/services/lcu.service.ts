import { Injectable, NgZone } from "@angular/core";
import { ElectronService } from "../core/services";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as https from "https";

@Injectable({
    providedIn: "root",
})
export class LcuService {
    constructor(private electron: ElectronService, private zone: NgZone) {
        // Start listening for connection events
        electron.ipcRenderer.on("getLcu", (event, connection) => {
            console.log("Received LCU Connection:", connection);

            // Save connection details
            this.connection = connection;

            // Update zone after ipc event
            this.zone.run(() => {
                console.log("Forced component re-rendering after IPC event");
            });

            this.http = axios.create({
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false,
                }),
                headers: {
                    Authorization: this.getAuthHeader(),
                },
            });
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
}
