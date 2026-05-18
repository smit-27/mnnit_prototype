import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });

  console.log('Checking /banking/transfer...');
  await page.goto('http://localhost:5173/banking/transfer', { waitUntil: 'networkidle2' });
  
  console.log('Checking /analyst...');
  await page.goto('http://localhost:5173/analyst', { waitUntil: 'networkidle2' });

  await browser.close();
})();
