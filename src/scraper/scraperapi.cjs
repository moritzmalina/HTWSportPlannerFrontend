const puppeteer = require('puppeteer');

function cleanText(text) {
    // Verwende einen regulären Ausdruck, um den Text zu bereinigen und nur den Teil vor '(' oder '*' zu behalten
    return text.replace(/\s*[(*].*/, '').trim();
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Seite aufrufen
    await page.goto('https://sport.htw-berlin.de/angebote/aktueller_zeitraum/index.html');

    // Wartezeit, um sicherzustellen, dass alle Elemente geladen sind
    await page.waitForSelector('dd');

    // Verwende querySelectorAll, um alle <dd> Elemente zu erhalten, die Links enthalten
    const links = await page.evaluate(() => {
        const ddElements = document.querySelectorAll('dd');
        const linkList = [];
        ddElements.forEach((element) => {
            const link = element.querySelector('a');
            if (link && link.innerText !== 'RESTPLÄTZE - alle freien Kursplätze dieses Zeitraums') {
                linkList.push({
                    href: link.getAttribute('href'),
                    text: link.innerText
                });
            }
        });
        return linkList;
    });

    // Durchläuft jeden Link und führt die Abfrage aus
    for (const link of links) {
        await page.goto(`https://sport.htw-berlin.de/angebote/aktueller_zeitraum/${link.href}`);

        const quotes = await page.evaluate((text) => {
            const quoteElements = document.querySelectorAll('.bs_even, .bs_odd');
            const quoteArray = [];
            for (const quoteElement of quoteElements) {
                const quoteTag = quoteElement.querySelector(".bs_stag").innerText;
                const quoteOrt = quoteElement.querySelector(".bs_sort").innerText;
                const quoteZeit = quoteElement.querySelector(".bs_szeit").innerText;
                const quoteZeitraum = quoteElement.querySelector(".bs_szr").innerText;
                const quoteLeitung = quoteElement.querySelector(".bs_skl").innerText;
                quoteArray.push({
                    titel: text, // Fügt den Text, Titel der Sportart aus der oberen Abfrage hinzu
                    tag: quoteTag,
                    ort: quoteOrt,
                    zeit: quoteZeit,
                    zeitraum: quoteZeitraum,
                    leitung: quoteLeitung,
                });
            }
            return quoteArray;
        }, cleanText(link.text)); // Bereinigten Text als Argument übergeben

        return quotes;
    }

    await browser.close();
})();

export