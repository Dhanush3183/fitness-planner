# AuraPulse 3D | Next-Gen AI Fitness & Diet Architecture 🚀

A high-performance, aesthetically stunning client-side fitness and nutrition platform built with **React 18**, **Tailwind CSS**, and **Vite**. Features zero backend and zero database dependencies, running entirely in the client with edge performance and persistent `localStorage` synchronization.

---

## ✨ Key Features

1. **Stunning 3D Fitness Hero**:
   - Modern dark cyberpunk / OLED aesthetic with glowing emerald and cyan accents.
   - Interactive 3D tilt cards, dynamic floating metrics, and high-impact athletic imagery.
   - Quick one-click navigation to the questionnaire, body analysis, and nutrition hub.

2. **Step-by-Step 7-Question Diagnostic**:
   - Interactive one-by-one question flow with smooth progress bar and auto-advance.
   - Questions cover: Primary Goal, Baseline Experience, Training Environment & Equipment, Weekly Frequency, Session Duration, Workout Split Style, and Nutrition Archetype.
   - Generates a fully personalized 7-day training schedule with celebration confetti!

3. **Weekly Fitness Plan Architecture**:
   - 7-day structured breakdown (Monday through Sunday) with training and recovery days.
   - Each session includes dynamic warmups, core compound exercises, rep schemes, rest periods, target muscle groups, and pro form coaching cues.
   - Interactive exercise checkboxes to track completion progress in real time (persisted to `localStorage`).
   - Single-day focus view & 7-day matrix toggle, with instant print and PDF download support.

4. **Biometric Profile & Body Analysis Engine**:
   - Form inputs: Age, Biological Sex, Height, Current Weight, Target Goal Weight, and Activity Multiplier.
   - Real-time physiological calculation using the clinically validated **Mifflin-St Jeor** and **Deurenberg** equations:
     - Body Mass Index (BMI) & Ideal Weight Range
     - Basal Metabolic Rate (BMR) & Total Daily Energy Expenditure (TDEE)
     - Target Daily Caloric Intake (with custom deficit or surplus)
     - Precision Macro Breakdown (Protein 2.1g/kg, Carbs, Healthy Fats)
     - Estimated Body Fat % & Daily Water Hydration Target (liters)
   - Printable diagnostic body report.

5. **Evidence-Based Diet & Nutrition Compendium**:
   - Comprehensive library covering: High Protein Science, Caloric Deficits, Clean Hypertrophy, Pre & Post Workout Timing, Plant-Based Amino Acid Blending, Evidence-Based Supplements (Creatine, Whey, Caffeine), and Intracellular Electrolytes.
   - Instant real-time search filter and category pill selectors.
   - Interactive single-dial Protein & Leucine threshold calculator.
   - Deep-dive cards featuring physiological mechanisms, top whole-food sources, timing advice, common pitfalls, and pro coach tips.

6. **Pro Planner Tier & Razorpay Payments**:
   - **Monthly Plan (₹99)** & **Annual VIP Plan (₹899 - Save 25%)**.
   - Built-in **Razorpay Checkout** integration using test key: `rzp_test_TtFdkRit81xGF6`.
   - Instant unlock simulation option for testing without payment hurdles.
   - **Exclusive Pro Features**:
     - **Web Speech Audio Form Coach**: Real-time spoken auditory cues for Squats, Bench Press, Deadlifts, and Overhead Press.
     - **Brzycki & Epley 1-Rep Max Calculator**: Instant computation of 1RM and percentage working weights (95%, 85%, 75%, 65%).
     - **Injury & Joint Friendly Swap Matrix**: Instant substitutions for lower back, shoulder impingement, or knee discomfort.

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore the application.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel (Step-by-Step)

Deploying this website to Vercel is instantaneous because it is 100% static client-side with zero backend or database setup.

### Option A: Deploy via GitHub (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AuraPulse 3D Fitness Planner"
   ```
2. Create a new repository on your GitHub account (e.g., `fitness-planner-3d`).
3. Link your remote repository and push:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/fitness-planner-3d.git
   git branch -M main
   git push -u origin main
   ```
4. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** -> **"Project"**.
   - Import your `fitness-planner-3d` repository from GitHub.
   - Vercel automatically detects **Vite**:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click **Deploy**!
   - In ~30 seconds, your website will be live worldwide with free SSL.

### Option B: Deploy Directly via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. In the project folder, run:
   ```bash
   vercel
   ```
3. Follow the on-screen prompts (accept defaults). When prompted for production deploy:
   ```bash
   vercel --prod
   ```
4. Your live URL will be printed directly in the terminal!

---

## 💳 Payment Gateway Details
- **Provider**: Razorpay Standard Checkout
- **API Key**: `rzp_test_TtFdkRit81xGF6`
- **Monthly Subscription**: ₹99 (`9900` paise)
- **Annual VIP Subscription**: ₹899 (`89900` paise)
- **Currency**: `INR`
