#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("check-bundle")
  .description("Check the bundle size and dependency count of an npm package")
  .argument("<package>", "name of the npm package to check")
  .action(async (packageName) => {
    await checkPackage(packageName);
  });

program.parse();

async function checkPackage(packageName) {
  console.log(chalk.gray(`Checking ${packageName}...`));

  try {
    const registryRes = await fetch(`https://registry.npmjs.org/${packageName}`);
    if (!registryRes.ok) {
      console.log(chalk.red(`✖ Package "${packageName}" not found on npm.`));
      return;
    }
    const registryData = await registryRes.json();
    const latestVersion = registryData["dist-tags"]?.latest;

    const sizeRes = await fetch(`https://bundlephobia.com/api/size?package=${packageName}`);
    if (!sizeRes.ok) {
      console.log(chalk.red(`✖ Could not fetch size data for "${packageName}".`));
      return;
    }
    const sizeData = await sizeRes.json();

    const minified = (sizeData.size / 1024).toFixed(1);
    const gzipped = (sizeData.gzip / 1024).toFixed(1);
    const dependencyCount = sizeData.dependencySizes?.length ?? 0;

    console.log("");
    console.log(chalk.bold(`${packageName}@${latestVersion}`));
    console.log(`Minified:     ${formatSize(minified)}`);
    console.log(`Gzipped:      ${formatSize(gzipped)}`);
    console.log(`Dependencies: ${dependencyCount}`);
    console.log("");
  } catch (err) {
    console.log(chalk.red(`✖ Something went wrong: ${err.message}`));
  }
}

function formatSize(kb) {
  const size = parseFloat(kb);
  if (size < 20) return chalk.green(`${kb} KB`);
  if (size < 100) return chalk.yellow(`${kb} KB`);
  return chalk.red(`${kb} KB`);
}