#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function getPlatformBinary() {
  const platform = process.platform;
  const arch = process.arch;

  let binaryName = `git-dir-${platform}-${arch}`;

  // Windows 需要 .exe 扩展名
  if (platform === "win32") {
    binaryName += ".exe";
  }

  return binaryName;
}

function main() {
  const binaryName = getPlatformBinary();
  const sourcePath = path.join(__dirname, "dist", binaryName);
  const binDir = path.join(__dirname, "bin");
  const targetPath = path.join(binDir, binaryName);

  // 创建 bin 目录
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  // 检查源文件是否存在
  if (!fs.existsSync(sourcePath)) {
    console.error(
      `Binary not found for platform ${process.platform}-${process.arch}: ${sourcePath}`
    );
    console.error("This platform may not be supported.");
    process.exit(1);
  }

  // 复制二进制文件
  try {
    fs.copyFileSync(sourcePath, targetPath);
    // 给二进制文件添加执行权限 (Unix-like 系统)
    if (process.platform !== "win32") {
      fs.chmodSync(targetPath, 0o755);
    }
    console.log(`Installed binary for ${process.platform}-${process.arch}`);
  } catch (error) {
    console.error("Failed to install binary:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
