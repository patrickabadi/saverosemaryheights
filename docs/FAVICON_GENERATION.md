# Favicon Generation

This document explains how the favicon and logo files are generated for the Save Rosemary Heights website.

## Source File

All favicons and logos are generated from the `public/tree-icon.svg` file, which contains a beautiful tree design that matches the environmental theme of the website.

## Generated Files

The generation script creates the following files:

### Favicon Files
- `favicon.ico` - Multi-size ICO file (16x16, 32x32, 48x48) for browsers
- `favicon.png` - 32x32 PNG fallback
- `favicon-16x16.png` - 16x16 PNG for high DPI displays
- `favicon-32x32.png` - 32x32 PNG for standard displays
- `apple-touch-icon.png` - 180x180 PNG for iOS devices

### PWA Logo Files (in `/logos/` directory)
- `logo-48.png` - 48x48 for small icons
- `logo-192.png` - 192x192 for standard app icons
- `logo-512.png` - 512x512 for large app icons
- `logo-1024.png` - 1024x1024 for high-resolution displays

## Color Scheme

The tree icon uses the following colors that match the website's theme:
- Main canopy: `#34d399` (emerald-400)
- Upper canopy: `#4ade80` (green-400) 
- Tree trunk: `#92400e` (amber-800)
- Tree highlight: `#bbf7d0` (emerald-100)

These colors align with the Tailwind CSS primary color palette defined in `tailwind.config.js`.

## How to Regenerate

To regenerate all favicon and logo files:

```bash
npm run generate-favicons
```

This runs the `scripts/generate-favicons.js` script which:
1. Reads the source SVG file
2. Uses Sharp to resize and convert to various PNG formats
3. Uses to-ico to create a proper multi-size ICO file
4. Saves all files to the appropriate locations

## Dependencies

The generation script requires:
- `sharp` - For image processing and conversion
- `to-ico` - For creating proper ICO files with multiple sizes

Both are included as dev dependencies in `package.json`.

## Integration

The favicons are properly integrated into the Next.js application through:

1. **Metadata in `layout.tsx`** - Defines all favicon references for browsers and devices
2. **Manifest.json** - References PWA logo files for app installation
3. **Automatic optimization** - Next.js automatically optimizes and serves these files

## Browser Support

The generated files provide comprehensive support for:
- Modern browsers (favicon.ico, PNG files)
- iOS devices (apple-touch-icon.png)
- Android devices (PWA logos)
- High DPI displays (multiple sizes)
- Progressive Web App installation
