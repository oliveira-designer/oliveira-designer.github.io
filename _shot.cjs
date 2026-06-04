const { chromium } = require('playwright-core');
const path = require('path');
(async () => {
  const url = 'file://' + path.resolve(__dirname, 'case-studies/dotz.html').replace(/\\/g, '/');
  let browser;
  for (const opt of [{ channel: 'chrome' }, { channel: 'msedge' }, {}]) {
    try { browser = await chromium.launch(opt); break; } catch {}
  }
  if (!browser) process.exit(2);

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Scroll to Challenges section
  await page.evaluate(() => document.getElementById('challenges')?.scrollIntoView());
  await page.waitForTimeout(400);

  // Click the first zoomable image
  await page.click('.is-zoomable');
  await page.waitForTimeout(600); // let the transition finish

  await page.screenshot({ path: '_lightbox.png', fullPage: false });
  await browser.close();
  console.log('OK');
})();
