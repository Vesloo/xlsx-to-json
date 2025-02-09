import { WebContents } from "electron";

export function isDev(): Boolean {
    return process.env.NODE_ENV === 'development';
}

export function ipcWebContentsSend<T>(
    key: string,
    webContents: WebContents,
    payload: T
  ) {
    webContents.send(key, payload);
}

