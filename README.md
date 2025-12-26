# Rymal Variety - Employee Attendance System

A simple and user-friendly web-based employee attendance tracking system for Rymal Variety.

## Features

- **Pre-loaded Employees**: Comes with 4 default employees (Naveen, Damini, Muskan, and Lina)
- **Add New Employees**: Easily add new employees to the system
- **Mark Attendance**: Mark employees as Present or Absent for each day
- **Attendance Summary**: View real-time summary of today's attendance
- **Attendance History**: Check attendance records for any date
- **Delete Employees**: Remove employees from the system
- **Data Persistence**: All data is stored locally in your browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use

### Getting Started

1. Open `index.html` in your web browser
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
