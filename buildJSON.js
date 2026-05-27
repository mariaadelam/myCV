const cheerio = require('cheerio'); //cheerio is a library that allows us to parse and manipulate HTML documents in a similar way to jQuery. 
const fs = require('fs');

const $ = cheerio.load(fs.readFileSync('./dist/index.html')); //load the HTML file into cheerio


function buildJSON() {
    //step 1 select elements by attribute: data-tr
    const wordsTr = []; //create an empty array to store the key-value pairs
    $("[data-tr]").each(function () {
        const value = $(this).html() //get the inner HTML of the element and use it as the value in the JSON object
        let key = $(this)[0].attribs['data-tr']; //get the value of the data-tr attribute and use it as the key in the JSON object
        wordsTr.push({
            [key]: value
        })
    });

    $("[data-attr-tr]").each(function () {
        const value = $(this)[0].attribs['data-typed-items']
        const value2 = $(this)[0].attribs['placeholder']
        console.log(value2);
        if (value !== undefined) {
            let key = $(this)[0].attribs['data-attr-tr'];
            wordsTr.push({
                [key]: value
            })
        }
        if (value2 !== undefined) {
            let key = $(this)[0].attribs['data-attr-tr'];
            wordsTr.push({
                [key]: value2
            })
        }

    });
    // console.log(wordsTr);
    //step 2 transform in json
    const myJson = Object.assign({}, ...wordsTr) //use Object.assign to merge all the objects in the wordsTr array into a single object, 
                                                    // which will be the final JSON object
    const json = JSON.stringify(myJson);



    //step 3 write in file
    fs.writeFile("./src/lang/trans.json", json, function (err) {
        if (err) throw err;
        console.log('complete');
    }
    );
}
buildJSON();