import { chromium } from "playwright";

const url = process.env.BASE_URL ?? "http://127.0.0.1:8080/";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForSelector(".ascii-logo .ascii-logo__image", { state: "visible", timeout: 30000 });
await page.locator(".ascii-logo").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(600);

const logo = page.locator(".ascii-logo").first();
const textBlock = page.locator(".ascii-logo .ascii-logo__image").first();
const className = await logo.getAttribute("class");
const tagName = await textBlock.evaluate((el) => el.tagName.toLowerCase());
const imageSize = await textBlock.evaluate((el) => {
  const r = el.getBoundingClientRect();
  return { width: Math.round(r.width), height: Math.round(r.height) };
});
const imageStyle = await textBlock.evaluate((el) => {
  const s = getComputedStyle(el);
  return {
    animationName: s.animationName,
    imageRendering: s.imageRendering,
  };
});
const logoStyle = await logo.evaluate((el) => {
  const s = getComputedStyle(el);
  return { animationName: s.animationName };
});

const split = await page.locator(".home-intro-split").count();
const logoCol = await page.locator(".home-intro-split__logo").count();

await browser.close();

const checks = {
  url,
  hasAsciiCrtClass: /\bascii-logo--crt\b/.test(className ?? ""),
  imageIsSvg: tagName === "svg",
  imageSize,
  imageVisible: imageSize.width > 0 && imageSize.height > 0,
  imageIsPixelated: imageStyle.imageRendering === "pixelated",
  imageBootAnimation: imageStyle.animationName !== "none" && imageStyle.animationName !== "",
  preGlowAnimation: logoStyle.animationName,
  homeSplitLayout: split === 1 && logoCol === 1,
};

const ok =
  checks.hasAsciiCrtClass &&
  checks.imageIsSvg &&
  checks.imageVisible &&
  checks.imageIsPixelated &&
  checks.imageBootAnimation &&
  checks.homeSplitLayout;

console.log(JSON.stringify({ ok, checks }, null, 2));
process.exit(ok ? 0 : 1);
