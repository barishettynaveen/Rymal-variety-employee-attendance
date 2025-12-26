// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize default employees and load data
function initializeApp() {
    // Check if employees exist in localStorage
    let employees = getEmployees();

    // If no employees exist, add default employees
    if (employees.length === 0) {
        const defaultEmployees = ['Naveen', 'Damini', 'Muskan', 'Lina'];
        defaultEmployees.forEach(name => {
            employees.push({
                id: generateId(),
                name: name
            });
        });
        saveEmployees(employees);
    }

    // Display current date
    updateCurrentDate();

    // Load and display employees
    displayEmployees();

    // Update summary
    updateSummary();

    // Set today's date in history date picker
    document.getElementById('historyDate').valueAsDate = new Date();
    loadHistory();
}

// Update current date display
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    dateElement.textContent = today;
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get employees from localStorage
function getEmployees() {
    const employees = localStorage.getItem('employees');
    return employees ? JSON.parse(employees) : [];
}

// Save employees to localStorage
function saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Get attendance for a specific date
function getAttendance(date) {
    const dateKey = formatDateKey(date);
    const attendance = localStorage.getItem(`attendance_${dateKey}`);
    return attendance ? JSON.parse(attendance) : {};
}

// Save attendance for a specific date
function saveAttendance(date, attendance) {
    const dateKey = formatDateKey(date);
    localStorage.setItem(`attendance_${dateKey}`, JSON.stringify(attendance));
}

// Format date as YYYY-MM-DD
function formatDateKey(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Add new employee
function addEmployee() {
    const nameInput = document.getElementById('newEmployeeName');
    const name = nameInput.value.trim();
    const messageDiv = document.getElementById('addMessage');

    if (name === '') {
        showMessage(messageDiv, 'Please enter a valid name', 'error');
        return;
    }

    const employees = getEmployees();

    // Check if employee already exists
    if (employees.some(emp => emp.name.toLowerCase() === name.toLowerCase())) {
        showMessage(messageDiv, 'Employee already exists!', 'error');
        return;
    }

    // Add new employee
    employees.push({
        id: generateId(),
        name: name
    });

    saveEmployees(employees);
    nameInput.value = '';
    showMessage(messageDiv, `${name} added successfully!`, 'success');

    // Refresh display
    displayEmployees();
    updateSummary();
}

// Show message
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = 'block';

    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Display employees
function displayEmployees() {
    const employees = getEmployees();
    const today = new Date();
    const attendance = getAttendance(today);
    const employeeList = document.getElementById('employeeList');

    if (employees.length === 0) {
        employeeList.innerHTML = '<p class="no-history">No employees added yet. Add your first employee above!</p>';
        return;
    }

    employeeList.innerHTML = '';

    employees.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'employee-card';

        const status = attendance[employee.id];
        let statusBadge = '';
        let presentActive = '';
        let absentActive = '';

        if (status === 'present') {
            statusBadge = '<span class="status-badge present">Present</span>';
            presentActive = 'active';
        } else if (status === 'absent') {
            statusBadge = '<span class="status-badge absent">Absent</span>';
            absentActive = 'active';
        } else {
            statusBadge = '<span class="status-badge not-marked">Not Marked</span>';
        }

        card.innerHTML = `
            <div class="employee-info">
                <span class="employee-name">${employee.name}</span>
                ${statusBadge}
            </div>
            <div class="employee-actions">
                <button class="btn-present ${presentActive}" onclick="markAttendance('${employee.id}', 'present')">
                    Present
                </button>
                <button class="btn-absent ${absentActive}" onclick="markAttendance('${employee.id}', 'absent')">
                    Absent
                </button>
                <button class="btn-delete" onclick="deleteEmployee('${employee.id}', '${employee.name}')">
                    Delete
                </button>
            </div>
        `;

        employeeList.appendChild(card);
    });
}

// Mark attendance
function markAttendance(employeeId, status) {
    const today = new Date();
    const attendance = getAttendance(today);

    // Toggle status if clicking the same button
    if (attendance[employeeId] === status) {
        delete attendance[employeeId];
    } else {
        attendance[employeeId] = status;
    }

    saveAttendance(today, attendance);
    displayEmployees();
    updateSummary();
}

// Delete employee
function deleteEmployee(employeeId, employeeName) {
    if (!confirm(`Are you sure you want to delete ${employeeName}?`)) {
        return;
    }

    let employees = getEmployees();
    employees = employees.filter(emp => emp.id !== employeeId);
    saveEmployees(employees);

    displayEmployees();
    updateSummary();
    loadHistory();
}

// Update summary
function updateSummary() {
    const employees = getEmployees();
    const today = new Date();
    const attendance = getAttendance(today);

    const total = employees.length;
    let present = 0;
    let absent = 0;

    employees.forEach(emp => {
        if (attendance[emp.id] === 'present') present++;
        else if (attendance[emp.id] === 'absent') absent++;
    });

    const notMarked = total - present - absent;

    document.getElementById('totalEmployees').textContent = total;
    document.getElementById('presentCount').textContent = present;
    document.getElementById('absentCount').textContent = absent;
    document.getElementById('notMarkedCount').textContent = notMarked;
}

// Load attendance history
function loadHistory() {
    const dateInput = document.getElementById('historyDate');
    const selectedDate = dateInput.value ? new Date(dateInput.value) : new Date();

    const employees = getEmployees();
    const attendance = getAttendance(selectedDate);
    const historyList = document.getElementById('historyList');

    if (employees.length === 0) {
        historyList.innerHTML = '<p class="no-history">No employees to show.</p>';
        return;
    }

    let hasAttendance = false;
    let historyHTML = '<h4>Attendance for ' + selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) + '</h4>';

    employees.forEach(emp => {
        const status = attendance[emp.id];
        if (status) {
            hasAttendance = true;
            const statusClass = status === 'present' ? 'present' : 'absent';
            const statusText = status.charAt(0).toUpperCase() + status.slice(1);

            historyHTML += `
                <div class="history-item">
                    <span>${emp.name}</span>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
            `;
        }
    });

    if (!hasAttendance) {
        historyHTML += '<p class="no-history">No attendance marked for this date.</p>';
    }

    historyList.innerHTML = historyHTML;
}

// Clear all data
function clearAllData() {
    if (!confirm('Are you sure you want to clear all data? This will remove all employees and attendance records. This action cannot be undone!')) {
        return;
    }

    if (!confirm('This is your last warning! All data will be permanently deleted. Continue?')) {
        return;
    }

    localStorage.clear();
    initializeApp();
}

// Allow Enter key to add employee
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('newEmployeeName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addEmployee();
        }
    });
});
