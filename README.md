# Rymal Variety - Employee Attendance System

A simple and user-friendly web-based employee attendance tracking system for Rymal Variety.

📱 **Can be installed as a mobile app!** See [INSTALL-MOBILE.md](INSTALL-MOBILE.md) for installation instructions.

## Features

- **Pre-loaded Employees**: Comes with 4 default employees (Naveen, Damini, Muskan, and Lina)
- **Add New Employees**: Easily add new employees to the system
- **Mark Attendance**: Mark employees as Present or Absent for each day
- **Attendance Summary**: View real-time summary of today's attendance
- **Attendance History**: Check attendance records for any date
- **Delete Employees**: Remove employees from the system
- **Data Persistence**: All data is stored locally in your browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **📱 Progressive Web App (PWA)**: Install on mobile devices like a native app
- **Offline Support**: Works without internet connection after installation
- **Fullscreen Mode**: Runs like a native app on mobile devices

## Installation

### For Desktop/Browser Use

1. Open `index.html` in your web browser
2. The app will automatically load with 4 default employees

### For Mobile App Installation

📱 **Want to use this as a mobile app?**

See the detailed installation guide: **[INSTALL-MOBILE.md](INSTALL-MOBILE.md)**

The app can be installed on Android and iOS devices just like a native app!

## How to Use

### Getting Started

1. Open the app in your web browser or mobile device
2. The app will automatically load with 4 default employees

### Adding New Employees

1. Enter the employee name in the "Add New Employee" field
2. Click "Add Employee" button or press Enter
3. The employee will be added to the attendance list

### Marking Attendance

1. For each employee, click either "Present" or "Absent" button
2. The status will be highlighted and saved automatically
3. Click the same button again to unmark the attendance
4. The summary section updates in real-time

### Viewing Attendance History

1. Use the date picker in the "Attendance History" section
2. Select any date to view attendance records for that day
3. The history shows all employees who had their attendance marked on that date

### Managing Employees

- **Delete Employee**: Click the "Delete" button next to any employee to remove them
- **Clear All Data**: Click "Clear All Data" to reset the entire system (requires confirmation)

## Technical Details

### Files

- `index.html` - Main application structure
- `styles.css` - Styling and responsive design
- `script.js` - Application logic and data management
- `manifest.json` - PWA configuration for mobile installation
- `service-worker.js` - Enables offline functionality
- `icon.svg` - App icon (vector format)
- `generate-icons.html` - Tool to create PNG icons for better mobile support

### Data Storage

The application uses browser's localStorage to store:
- Employee list
- Daily attendance records

### Browser Compatibility

Works on all modern browsers that support:
- HTML5
- CSS3
- JavaScript ES6
- localStorage API

## Notes

- Data is stored locally in your browser
- Clearing browser data will delete all records
- No server or internet connection required
- Each device/browser maintains its own separate data

## Support

For any issues or questions, please contact the Rymal Variety management team.

---

**Rymal Variety Employee Attendance System** - Simple, Efficient, Reliable
