import { app, BrowserWindow } from "electron";
import path from "path";
import "./api/index";
import "./api/storage/store";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}


const createWindow = async () => {        
    // Create the main window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        icon: "/img/icons/icon.png",
        autoHideMenuBar: true,
    });
    
    // Create widget windows if any
    const widgetWindows: BrowserWindow[] = [];
    for (let i = 0; i < 1; i++) {
        const widgetWindow = new BrowserWindow({
            parent: mainWindow,
            width: 400,
            height: 300,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
            },
            icon: "/img/icons/icon.png",
            autoHideMenuBar: true,
            frame: false,
            hiddenInMissionControl: true,
            skipTaskbar: true,
            backgroundMaterial: "none",
            transparent: true,
        });

        widgetWindows.push(widgetWindow);
    }
  

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    for(const widgetWindow of widgetWindows) {
        // Send window to back
        

        if (WIDGET_WINDOW_VITE_DEV_SERVER_URL) {
            widgetWindow.loadURL(WIDGET_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            widgetWindow.loadFile(path.join(__dirname, `../renderer/${WIDGET_WINDOW_VITE_NAME}/index.html`));
        }
    }

    // On close minimize to tray
    mainWindow.on("minimize", () => {
        mainWindow.hide();
    });

    mainWindow.on("close", () => {
        widgetWindows.forEach((widgetWindow) => {
            widgetWindow.close();
        });
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
