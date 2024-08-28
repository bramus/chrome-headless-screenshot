import puppeteer from 'puppeteer';

if (!process.argv[2]) {
	console.error('❌ Missing URL');
	process.exit(1);
}

const url = process.argv[2];

const browser = await puppeteer.launch({
	headless: 'new',
	product: 'chrome',
	protocol: 'webDriverBiDi',
	args:[
		"--flag-switches-begin",
		"--enable-experimental-web-platform-features",
		"--flag-switches-end",
	],
});

const page = await browser.newPage();

await page.setViewport({ width: 1280, height: 720 });

await page.goto(url, { waitUntil: 'networkidle0' });

await page.screenshot({
    path: `screenshot-${+new Date()}.jpg`,
});

await browser.close();