
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const LOGO_MAIN = path.join(PUBLIC_DIR, 'logo-main.png');
const LOGO_SYMBOL = path.join(PUBLIC_DIR, 'logo-main-symbol.png');

async function generateBranding() {
    console.log('Starting branding generation...');

    if (!fs.existsSync(LOGO_MAIN)) {
        console.error('Error: logo-main.png not found in public directory.');
        process.exit(1);
    }
    if (!fs.existsSync(LOGO_SYMBOL)) {
        console.error('Error: logo-main-symbol.png not found in public directory.');
        process.exit(1);
    }

    try {
        // 1. Generate Favicons from Symbol
        console.log('Generating favicons from symbol...');

        // favicon-16x16.png
        await sharp(LOGO_SYMBOL)
            .resize(16, 16)
            .toFile(path.join(PUBLIC_DIR, 'favicon-16x16.png'));

        // favicon-32x32.png
        await sharp(LOGO_SYMBOL)
            .resize(32, 32)
            .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));

        // android-chrome-192x192.png
        await sharp(LOGO_SYMBOL)
            .resize(192, 192)
            .toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'));

        // android-chrome-512x512.png
        await sharp(LOGO_SYMBOL)
            .resize(512, 512)
            .toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'));

        // apple-touch-icon.png (180x180)
        await sharp(LOGO_SYMBOL)
            .resize(180, 180)
            .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));

        // favicon.ico (Multiple sizes if possible, but sharp simply converts to ico or we rename png? 
        // Sharp can output to .ico if format is specified, or we use a library. 
        // Simplest reliable way for ico with sharp: resize to 32x32 and save as ico, 
        // but sharp might not support ico output directly in older versions without libvips support.
        // We will try saving as .ico. If it fails, we will copy 32x32 png to favicon.ico (browsers support png as ico often).
        try {
            await sharp(LOGO_SYMBOL)
                .resize(32, 32)
                .toFormat('ico')
                .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
        } catch (e) {
            console.warn('Could not save directly as ICO (might lack support), saving as PNG and renaming...');
            // Fallback: CP existing 32x32
            fs.copyFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), path.join(PUBLIC_DIR, 'favicon.ico'));
        }

        // 2. Generate Header Logo from Main
        console.log('Generating header logo...');
        // Height 160px (for 80px display on retina), auto width
        await sharp(LOGO_MAIN)
            .resize({ height: 160 })
            .toFile(path.join(PUBLIC_DIR, 'logo-header.png'));

        console.log('Branding generation complete!');

    } catch (error) {
        console.error('Error generating branding:', error);
        process.exit(1);
    }
}

generateBranding();
