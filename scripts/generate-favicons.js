const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');
  const logosDir = path.join(publicDir, 'logos');
  const svgPath = path.join(publicDir, 'tree-icon.svg');
  
  if (!fs.existsSync(svgPath)) {
    console.error('tree-icon.svg not found in public directory');
    return;
  }

  // Ensure logos directory exists
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
  }

  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate apple-touch-icon.png (180x180 for iOS)
    console.log('Generating apple-touch-icon.png...');
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    // Generate favicon.png (32x32)
    console.log('Generating favicon.png...');
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));
    
    // Generate favicon-16x16.png
    console.log('Generating favicon-16x16.png...');
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    
    // Generate favicon-32x32.png
    console.log('Generating favicon-32x32.png...');
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    
    // Generate PWA logo files
    const logoSizes = [48, 192, 512, 1024];
    for (const size of logoSizes) {
      console.log(`Generating logo-${size}.png...`);
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(logosDir, `logo-${size}.png`));
    }
    
    // Generate proper ICO file with multiple sizes
    console.log('Generating proper favicon.ico with multiple sizes...');
    const icoSizes = [16, 32, 48];
    const pngBuffers = [];
    
    for (const size of icoSizes) {
      console.log(`Generating ${size}x${size} PNG for ICO...`);
      const buffer = await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer();
      pngBuffers.push(buffer);
    }
    
    // Create proper ICO file with multiple sizes
    const icoBuffer = await toIco(pngBuffers);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    
    console.log('✅ All favicon and logo files generated successfully!');
    console.log('Generated files:');
    console.log('- apple-touch-icon.png (180x180)');
    console.log('- favicon.png (32x32)');
    console.log('- favicon-16x16.png');
    console.log('- favicon-32x32.png');
    console.log('- favicon.ico (with 16x16, 32x32, 48x48 sizes)');
    console.log('- logos/logo-48.png');
    console.log('- logos/logo-192.png');
    console.log('- logos/logo-512.png');
    console.log('- logos/logo-1024.png');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
