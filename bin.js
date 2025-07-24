#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

function getPlatformBinary() {
  const platform = process.platform;
  const arch = process.arch;

  let binaryName = `git-dir-${platform}-${arch}`;

  // Windows 需要 .exe 扩展名
  if (platform === "win32") {
    binaryName += ".exe";
  }

  return path.join(__dirname, "bin", binaryName);
}

function main() {
  const binaryPath = getPlatformBinary();

  // 检查二进制文件是否存在
  if (!fs.existsSync(binaryPath)) {
    console.error(
      `Binary not found for platform ${process.platform}-${process.arch}: ${binaryPath}`
    );
    console.error("Please check if the package was installed correctly.");
    process.exit(1);
  }

  // 执行二进制文件并传递所有参数
  const args = process.argv.slice(2);
  const child = spawn(binaryPath, args, {
    stdio: "inherit",
    windowsHide: false,
  });

  child.on("close", (code) => {
    process.exit(code);
  });

  child.on("error", (err) => {
    console.error("Failed to start binary:", err);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}

module.exports = { getPlatformBinary };
