const puppet = require('puppeteer');
async function scraper(arr) {
    console.log("scraper launched")
    const browser = await puppet.launch();
    console.log("puppet launched")
    const page = await browser.newPage();
    console.log("page launched")
    var csv = "Name,Tagline,Technologies,Topics"+"\n";
    for(let i = 0;i<arr.length;i++) {
        await page.goto(`https://summerofcode.withgoogle.com${arr[i]}`,{
            waitUntil: "networkidle0"
        });
        console.log(`${i}/${arr.length} https://summerofcode.withgoogle.com${arr[i]}`)
        csv = csv + await page.evaluate(() => {
            let temp = "";
            let items = document.getElementsByClassName("title");
            if(items[0]) {
                temp +=items[0].innerText.replaceAll(","," -").trim()+",";
            } else {
                temp += `"",`
            }
            items = document.getElementsByTagName("p");
            if(items[1]) {
                temp +=items[1].innerText.replaceAll(","," -").trim()+",";
            } else {
                temp += `"",`
            }
            items = document.getElementsByClassName("tech__content");
            if(items[0]) {
                temp +=items[0].innerText.replaceAll(","," -").trim()+",";
            } else {
                temp += `"",`
            }
            items = document.getElementsByClassName("topics__content");
            if(items[0]) {
                temp +=items[0].innerText.replaceAll(","," -").trim()+"\n";
            } else {
                temp += `""
                `
            }
            return temp;
        })
    }
    browser.close();
    return csv;
}
module.exports = scraper;