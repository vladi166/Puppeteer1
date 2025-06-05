let page;

describe("Github page tests", () => {
  
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  afterEach(async () => {
    await page.close();
  });
  
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Build and ship software on a single, collaborative platform · GitHub"
    );
  },20000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) =>
      link.textContent.trim()
    );
    expect(actual).toContain("Get started with Team");
  }, 10000);
});

describe("Additional GitHub pages", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  test("Copilot", async () => {
    await page.goto("https://github.com/features/copilot");
    const title = await page.title();
    expect(title).toContain("GitHub Copilot · Your AI pair programmer · GitHub");
  }, 10000);

  test("GitHub sponsors page has correct title", async () => {
    await page.goto("https://github.com/sponsors");
    const title = await page.title();
    expect(title).toContain("GitHub Sponsors");
  }, 10000);

  test("Check Pricing page", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 10000);
});


