<template>
  <div>
    <h1>Zitate</h1>
    <ul>
      <li v-for="(quote, index) in quotes" :key="index">
        <div>
          <strong>{{ quote.titel }}</strong>
          <p>Tag: {{ quote.tag }}</p>
          <p>Ort: {{ quote.ort }}</p>
          <p>Zeit: {{ quote.zeit }}</p>
          <p>Zeitraum: {{ quote.zeitraum }}</p>
          <p>Leitung: {{ quote.leitung }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const puppeteer = require('puppeteer');

export default {
  data() {
    return {
      quotes: []
    };
  },
  methods: {
    async scrapeData() {
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
        }, this.cleanText(link.text));

        this.quotes = this.quotes.concat(quotes);
      }

      await browser.close();
    },
    cleanText(text) {
      return text.replace(/\s*[(*].*/, '').trim();
    }
  },
  mounted() {
    this.scrapeData();
  }
};
</script>
