const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function generateFavicons() {
  const svgPath = path.join(
    __dirname,
    "public",
    "images",
    "favicon",
    "32x32.svg"
  );
  const faviconDir = path.join(__dirname, "public", "images", "favicon");

  // Read SVG content
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate PNG versions
  const sizes = [16, 32, 48, 64, 128, 192, 512];

  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(faviconDir, `${size}x${size}.png`));

    console.log(`Generated ${size}x${size}.png`);
  }

  // Generate favicon.ico (multi-size ICO file)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, "public", "favicon.ico"));

  console.log("Generated favicon.ico");

  // Generate apple-touch-icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(faviconDir, "apple-touch-icon.png"));

  console.log("Generated apple-touch-icon.png");

  console.log("All favicons generated successfully!");
}

generateFavicons().catch(console.error);
