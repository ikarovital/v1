async function screenshotAndAttach(page, $testInfo, fileName, { fullPage = true } = {}) {
  const path = $testInfo.outputPath(fileName);
  await page.screenshot({ path, fullPage });

  // playwright-bdd injeta $testInfo; nele existe attach() para conectar arquivos ao Allure
  if ($testInfo && typeof $testInfo.attach === "function") {
    await $testInfo.attach(fileName, { path, contentType: "image/png" });
  }

  return path;
}

module.exports = { screenshotAndAttach };

