import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

function createWindow() {
    // Create window
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
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

try {
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
} catch (err) {
    // Catch Errors
    throw err;
}
