# How to Install Rymal Attendance App on Mobile

The Rymal Attendance app is a Progressive Web App (PWA) that can be installed on your mobile device just like a native app from the app store!

## Installation Instructions

### For Android Devices (Chrome/Edge)

1. **Open the App in Browser**
   - Open Chrome or Edge browser on your Android phone
   - Visit the app URL (where you host the app)
   - Or open the `index.html` file directly if hosted on a local server

2. **Install the App**
   - Look for the "Install" or "Add to Home Screen" prompt at the bottom of the screen
   - OR tap the menu (three dots) in the top-right corner
   - Select "Install app" or "Add to Home screen"
   - Confirm by tapping "Install"

3. **Access the App**
   - The app icon will appear on your home screen
   - Tap the icon to open the app just like any other app
   - The app will work offline after installation!

### For iOS Devices (iPhone/iPad - Safari)

1. **Open the App in Safari**
   - Open Safari browser (must be Safari, not Chrome)
   - Visit the app URL
   - Or open the `index.html` file if hosted locally

2. **Add to Home Screen**
   - Tap the "Share" button (square with arrow pointing up) at the bottom
   - Scroll down and tap "Add to Home Screen"
   - Edit the name if you want (default: "Rymal Attendance")
   - Tap "Add" in the top-right corner

3. **Access the App**
   - The app icon will appear on your home screen
   - Tap it to open the app
   - It will look and feel like a native iOS app!

## Hosting Options

To use the app on your mobile device, you need to host it. Here are several options:

### Option 1: GitHub Pages (Recommended - Free & Easy)

1. Push the code to a GitHub repository
2. Go to repository Settings → Pages
3. Select the branch to deploy
4. GitHub will provide a URL like: `https://yourusername.github.io/repo-name`
5. Open this URL on your mobile device and install

### Option 2: Local Network (For Testing)

1. **Start a local server on your computer:**
   ```bash
   # If you have Python installed
   python -m http.server 8000

   # Or if you have Node.js
   npx serve

   # Or if you have PHP
   php -S localhost:8000
   ```

2. **Find your computer's local IP:**
   - Windows: Open Command Prompt, type `ipconfig`, look for IPv4 Address
   - Mac/Linux: Open Terminal, type `ifconfig`, look for inet address
   - Example: 192.168.1.100

3. **On your mobile device:**
   - Connect to the same WiFi network
   - Open browser and go to: `http://YOUR-IP-ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`
   - Install the app using steps above

### Option 3: Free Hosting Services

Host on any of these free services:
- **Netlify** (netlify.com) - Drag & drop folder
- **Vercel** (vercel.com) - Connect GitHub repo
- **Cloudflare Pages** (pages.cloudflare.com)
- **Firebase Hosting** (firebase.google.com)

## Generating App Icons (Optional)

The app includes an SVG icon that works, but for the best experience, generate PNG icons:

1. Open `generate-icons.html` in a web browser
2. Click "Generate Icons" button
3. Download each icon using the download buttons
4. Save them in the same folder as `index.html`

Or use an online tool:
- Visit: https://www.pwabuilder.com/imageGenerator
- Upload the `icon.svg` file
- Download the generated icons
- Place them in the app folder

## Features After Installation

Once installed, the app will:
- ✅ Work offline (after first visit)
- ✅ Appear in your app drawer/home screen
- ✅ Run in fullscreen mode (no browser UI)
- ✅ Store data locally on your device
- ✅ Work like a native app
- ✅ Update automatically when you open it (if online)

## Troubleshooting

### "Install" button doesn't appear
- Make sure you're using HTTPS or localhost
- Try accessing from browser menu → "Install app"
- Clear browser cache and try again

### App won't work offline
- Make sure you opened the app at least once while online
- Check that service worker registered (open browser console, look for success message)

### Icons not showing
- Generate PNG icons using `generate-icons.html`
- Make sure icon files are in the same folder as `index.html`
- The SVG icon should work as a fallback

### Data not saving
- Make sure you haven't disabled localStorage in browser settings
- Don't use private/incognito mode for long-term use

## Uninstalling the App

### Android
- Long press the app icon
- Tap "App info" or drag to "Uninstall"
- Tap "Uninstall"

### iOS
- Long press the app icon
- Tap "Remove App"
- Tap "Delete App"

## Notes

- Data is stored locally on each device separately
- Each device will have its own attendance records
- To sync data across devices, you would need to add a backend server (not included)
- The app works completely offline after installation

## Support

For issues or questions:
- Check that you're using a modern browser (Chrome 90+, Safari 14+, Edge 90+)
- Ensure JavaScript is enabled
- Try clearing browser cache and reinstalling

---

Enjoy using the Rymal Variety Employee Attendance App!
