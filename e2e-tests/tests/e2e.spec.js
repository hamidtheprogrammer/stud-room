// @ts-check
import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Login" }).click();

  // Expects page to have a heading with the name of Login.
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("arthur@gmail.com");
  await page.locator("[name=password]").fill("Arthur1234");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("login successful")).toBeVisible();
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");
// });
