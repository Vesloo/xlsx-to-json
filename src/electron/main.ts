import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import xlsx from 'read-excel-file/node';
import { getPreloadPath } from "./pathResolver.js";

type test = string 

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    console.log(getPreloadPath())
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));


    ipcMain.handle('parse-xlsx', async (event, filePath) => {
        event.preventDefault();

        let rowsArray:any = [];

        const leadsSchema = {
            'Brand': { prop: 'brandName', type: String },
            'Count of Leads': { prop: 'countOfLeads', type: Number },
            'Count of FTD date': { prop: 'countOfFtd', type: Number },
            'CR': { prop: 'conversionRate', type: Number },
        };

        console.log(filePath)
        await xlsx(filePath, { schema: leadsSchema }).then((rows) => {
            rows.rows.map((value) => {
                if(value.brandName === "brand_" || value.brandName === "country_") 
                    rowsArray = rowsArray;
                else
                    rowsArray.push(value);
            })
        }).catch((error) => {
            console.error("Error reading file:", error);
        });
        return JSON.stringify(rowsArray);
    });
})