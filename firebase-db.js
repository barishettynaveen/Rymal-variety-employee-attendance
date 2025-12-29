// ============================================
// FIREBASE DATABASE OPERATIONS
// Handles all Firestore database operations
// ============================================

// ============================================
// USER OPERATIONS
// ============================================

/**
 * Load all users from Firestore
 */
async function loadUsersFromFirestore() {
    try {
        const snapshot = await db.collection('users').get();
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });

        // Create default admin if no users exist
        if (users.length === 0) {
            await createDefaultAdminInFirestore();
            return await loadUsersFromFirestore();
        }

        console.log(`✅ Loaded ${users.length} users from Firestore`);
        return users;
    } catch (error) {
        console.error('❌ Error loading users:', error);
        return [];
    }
}

/**
 * Save a user to Firestore
 */
async function saveUserToFirestore(user) {
    try {
        if (user.id) {
            // Update existing user
            await db.collection('users').doc(user.id).set(user, { merge: true });
            console.log(`✅ User ${user.email} updated`);
        } else {
            // Create new user
            const docRef = await db.collection('users').add(user);
            user.id = docRef.id;
            console.log(`✅ User ${user.email} created with ID: ${user.id}`);
        }
        return user;
    } catch (error) {
        console.error('❌ Error saving user:', error);
        throw error;
    }
}

/**
 * Get a user by email
 */
async function getUserByEmail(email) {
    try {
        const snapshot = await db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('❌ Error getting user:', error);
        return null;
    }
}

/**
 * Get a user by ID
 */
async function getUserById(userId) {
    try {
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('❌ Error getting user:', error);
        return null;
    }
}

/**
 * Create default admin user
 */
async function createDefaultAdminInFirestore() {
    try {
        const adminPassword = await hashPassword('admin123');
        const admin = {
            name: 'Admin',
            email: 'admin@rymalvariety.com',
            phone: '',
            password: adminPassword,
            role: 'admin',
            shift: 'morning',
            active: true,
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection('users').add(admin);
        console.log('✅ Default admin created:', admin.email, '/ admin123');
        console.log('Admin ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        throw error;
    }
}

/**
 * Update user status (active/inactive)
 */
async function updateUserStatus(userId, active) {
    try {
        await db.collection('users').doc(userId).update({ active });
        console.log(`✅ User ${userId} status updated to ${active}`);
    } catch (error) {
        console.error('❌ Error updating user status:', error);
        throw error;
    }
}

/**
 * Delete a user
 */
async function deleteUserFromFirestore(userId) {
    try {
        await db.collection('users').doc(userId).delete();
        console.log(`✅ User ${userId} deleted`);
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        throw error;
    }
}

// ============================================
// ATTENDANCE OPERATIONS
// ============================================

/**
 * Load all attendance records from Firestore
 */
async function loadAttendanceFromFirestore() {
    try {
        const snapshot = await db.collection('attendance').get();
        const attendance = [];
        snapshot.forEach(doc => {
            attendance.push({ id: doc.id, ...doc.data() });
        });
        console.log(`✅ Loaded ${attendance.length} attendance records`);
        return attendance;
    } catch (error) {
        console.error('❌ Error loading attendance:', error);
        return [];
    }
}

/**
 * Load attendance records for a specific user
 */
async function loadUserAttendance(userId) {
    try {
        const snapshot = await db.collection('attendance')
            .where('userId', '==', userId)
            .orderBy('date', 'desc')
            .get();

        const attendance = [];
        snapshot.forEach(doc => {
            attendance.push({ id: doc.id, ...doc.data() });
        });
        return attendance;
    } catch (error) {
        console.error('❌ Error loading user attendance:', error);
        return [];
    }
}

/**
 * Save attendance record to Firestore
 */
async function saveAttendanceToFirestore(record) {
    try {
        if (record.id) {
            // Update existing record
            await db.collection('attendance').doc(record.id).set(record, { merge: true });
            console.log(`✅ Attendance record ${record.id} updated`);
        } else {
            // Create new record
            const docRef = await db.collection('attendance').add(record);
            record.id = docRef.id;
            console.log(`✅ Attendance record created with ID: ${record.id}`);
        }
        return record;
    } catch (error) {
        console.error('❌ Error saving attendance:', error);
        throw error;
    }
}

/**
 * Get today's attendance for a user
 */
async function getTodayAttendanceFromFirestore(userId) {
    try {
        const today = formatDateKey(new Date());
        const snapshot = await db.collection('attendance')
            .where('userId', '==', userId)
            .where('date', '==', today)
            .limit(1)
            .get();

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('❌ Error getting today\'s attendance:', error);
        return null;
    }
}

/**
 * Get attendance records for a date range
 */
async function getAttendanceByDateRange(userId, fromDate, toDate) {
    try {
        let query = db.collection('attendance');

        if (userId) {
            query = query.where('userId', '==', userId);
        }

        if (fromDate) {
            query = query.where('date', '>=', fromDate);
        }

        if (toDate) {
            query = query.where('date', '<=', toDate);
        }

        const snapshot = await query.orderBy('date', 'desc').get();
        const attendance = [];
        snapshot.forEach(doc => {
            attendance.push({ id: doc.id, ...doc.data() });
        });
        return attendance;
    } catch (error) {
        console.error('❌ Error getting attendance by date range:', error);
        return [];
    }
}

/**
 * Delete an attendance record
 */
async function deleteAttendanceFromFirestore(recordId) {
    try {
        await db.collection('attendance').doc(recordId).delete();
        console.log(`✅ Attendance record ${recordId} deleted`);
    } catch (error) {
        console.error('❌ Error deleting attendance:', error);
        throw error;
    }
}

// ============================================
// REAL-TIME LISTENERS
// ============================================

/**
 * Listen to user changes in real-time
 */
function listenToUsers(callback) {
    return db.collection('users').onSnapshot(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        callback(users);
    }, error => {
        console.error('❌ Error listening to users:', error);
    });
}

/**
 * Listen to attendance changes in real-time
 */
function listenToAttendance(callback) {
    return db.collection('attendance').onSnapshot(snapshot => {
        const attendance = [];
        snapshot.forEach(doc => {
            attendance.push({ id: doc.id, ...doc.data() });
        });
        callback(attendance);
    }, error => {
        console.error('❌ Error listening to attendance:', error);
    });
}

// ============================================
// FIREBASE AUTHENTICATION
// ============================================

/**
 * Sign up a new user with Firebase Auth
 */
async function signUpWithFirebase(email, password, userData) {
    try {
        // Create Firebase Auth user
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const firebaseUser = userCredential.user;

        // Create user document in Firestore
        userData.id = firebaseUser.uid;
        userData.email = email;
        userData.createdAt = new Date().toISOString();

        await db.collection('users').doc(firebaseUser.uid).set(userData);

        console.log('✅ User signed up successfully:', email);
        return { success: true, user: userData };
    } catch (error) {
        console.error('❌ Sign up error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Sign in user with Firebase Auth
 */
async function signInWithFirebase(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const firebaseUser = userCredential.user;

        // Get user data from Firestore
        const userDoc = await db.collection('users').doc(firebaseUser.uid).get();

        if (!userDoc.exists) {
            throw new Error('User data not found');
        }

        const userData = { id: userDoc.id, ...userDoc.data() };
        console.log('✅ User signed in successfully:', email);
        return { success: true, user: userData };
    } catch (error) {
        console.error('❌ Sign in error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Sign out current user
 */
async function signOutFromFirebase() {
    try {
        await auth.signOut();
        console.log('✅ User signed out');
        return { success: true };
    } catch (error) {
        console.error('❌ Sign out error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get currently signed-in Firebase user
 */
function getCurrentFirebaseUser() {
    return auth.currentUser;
}

/**
 * Listen to auth state changes
 */
function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

// ============================================
// MIGRATION HELPERS
// ============================================

/**
 * Migrate data from localStorage to Firestore (one-time operation)
 */
async function migrateLocalStorageToFirestore() {
    try {
        console.log('🔄 Starting migration from localStorage to Firestore...');

        // Migrate users
        const localUsers = localStorage.getItem('users');
        if (localUsers) {
            const users = JSON.parse(localUsers);
            console.log(`Found ${users.length} users to migrate`);

            for (const user of users) {
                const userId = user.id || generateId();
                delete user.id; // Remove old ID
                await db.collection('users').doc(userId).set(user);
                console.log(`✅ Migrated user: ${user.email}`);
            }
        }

        // Migrate attendance
        const localAttendance = localStorage.getItem('attendance');
        if (localAttendance) {
            const attendance = JSON.parse(localAttendance);
            console.log(`Found ${attendance.length} attendance records to migrate`);

            for (const record of attendance) {
                delete record.id; // Remove old ID, Firestore will create new one
                await db.collection('attendance').add(record);
            }
            console.log(`✅ Migrated ${attendance.length} attendance records`);
        }

        console.log('✅ Migration completed successfully!');
        console.log('⚠️  You can now clear localStorage if everything works correctly');
        return { success: true };
    } catch (error) {
        console.error('❌ Migration error:', error);
        return { success: false, error: error.message };
    }
}

// Make functions available globally
window.firebaseDB = {
    // User operations
    loadUsers: loadUsersFromFirestore,
    saveUser: saveUserToFirestore,
    getUserByEmail,
    getUserById,
    createDefaultAdmin: createDefaultAdminInFirestore,
    updateUserStatus,
    deleteUser: deleteUserFromFirestore,

    // Attendance operations
    loadAttendance: loadAttendanceFromFirestore,
    loadUserAttendance,
    saveAttendance: saveAttendanceToFirestore,
    getTodayAttendance: getTodayAttendanceFromFirestore,
    getAttendanceByDateRange,
    deleteAttendance: deleteAttendanceFromFirestore,

    // Real-time listeners
    listenToUsers,
    listenToAttendance,

    // Authentication
    signUp: signUpWithFirebase,
    signIn: signInWithFirebase,
    signOut: signOutFromFirebase,
    getCurrentUser: getCurrentFirebaseUser,
    onAuthStateChanged,

    // Migration
    migrateFromLocalStorage: migrateLocalStorageToFirestore
};

console.log('✅ Firebase DB module loaded');
