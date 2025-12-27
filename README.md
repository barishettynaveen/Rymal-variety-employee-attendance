# Rymal Variety - Employee Attendance System

A professional shift-based employee attendance tracking system with Punch In/Punch Out functionality for Rymal Variety.

📱 **Can be installed as a mobile app!** See [INSTALL-MOBILE.md](INSTALL-MOBILE.md) for installation instructions.

## Features

### Core Features
- **Welcome Message**: "Welcome to Rymal Variety" banner
- **Live Sidebar**: Real-time clock, current date, and active shift indicator
- **Two Working Shifts**:
  - Morning Shift: 7:00 AM - 2:00 PM
  - Evening Shift: 2:00 PM - 10:00 PM
- **Punch In/Punch Out System**: Time-stamped attendance tracking
- **Shift-Based Management**: Assign employees to specific shifts
- **Pre-loaded Employees**: 4 default employees (Naveen, Damini, Muskan, Lina)
- **Add Unlimited Employees**: Add new employees with shift assignment
- **Real-Time Statistics**: Track punched in/out employees
- **Attendance History**: View detailed punch records for any date
- **Export to CSV**: Download attendance data
- **Delete Employees**: Remove employees from the system

### Technical Features
- **Progressive Web App (PWA)**: Install on mobile devices like a native app
- **Offline Support**: Works without internet after installation
- **Data Persistence**: All data stored locally in browser
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Fullscreen Mode**: Runs like a native app on mobile devices
- **Live Clock**: Updates every second
- **Auto Shift Detection**: Automatically shows current active shift

## How to Use

### On Laptop/Desktop

**Option 1: GitHub Pages (Recommended)**
1. Visit: `https://barishettynaveen.github.io/Rymal-variety-employee-attendance/`
2. The app will load automatically

**Option 2: Local Server**
1. Download or clone the repository
2. Open terminal in the project folder
3. Run a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # or Python 3
   python3 -m http.server 8000

   # Using Node.js
   npx serve

   # Using PHP
   php -S localhost:8000
   ```
4. Open browser and go to: `http://localhost:8000`

**Important**: Don't open `index.html` directly by double-clicking! Use a local server or GitHub Pages.

### On Mobile (Android/iOS)

See [INSTALL-MOBILE.md](INSTALL-MOBILE.md) for detailed installation instructions.

Quick steps:
1. Open the GitHub Pages URL in Safari (iOS) or Chrome (Android)
2. Tap "Add to Home Screen" or "Install"
3. Use like a native app!

## Using the App

### Dashboard (Main Screen)
- **Sidebar** shows:
  - Live clock and current date
  - Current active shift
  - Today's statistics (Total employees, Punched in, Punched out)
  - Navigation buttons

### Punch In/Out
1. Click the **Attendance** tab in the sidebar
2. Find the employee card
3. Click **Punch In** when they arrive
4. Click **Punch Out** when they leave
5. Times are recorded automatically

### Adding New Employees
1. Click the **Add Employee** tab in the sidebar
2. Enter employee name
3. Select their shift (Morning or Evening)
4. Click **Add Employee**

### Viewing History
1. Click the **History** tab in the sidebar
2. Select a date using the date picker
3. View all punch in/out records for that date
4. Click **Export Data** to download CSV

### Shift Information
- **Morning Shift**: 7:00 AM - 2:00 PM (shown in blue)
- **Evening Shift**: 2:00 PM - 10:00 PM (shown in purple)
- Sidebar automatically highlights the current active shift

## Technical Details

### Files
- `index.html` - Main application with sidebar and sections
- `styles.css` - Professional styling and responsive design
- `script.js` - Shift-based attendance logic and punch in/out functionality
- `manifest.json` - PWA configuration for mobile installation
- `service-worker.js` - Enables offline functionality
- `icon.svg` - App icon (vector format)
- `generate-icons.html` - Tool to create PNG icons for mobile

### Data Storage
The application uses browser's localStorage to store:
- Employee list with shift assignments
- Daily punch in/out records with timestamps
- Attendance history

### Browser Compatibility
Works on all modern browsers that support:
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6
- localStorage API
- Service Workers (for PWA features)

**Recommended Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### App Not Opening on Laptop

**Problem**: Page is blank or not loading

**Solutions**:
1. **Use a local server** - Don't open index.html directly
   ```bash
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000`

2. **Use GitHub Pages** - Access the live version at:
   ```
   https://barishettynaveen.github.io/Rymal-variety-employee-attendance/
   ```

3. **Clear Browser Cache**:
   - Chrome: Ctrl+Shift+Delete → Clear cached images and files
   - Firefox: Ctrl+Shift+Delete → Cached Web Content
   - Safari: Cmd+Option+E

4. **Check Browser Console** (F12):
   - Look for errors
   - Make sure JavaScript is enabled

### Data Not Saving

**Problem**: Attendance records disappear after closing browser

**Solutions**:
- Don't use incognito/private mode
- Check if localStorage is enabled
- Don't clear browser data frequently
- Use the same browser and device

### Mobile Installation Issues

See [INSTALL-MOBILE.md](INSTALL-MOBILE.md) for mobile-specific troubleshooting.

## Default Employees

The app comes with 4 pre-loaded employees:
- **Naveen** - Morning Shift (7:00 AM - 2:00 PM)
- **Damini** - Evening Shift (2:00 PM - 10:00 PM)
- **Muskan** - Morning Shift (7:00 AM - 2:00 PM)
- **Lina** - Evening Shift (2:00 PM - 10:00 PM)

You can add unlimited additional employees with your preferred shift assignments.

## Data Management

### Exporting Data
1. Go to **History** tab
2. Select the date
3. Click **Export Data**
4. CSV file will download with format:
   ```
   Employee Name, Shift, Punch In, Punch Out
   ```

### Clearing All Data
1. Go to **History** tab
2. Click **Clear All Data**
3. Confirm twice (this is permanent!)
4. App resets to default state

## Notes

- Each browser/device maintains separate data
- Data is stored locally only (no cloud sync)
- All times are based on your device's clock
- Punch times are recorded in HH:MM format (24-hour)
- Employees can only punch in once per day
- Employees must punch in before punching out

## Support

For issues or questions:
- Check the Troubleshooting section above
- Ensure you're using a supported browser
- Try clearing cache and reloading
- Contact Rymal Variety management team

---

**Rymal Variety Employee Attendance System** - Professional, Accurate, Reliable
