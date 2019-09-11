/*
 * Import Dependencies
 */
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as signale from "signale";

/*
 * Make sure to allow insecure HTTP requests to LCU
 */
app.commandLine.appendSwitch("ignore-certificate-errors", "true");
app.commandLine.appendSwitch("allow-insecure-localhost", "true");

/*
 * Set up LCU connection listener
 */
const LCU = require("lcu-connector");
const lcu = new LCU(null);

/*
 * Define some global vars and check if we're running in dev mode
 */
let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            // bypass the LCUs CORS policy
            webSecurity: false,
        },
        icon: path.join(__dirname, "icons/icon_64px.png"),
    });

    if (serve) {
        require("electron-reload")(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
        });

        win.loadURL("http://localhost:4200");

        // Open dev tools on launch
        // win.webContents.openDevTools();
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, "dist/index.html"),
                protocol: "file:",
                slashes: true,
            })
        );
    }

    // Emitted when the window is closed.
    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

/*
 * Start listening for LCU connection
 */
let connection: any;

lcu.on("connect", (data: any) => {
    signale.success("Connected to League Client");
    connection = data;
});

lcu.start();

/*
 * Inter Process Communication
 */
ipcMain.on("getLcu", event => {
    signale.success("LCU Connection requested");
    event.reply("getLcu", connection);
});
