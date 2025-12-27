// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    startClock();
    updateCurrentShift();
    setInterval(updateCurrentShift, 60000); // Update shift every minute
});

// Initialize default employees and load data
function initializeApp() {
    let employees = getEmployees();

    // If no employees exist, add default employees with shifts
    if (employees.length === 0) {
        const defaultEmployees = [
            { name: 'Naveen', shift: 'morning' },
            { name: 'Damini', shift: 'evening' },
            { name: 'Muskan', shift: 'morning' },
            { name: 'Lina', shift: 'evening' }
        ];

        defaultEmployees.forEach(emp => {
            employees.push({
                id: generateId(),
                name: emp.name,
                shift: emp.shift
            });
        });
        saveEmployees(employees);
    }

    displayEmployees();
    updateStats();
    document.getElementById('historyDate').valueAsDate = new Date();
    loadHistory();
}

// Live Clock
function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();

    // Update time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;

    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

// Detect and display current shift
function updateCurrentShift() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    const shiftElement = document.getElementById('currentShift');

    if (currentTime >= 7 && currentTime < 14) {
        shiftElement.textContent = 'Morning Shift (7:00 AM - 2:00 PM)';
        shiftElement.style.background = 'rgba(33, 150, 243, 0.3)';
    } else if (currentTime >= 14 && currentTime < 22) {
        shiftElement.textContent = 'Evening Shift (2:00 PM - 10:00 PM)';
        shiftElement.style.background = 'rgba(156, 39, 176, 0.3)';
    } else {
        shiftElement.textContent = 'No Active Shift';
        shiftElement.style.background = 'rgba(255, 255, 255, 0.2)';
    }
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// LocalStorage helpers
function getEmployees() {
    const employees = localStorage.getItem('employees');
    return employees ? JSON.parse(employees) : [];
}

function saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function getAttendance(date) {
    const dateKey = formatDateKey(date);
    const attendance = localStorage.getItem(`attendance_${dateKey}`);
    return attendance ? JSON.parse(attendance) : {};
}

function saveAttendance(date, attendance) {
    const dateKey = formatDateKey(date);
    localStorage.setItem(`attendance_${dateKey}`, JSON.stringify(attendance));
}

function formatDateKey(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Section navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    const sectionMap = {
        'attendance': 'attendanceSection',
        'history': 'historySection',
        'addEmployee': 'addEmployeeSection'
    };

    document.getElementById(sectionMap[sectionName]).classList.add('active');

    // Set active nav button
    event.target.classList.add('active');

    // Reload data if needed
    if (sectionName === 'history') {
        loadHistory();
    }
}

// Add employee
function addEmployee() {
    const nameInput = document.getElementById('newEmployeeName');
    const shiftSelect = document.getElementById('employeeShift');
    const name = nameInput.value.trim();
    const shift = shiftSelect.value;
    const messageDiv = document.getElementById('addMessage');

    if (name === '') {
        showMessage(messageDiv, 'Please enter employee name', 'error');
        return;
    }

    if (shift === '') {
        showMessage(messageDiv, 'Please select a shift', 'error');
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
        name: name,
        shift: shift
    });

    saveEmployees(employees);
    nameInput.value = '';
    shiftSelect.value = '';
    showMessage(messageDiv, `${name} added successfully to ${shift === 'morning' ? 'Morning' : 'Evening'} shift!`, 'success');

    displayEmployees();
    updateStats();
}

// Display employees
function displayEmployees() {
    const employees = getEmployees();
    const today = new Date();
    const attendance = getAttendance(today);
    const employeeList = document.getElementById('employeeList');

    if (employees.length === 0) {
        employeeList.innerHTML = '<p class="no-history">No employees added yet. Add your first employee!</p>';
        return;
    }

    employeeList.innerHTML = '';

    employees.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'employee-card';

        const attendanceRecord = attendance[employee.id] || {};
        const punchIn = attendanceRecord.punchIn || null;
        const punchOut = attendanceRecord.punchOut || null;

        let statusClass = 'not-started';
        let statusText = 'Not Started';

        if (punchIn && punchOut) {
            statusClass = 'punched-out';
            statusText = 'Completed';
        } else if (punchIn) {
            statusClass = 'punched-in';
            statusText = 'Working';
        }

        const shiftText = employee.shift === 'morning' ? 'Morning Shift' : 'Evening Shift';
        const shiftClass = employee.shift === 'evening' ? 'evening' : '';

        card.innerHTML = `
            <div class="employee-header">
                <div class="employee-info">
                    <div class="employee-name">${employee.name}</div>
                    <span class="employee-shift-badge ${shiftClass}">${shiftText}</span>
                </div>
                <span class="employee-status ${statusClass}">${statusText}</span>
            </div>

            <div class="punch-times">
                <div class="punch-time">
                    <div class="punch-label">Punch In</div>
                    <div class="punch-value">${punchIn || '--:--'}</div>
                </div>
                <div class="punch-time">
                    <div class="punch-label">Punch Out</div>
                    <div class="punch-value">${punchOut || '--:--'}</div>
                </div>
            </div>

            <div class="employee-actions">
                <button class="btn-punch-in" onclick="punchIn('${employee.id}')" ${punchIn ? 'disabled' : ''}>
                    Punch In
                </button>
                <button class="btn-punch-out" onclick="punchOut('${employee.id}')" ${!punchIn || punchOut ? 'disabled' : ''}>
                    Punch Out
                </button>
                <button class="btn-delete" onclick="deleteEmployee('${employee.id}', '${employee.name}')">
                    Delete
                </button>
            </div>
        `;

        employeeList.appendChild(card);
    });
}

// Punch In
function punchIn(employeeId) {
    const today = new Date();
    const attendance = getAttendance(today);

    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (!attendance[employeeId]) {
        attendance[employeeId] = {};
    }

    attendance[employeeId].punchIn = timeString;
    saveAttendance(today, attendance);

    displayEmployees();
    updateStats();
}

// Punch Out
function punchOut(employeeId) {
    const today = new Date();
    const attendance = getAttendance(today);

    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (attendance[employeeId]) {
        attendance[employeeId].punchOut = timeString;
        saveAttendance(today, attendance);
    }

    displayEmployees();
    updateStats();
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
    updateStats();
    loadHistory();
}

// Update statistics
function updateStats() {
    const employees = getEmployees();
    const today = new Date();
    const attendance = getAttendance(today);

    const total = employees.length;
    let punchedIn = 0;
    let punchedOut = 0;

    employees.forEach(emp => {
        const record = attendance[emp.id];
        if (record) {
            if (record.punchIn && !record.punchOut) {
                punchedIn++;
            } else if (record.punchOut) {
                punchedOut++;
            }
        }
    });

    document.getElementById('totalEmployees').textContent = total;
    document.getElementById('punchedInCount').textContent = punchedIn;
    document.getElementById('punchedOutCount').textContent = punchedOut;
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
    let historyHTML = `<h4>Attendance for ${selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</h4><br>`;

    // Header
    historyHTML += `
        <div class="history-item" style="font-weight: bold; background: #f8f9fa;">
            <span>Employee</span>
            <span>Shift</span>
            <span>Punch In</span>
            <span>Punch Out</span>
        </div>
    `;

    employees.forEach(emp => {
        const record = attendance[emp.id];
        if (record && record.punchIn) {
            hasAttendance = true;
            const shiftText = emp.shift === 'morning' ? 'Morning' : 'Evening';

            historyHTML += `
                <div class="history-item">
                    <span><strong>${emp.name}</strong></span>
                    <span>${shiftText}</span>
                    <span>${record.punchIn || '--:--'}</span>
                    <span>${record.punchOut || '--:--'}</span>
                </div>
            `;
        }
    });

    if (!hasAttendance) {
        historyHTML += '<p class="no-history">No attendance records for this date.</p>';
    }

    historyList.innerHTML = historyHTML;
}

// Export history
function exportHistory() {
    const employees = getEmployees();
    const dateInput = document.getElementById('historyDate');
    const selectedDate = dateInput.value ? new Date(dateInput.value) : new Date();
    const attendance = getAttendance(selectedDate);

    let csv = 'Employee Name,Shift,Punch In,Punch Out\n';

    employees.forEach(emp => {
        const record = attendance[emp.id];
        if (record && record.punchIn) {
            const shiftText = emp.shift === 'morning' ? 'Morning' : 'Evening';
            csv += `${emp.name},${shiftText},${record.punchIn || ''},${record.punchOut || ''}\n`;
        }
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${formatDateKey(selectedDate)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Clear all data
function clearAllData() {
    if (!confirm('Are you sure you want to clear all data? This will remove all employees and attendance records.')) {
        return;
    }

    if (!confirm('This is your last warning! All data will be permanently deleted. Continue?')) {
        return;
    }

    localStorage.clear();
    initializeApp();
}

// Show message
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;

    setTimeout(() => {
        element.className = 'message';
    }, 4000);
}

// Allow Enter key to add employee
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('newEmployeeName');
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addEmployee();
            }
        });
    }
});
