const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors'); // Import CORS

const app = express();
const port = 5173;

app.use(cors()); // Use CORS middleware

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://sport.htw-berlin.de/angebote/aktueller_zeitraum/index.html');
    await page.waitForSelector('dd');

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

    let quotesArray = [];

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
                    titel: text,
                    tag: quoteTag,
                    ort: quoteOrt,
                    zeit: quoteZeit,
                    zeitraum: quoteZeitraum,
                    leitung: quoteLeitung,
                });
            }
            return quoteArray;
        }, cleanText(link.text));

        quotesArray = quotesArray.concat(quotes);
    }

    await browser.close();
    return quotesArray;
}

function cleanText(text) {
    return text.replace(/\s*[(*].*/, '').trim();
}

app.get('/api/quotes', async (req, res) => {
    try {
        const quotes = await scrapeData();
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
