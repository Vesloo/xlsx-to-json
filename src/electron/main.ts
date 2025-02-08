import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import xlsx from 'read-excel-file/node';
import { getPreloadPath } from "./pathResolver.js";

type test = string 

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    console.log(getPreloadPath())
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));


    ipcMain.handle('parse-xlsx', async (event, [filePath, columns]) => {
        event.preventDefault();
        const schema:any = {}

        let rowsArray:any = [];

        columns.forEach((column: any) => {
            if(column.type === "String"){
                schema[column.name] = { prop: column.prop, type: String };
            } else if (column.type === "Number") {
                schema[column.name] = { prop: column.prop, type: Number };
            }
        });

        console.log(filePath)
        await xlsx(filePath, { schema: schema }).then((rows) => {
            rows.rows.map((value) => {
                rowsArray.push(value);
            })
        }).catch((error) => {
            console.error("Error reading file:", error);
        });
        return JSON.stringify(rowsArray);
    });
})