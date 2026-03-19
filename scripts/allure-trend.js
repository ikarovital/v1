const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = process.cwd();
const allureReportHistoryDir = path.join(root, "allure-report", "history");
const allureResultsHistoryDir = path.join(root, "allure-results", "history");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyDir(srcDir, dstDir) {
  if (!fs.existsSync(srcDir)) {
    return false;
  }

  ensureDir(dstDir);
  fs.cpSync(srcDir, dstDir, { recursive: true, force: true });
  return true;
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

// Reaproveita trend da execução anterior, se existir
copyDir(allureReportHistoryDir, allureResultsHistoryDir);

// Gera novo relatório com o history embutido
run("npm", ["run", "allure:generate"]);

// Mantém history atualizado para a próxima execução local
copyDir(allureReportHistoryDir, allureResultsHistoryDir);

