const axios = require('axios');
const moment = require('moment');
const kpUrl = 'http://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt';

class KpIndex{
   
    constructor(val, startPeriod){
        const periodLength = 3;
        this.value = val;
        this.startPeriod = startPeriod;
        this.endPeriod = this.startPeriod + periodLength;
    }
} 

class KpIndexData {
    constructor(strName){
        this.name = strName;
        this.indices = [];
    }
}

class KpIndexParser{
    constructor(strData){
        this.strData = strData;
        this.arrLines = strData.split('\n');
    }

    extractKpIndices(strData, offset, name){
        const ixCount = 8;
        const periods = [0,3,6,9,12,15,18,21];
        let kpData = new KpIndexData(name);
        let index = 0;
        for(let i=offset; i < offset + 2*ixCount; i+=2){
            let kpIndexValue = Number.parseInt(strData[i] + strData[i+1]);
            let periodStart = periods[index++];
            kpData.indices.push(new KpIndex(kpIndexValue,periodStart));
        }
        return kpData;
    }

    parseKpDataLine(strData){
        let result = [];
        const startOffset = 17;
        const dataBlockLength = 23

        result.push(this.extractKpIndices(strData, startOffset, "Middle Latitude"));
        result.push(this.extractKpIndices(strData, startOffset + dataBlockLength, "High Latitude"));
        result.push(this.extractKpIndices(strData, startOffset + 2*dataBlockLength, "Estimated"));
        return result;    
    }

    parseDate(date) {
        let strDate = moment(date).format('YYYY MM DD');
        console.log(`Reading Kp index for date: '${strDate}'`);
        
        for(let ix=0; ix < this.arrLines.length; ix++){
            if(this.arrLines[ix].startsWith(strDate)){
                var parsed = this.parseKpDataLine(this.arrLines[ix]);
                return parsed;
            }
        }
        return null; // date not found    
    }
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
            let periodStart = `${kpData.indices[i].startPeriod.toString().padStart(2,'0')}:00`;
            let periodEnd = `${kpData.indices[i].endPeriod.toString().padStart(2,'0')}:00`;
            console.log(`Kp index [${periodStart}-${periodEnd}] = ${kpData.indices[i].value}`);
        }
            
    }
}


function DownloadKpData(callback){
    axios.get(kpUrl)
    .then(response => {
        console.log("Data retrieved success");
        //let lines = response.data.toString().split('\n');
        if (callback)
            callback(response.data.toString());
    });
}

DownloadKpData((strData) => {
    let parser = new KpIndexParser(strData);
    let date = new Date();
    let kpDataArray = parser.parseDate(date);
    DisplayKpIndex(kpDataArray);
});