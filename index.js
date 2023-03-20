const { html1, html2 } = require("./html-strings");
const fs = require("fs");
const scraper = require("./scraper")
let arr = html1.match(/class\s*=\s*"\s*content\s*"\s*href\s*=\s*"\S*"/g).concat(html2.match(/class\s*=\s*"\s*content\s*"\s*href\s*=\s*"\S*"/g));
for (let i = 0; i < arr.length; i++) {
     arr[i] = arr[i].split(`"`)[3];
   }
console.log(arr.length)
scraper(arr).then((csv) => {
    fs.appendFileSync("./GSOC-2023.csv", csv);
    //console.log("Server check "+csv);
});
