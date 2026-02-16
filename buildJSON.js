const cheerio = require('cheerio'); 
const fs = require('fs'); 

const $ = cheerio.load(fs.readFileSync('./dist/index.html'));


function buildJSON() {
    //step 1 select elements by attribute: data-tr
    const wordsTr = [];
    $("[data-tr]").each(function () {
        const value = $(this).text()
        let key = $(this)[0].attribs['data-tr']; 
        wordsTr.push({
            [key]: value
        })
    })
    // console.log(wordsTr);
    //step 2 transform in json
    const myJson = Object.assign({}, ...wordsTr)
    const json = JSON.stringify(myJson);

    //step 3 write in file
    fs.writeFile("./src/lang/trans.json", json, function (err) {
        if (err) throw err;
        console.log('complete');
    }
    );
}
buildJSON();