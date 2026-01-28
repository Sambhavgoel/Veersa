# How to Run Veersa App

## Fix PowerShell Execution Policy Issue

You're encountering a PowerShell execution policy error. Here are **3 solutions** (choose one):

### Solution 1: Use Command Prompt (CMD) instead of PowerShell
Open **Command Prompt** (cmd.exe) instead of PowerShell and run all commands there.

### Solution 2: Bypass Execution Policy for Current Session
In PowerShell, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```
This only affects the current PowerShell session.

### Solution 3: Change Execution Policy Permanently (Requires Admin)
Open PowerShell **as Administrator** and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Running the Application

### Step 1: Start the Backend Server

1. Open a terminal/command prompt
2. Navigate to backend directory:
   ```bash
   cd mobo\backend
   ```

3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   
   The backend will run on **port 5000** (http://localhost:5000)
   - MongoDB connection is already configured in `.env`
   - You should see "MongoDB connected" message

### Step 2: Start the Frontend (Expo App)

1. Open a **new** terminal/command prompt
2. Navigate to frontend directory:
   ```bash
   cd mobo\frontend\project
   ```

3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
   Note: You may see peer dependency warnings - these are usually safe to ignore.

4. Start the Expo development server:
   ```bash
   npm start
   ```
   
   This will:
   - Open Expo DevTools in your browser
   - Show a QR code for testing on mobile devices
   - Provide options to run on Android/iOS/Web

5. Choose how to run:
   - Press `a` for Android emulator/device
   - Press `i` for iOS simulator/device
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your phone

### Important Notes:

1. **Backend must be running** before starting the frontend
2. **API Configuration**: The frontend is configured to connect to `http://192.168.38.201:5000`
   - If running on a real device, update `mobo\frontend\project\services\api.js` with your computer's local IP
   - If running on emulator/simulator, you can use `http://localhost:5000` or `http://10.0.2.2:5000` (Android emulator)

3. **MongoDB**: The backend is already configured with a MongoDB Atlas connection string

---

## Quick Start Commands

**Terminal 1 (Backend):**
```bash
cd mobo\backend
npm install
npm start
```

**Terminal 2 (Frontend):**
```bash
cd mobo\frontend\project
npm install
npm start
```

---

## Troubleshooting

### If npm commands still don't work:
- Use Command Prompt (cmd.exe) instead of PowerShell
- Or run: `cmd /c "npm install"` from PowerShell

### If you see cache errors:
```bash
npm cache clean --force
npm install
```

### If Expo doesn't start:
- Make sure you have Expo CLI installed globally: `npm install -g expo-cli`
- Or use: `npx expo start`

### To find your local IP address (for mobile testing):
- Windows: Run `ipconfig` and look for IPv4 Address
- Update `mobo\frontend\project\services\api.js` with your IP
