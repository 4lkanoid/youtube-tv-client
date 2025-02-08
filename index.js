const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    // pressing alt can bring up the menu bar even when its hidden. This accounts for that and disables it entirely
    win.setMenu(null);

    win.loadURL('https://youtube.com/tv', {
        userAgent: 'Mozilla/5.0 (PS4; Leanback Shell) Cobalt/24.lts.13.1032728-gold v8/8.8.278.8-jit gles Starboard/14, SystemIntegratorName_PS4_ChipsetModelNumber_2024/FirmwareVersion (Sony, PS4, Wired)'
    });

    // setting zoom 50% to enable higher resolutions. has no effect on the applications UI.
    win.webContents.on('did-finish-load', () => {
        win.webContents.setZoomFactor(0.5);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
