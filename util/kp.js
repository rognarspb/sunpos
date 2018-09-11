const axios = require('axios');
const moment = require('moment');
const kpUrl = 'http://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt';


class KpIndexData {
    constructor(strName){
        this.name = strName;
        this.indices = [];
    }
}

function ExtractKpIndices(strData, offset, name){
    const ixCount = 8;
    let kpData = new KpIndexData(name);
    for(let i=offset; i < offset + 2*ixCount; i+=2){
        let kpIndex = Number.parseInt(strData[i] + strData[i+1]);
        kpData.indices.push(kpIndex);
    }
    return kpData;
}

function ParseKpDataLine(strData){
    let result = [];

    result.push(ExtractKpIndices(strData, 17, "Middle Latitude"));
    result.push(ExtractKpIndices(strData, 17 + 23, "High Latitude"));
    result.push(ExtractKpIndices(strData, 17 + 46, "Estimated"));
    return result;
}

function DisplayKpIndex(kpDataArray){
    console.log("Displaying KpIndex...")
    const periods = [
        "00:00 - 03:00",
        "03:00 - 06:00",
        "06:00 - 09:00",
        "09:00 - 12:00",
        "12:00 - 15:00",
        "15:00 - 18:00",
        "18:00 - 21:00",
        "21:00 - 24:00",
    ];

    for(let ix=0; ix < kpDataArray.length; ix++){
        let kpData = kpDataArray[ix];
        console.log(`\n${kpData.name}`)
        for(let i=0; i < kpData.indices.length; i++){
            console.log(`Kp index [${periods[i]}] = ${kpData.indices[i]}`);
        }
            
    }
}

function ParseKpData(arrLines) {
    let strDate = moment().format('YYYY MM DD');
    console.log(`Reading Kp index for today: '${strDate}'`);
    
    for(let ix=0; ix < arrLines.length; ix++){
        if(arrLines[ix].startsWith(strDate)){
            var parsed = ParseKpDataLine(arrLines[ix]);
            DisplayKpIndex(parsed);
        }
    }
}

function DownloadKpData(callback){
    axios.get(kpUrl)
    .then(response => {
        console.log("Data retrieved success");
        let lines = response.data.toString().split('\n');
        if (callback)
            callback(lines);
    });
}

DownloadKpData(ParseKpData);