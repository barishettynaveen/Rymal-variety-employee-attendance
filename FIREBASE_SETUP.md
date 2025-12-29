# 🔥 Firebase Setup Guide

Follow these steps to set up Firebase for your Rymal Variety Attendance System:

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: **rymal-variety-attendance** (or any name you prefer)
4. Click **Continue**
5. Disable Google Analytics (optional, not needed for this app)
6. Click **Create Project**
7. Wait for project creation, then click **Continue**

## Step 2: Register Your Web App

1. On the project homepage, click the **Web icon** `</>` (for web app)
2. Enter app nickname: **Rymal Attendance Web App**
3. **DO NOT** check "Also set up Firebase Hosting" (not needed)
4. Click **Register app**
5. You'll see a **Firebase SDK snippet** with your configuration
6. **COPY** the configuration object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456:web:abc123"
};
```

7. Click **Continue to console**

## Step 3: Enable Firestore Database

1. In the left sidebar, click **Build** → **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode** (we'll add security rules later)
4. Click **Next**
5. Choose your Cloud Firestore location (select closest to your region):
   - For India: **asia-south1 (Mumbai)**
   - For US: **us-central1**
6. Click **Enable**
7. Wait for Firestore to be created

## Step 4: Set Up Firestore Security Rules

1. In Firestore Database, click the **Rules** tab
2. Replace the default rules with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - authenticated users can read, only update their own
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Attendance collection - authenticated users only
    match /attendance/{docId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

3. Click **Publish**

## Step 5: Enable Authentication

1. In the left sidebar, click **Build** → **Authentication**
2. Click **Get started**
3. Click on **Email/Password** (under Sign-in method)
4. Toggle **Enable**
5. Keep **Email link (passwordless sign-in)** DISABLED
6. Click **Save**

## Step 6: Update Your App Configuration

1. Open the file: **`firebase-config.js`** in your project
2. Replace the placeholder values with your actual Firebase config from Step 2:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",           // ← Paste your values here
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456:web:abc123"
};
```

3. Save the file

## Step 7: Test Your Setup

1. Open your attendance app in the browser
2. Open **Developer Tools** (F12)
3. Check the **Console** tab
4. You should see:
   - ✅ Firebase initialized successfully
   - ✅ Offline persistence enabled

If you see any errors, double-check your configuration values.

## 🎉 You're Done!

Your app is now connected to Firebase! All data will:
- ✅ Sync across all devices
- ✅ Be stored securely in the cloud
- ✅ Work offline (data syncs when online)
- ✅ Be backed up automatically

## 📞 Need Help?

If you see any errors or have questions:
1. Check the Firebase Console for any warnings
2. Make sure all services are enabled (Firestore, Authentication)
3. Verify your configuration values are correct
4. Check browser console for error messages

---

**Important:** Never share your `apiKey` or Firebase config publicly on GitHub or other public platforms. While the apiKey is safe for web apps, it's best to keep your config private.
