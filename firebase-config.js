// ============================================
// FIREBASE CONFIGURATION
// ============================================
// IMPORTANT: Replace these values with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > Your apps > Firebase SDK snippet

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Initialize Firestore
const db = firebase.firestore();
const auth = firebase.auth();

// Enable offline persistence
db.enablePersistence()
    .then(() => {
        console.log('✅ Offline persistence enabled');
    })
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.warn('⚠️ Offline persistence failed: Multiple tabs open');
        } else if (err.code == 'unimplemented') {
            console.warn('⚠️ Offline persistence not supported');
        }
    });

// Export for use in other files
window.db = db;
window.auth = auth;
