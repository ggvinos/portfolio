import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 390, 768, 1440]) {
  test(`readable layout and project evidence at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Baixar CV", exact: true }).first(),
    ).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    const cards = page.locator("#projects article");
    await expect(cards).toHaveCount(4);
    for (const card of await cards.all()) {
      await expect(card.getByRole("list", { name: "Destaques" })).toBeVisible();
      await expect(card.getByRole("link")).toHaveAttribute(
        "href",
        /^(https:\/\/|\/projetos\/)/,
      );
    }
    expect(
      await page
        .locator("#projects")
        .evaluate((e) => e.getBoundingClientRect().top + window.scrollY),
    ).toBeLessThan(width < 768 ? 3300 : 2900);
    await page.screenshot({ path: `test-results/hero-${width}.png` });
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
  });
}

test("closed mobile menu excludes its links from keyboard focus and Escape closes it", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const language = page.getByRole("button", { name: "Switch to English" });
  await language.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Ver Projetos", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page.getByRole("link", { name: "Experiência", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(page.locator("#mobile-menu")).toBeHidden();
});

test("language switch preserves facts, sets document language and translates actions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#education")).toContainText("Alura");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#education")).toContainText("Alura");
  await expect(page.locator("#education")).not.toContainText("Coursera");
  await expect(page.locator("#writing")).toContainText("Read article");
  await page.getByRole("button", { name: "Mudar para português" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("#writing")).toContainText("Ler artigo");
});

test("case studies and CV are available", async ({ page, request }) => {
  for (const slug of ["qa-dashboard", "flow-cli", "acorde"]) {
    const response = await page.goto(`/projetos/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const report = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(report.violations).toEqual([]);
  }
  const cv = await request.get("/cv-vinicios-ferreira.pdf");
  expect(cv.status()).toBe(200);
  expect(cv.headers()["content-type"]).toContain("application/pdf");
});

test("accessible content on desktop and mobile, including expanded experiences", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page
      .getByRole("button", { name: "Nina Tecnologia QA Engineer", exact: true })
      .click();
    await expect(page.locator("#experiencia-detalhe-0")).toBeVisible();
    const report = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(report.violations).toEqual([]);
  }
});

test("reduced motion and no JavaScript keep project content readable", async ({
  browser,
}) => {
  for (const options of [
    { reducedMotion: "reduce" as const },
    { javaScriptEnabled: false },
  ]) {
    const context = await browser.newContext({
      ...options,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3108/");
    await expect(
      page.getByRole("heading", { name: "QA Metrics Dashboard", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Ver código no GitHub" }),
    ).toBeVisible();
    await page.screenshot({
      path: `test-results/${"javaScriptEnabled" in options ? "no-js" : "reduced-motion"}.png`,
      fullPage: true,
    });
    await context.close();
  }
});
