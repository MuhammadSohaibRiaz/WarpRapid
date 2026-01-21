const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    { name: 'symbol-blue.png', width: 128 },
    { name: 'header-logo-blue.png', width: 300 },
    { name: 'symbol-white.png', width: 128 },
    { name: 'header-logo-white.png', width: 300 }
];

const publicDir = path.join(__dirname, 'public');

async function optimize() {
    for (const img of images) {
        const filePath = path.join(publicDir, img.name);
        if (fs.existsSync(filePath)) {
            console.log(`Optimizing ${img.name}...`);
            const buffer = await sharp(filePath)
                .resize(img.width)
                .png({ quality: 80, compressionLevel: 9 })
                .toBuffer();

            fs.writeFileSync(filePath, buffer);
            console.log(`✓ ${img.name} optimized. New size: ${Math.round(buffer.length / 1024)} KB`);
        }
    }
}

optimize().catch(console.error);
