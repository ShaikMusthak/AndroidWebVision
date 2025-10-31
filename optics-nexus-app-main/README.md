# AI Background Remover - Android + Web App

> **AI-powered background removal** that works on **web and Android** using browser-based ML models. No native OpenCV required!

![AI Background Remover Demo](https://img.shields.io/badge/Platform-Web%20%7C%20Android-blue) ![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20TypeScript%20%7C%20Transformers.js-green)

## 🚀 Features Implemented

### ✅ Web Platform
- **AI Background Removal** using Hugging Face Transformers.js
- **Real-time Processing** with progress indicators
- **WebGPU Acceleration** for fast inference
- **Drag & Drop Upload** with file picker fallback
- **Before/After Preview** with transparent background checkerboard
- **Download Processed Images** as PNG with transparency
- **Fully Responsive UI** works on desktop, tablet, mobile

### ✅ Android Platform (via Capacitor)
- **Native Android Wrapper** for the web app
- **Hot-Reload Development** from Lovable sandbox
- **Camera Integration Ready** (Capacitor plugins available)
- **Offline Capable** (with proper caching setup)

## 📸 Screenshots

### Web Interface
```
┌─────────────────────────────────────────────┐
│  🎨 AI-Powered Background Removal            │
│  ========================================    │
│                                             │
│  [Upload Image / Drag & Drop]              │
│                                             │
│  ┌────────────┐    ┌────────────┐         │
│  │ Original   │    │ Processed  │         │
│  │   Image    │    │   Result   │         │
│  └────────────┘    └────────────┘         │
│                                             │
│  [Download]  [Try Another]                 │
└─────────────────────────────────────────────┘
```

### Android App
- Same UI as web (Capacitor wrapper)
- Native file picker integration
- Full-screen image processing
- Hardware-accelerated rendering

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                     USER INTERFACE                       │
│              (React + TypeScript + Tailwind)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ User uploads image
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 IMAGE PROCESSING LAYER                   │
│                  (backgroundRemoval.ts)                  │
│                                                          │
│  1. Load image → HTMLImageElement                       │
│  2. Resize if needed (max 1024px)                       │
│  3. Convert to base64                                   │
│  4. Pass to AI model ──────────┐                        │
└────────────────────────────────┼────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────┐
│              AI INFERENCE ENGINE                         │
│         (@huggingface/transformers v3+)                 │
│                                                          │
│  Model: Xenova/segformer-b0-finetuned-ade-512-512      │
│  Backend: WebGPU (falls back to WASM)                   │
│                                                          │
│  Input: Base64 image                                    │
│  Output: Segmentation mask (Float32Array)               │
└────────────────────────────────┬────────────────────────┘
                                 │
                                 │ Mask data
                                 ▼
┌─────────────────────────────────────────────────────────┐
│               POST-PROCESSING                            │
│                                                          │
│  1. Apply mask to alpha channel                         │
│  2. Invert mask (keep subject, remove background)       │
│  3. Generate PNG Blob with transparency                 │
└────────────────────────────────┬────────────────────────┘
                                 │
                                 ▼
                          [Download / Display]
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | UI components and state management |
| **Styling** | Tailwind CSS + shadcn/ui | Beautiful, responsive design system |
| **AI/ML** | Transformers.js v3 | Browser-based ML inference |
| **Compute** | WebGPU / WebAssembly | Hardware acceleration |
| **Mobile** | Capacitor 6 | Android native wrapper |
| **Build** | Vite | Fast development and production builds |

### Why No Native OpenCV/NDK/JNI?

**Traditional Native Approach:**
```
┌──────────────────────────────────────────┐
│  React Native / Native Android           │
│  ├── JNI Bridge (Java ↔ C++)            │
│  ├── OpenCV C++ bindings                │
│  ├── NDK compilation                     │
│  └── Complex build setup                │
└──────────────────────────────────────────┘
```

**Our Web-First Approach:**
```
┌──────────────────────────────────────────┐
│  React Web App                           │
│  ├── Transformers.js (pure JS/WASM)     │
│  ├── WebGPU acceleration                │
│  ├── No compilation needed               │
│  └── Capacitor wrapper for Android      │
└──────────────────────────────────────────┘
```

**Advantages:**
- ✅ No NDK/JNI complexity
- ✅ Same codebase for web + Android
- ✅ Easier to maintain and update
- ✅ No platform-specific builds
- ✅ Faster iteration cycles
- ✅ State-of-the-art AI models from Hugging Face

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js 18+** (download from [nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js)

### Web Development Setup

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# App will open at http://localhost:8080
```

### Android Setup (Capacitor)

**First-time setup:**

```bash
# 1. Install Capacitor CLI globally (optional)
npm install -g @capacitor/cli

# 2. Build the web app
npm run build

# 3. Add Android platform
npx cap add android

# 4. Update native dependencies
npx cap update android

# 5. Sync web assets to Android
npx cap sync android

# 6. Open in Android Studio
npx cap open android
```

**Requirements for Android:**
- **Android Studio** ([download here](https://developer.android.com/studio))
- **Java 17+** (included with Android Studio)
- **Android SDK** (managed by Android Studio)

**Running on Android:**

```bash
# Option 1: Run on emulator or connected device
npx cap run android

# Option 2: Open Android Studio for manual build
npx cap open android
```

**Hot-Reload Development:**
The Capacitor config is set to load from the Lovable sandbox URL, so you can:
1. Make changes in Lovable
2. Reload the Android app
3. See changes instantly (no rebuild needed)

### Dependencies Installed

```json
{
  "@huggingface/transformers": "^3.x",
  "@capacitor/core": "^6.x",
  "@capacitor/android": "^6.x"
}
```

**Note:** No OpenCV, NDK, or native dependencies required!

## 🎯 How It Works

### Image Processing Flow

```typescript
// 1. User uploads image
const file = uploadedFile;

// 2. Load as HTMLImageElement
const img = await loadImage(file);

// 3. Resize if too large (max 1024x1024)
const canvas = resizeImageIfNeeded(img);

// 4. Load AI model (downloads on first use, ~50MB)
const segmenter = await pipeline(
  'image-segmentation',
  'Xenova/segformer-b0-finetuned-ade-512-512',
  { device: 'webgpu' } // Uses GPU if available
);

// 5. Run inference
const result = await segmenter(imageData);
// result[0].mask contains segmentation data

// 6. Apply mask to alpha channel
for (let i = 0; i < mask.data.length; i++) {
  pixels[i * 4 + 3] = (1 - mask.data[i]) * 255; // Invert mask
}

// 7. Export as PNG Blob
const blob = await canvas.toBlob('image/png');
```

### Model Information

- **Model:** `Xenova/segformer-b0-finetuned-ade-512-512`
- **Task:** Image Segmentation
- **Size:** ~50MB (downloads once, cached)
- **Backend:** WebGPU (with WASM fallback)
- **Performance:** 2-5 seconds on modern devices

## 📱 Deployment

### Web Deployment
```bash
# Build for production
npm run build

# Deploy to Lovable (automatic)
# Or deploy to any static host (Vercel, Netlify, etc.)
```

### Android APK Build

```bash
# In Android Studio:
# Build > Build Bundle(s) / APK(s) > Build APK(s)

# Or via command line:
cd android
./gradlew assembleDebug

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Publishing to Google Play

1. Update `capacitor.config.ts` with production URL
2. Build release APK in Android Studio
3. Sign with keystore
4. Upload to Google Play Console

## 🔧 Customization

### Change AI Model

```typescript
// In src/lib/backgroundRemoval.ts
const segmenter = await pipeline(
  'image-segmentation',
  'YOUR_MODEL_NAME', // Try different models from Hugging Face
  { device: 'webgpu' }
);
```

### Add More Features

- **Face Detection:** Use `object-detection` pipeline
- **Image Classification:** Use `image-classification` pipeline
- **Style Transfer:** Use `image-to-image` pipeline

See [Hugging Face Tasks](https://huggingface.co/tasks) for all options.

## 🐛 Troubleshooting

**WebGPU not available:**
- Falls back to WebAssembly automatically
- Check browser support at [caniuse.com/webgpu](https://caniuse.com/webgpu)

**Model download fails:**
- Check internet connection
- Model downloads from Hugging Face CDN (~50MB)
- First run takes longer (subsequent runs use cache)

**Android build fails:**
- Ensure Android Studio and Java 17+ installed
- Run `npx cap sync android` after web changes
- Check `android/app/build.gradle` for version conflicts

**Performance issues:**
- Reduce `MAX_IMAGE_DIMENSION` in `backgroundRemoval.ts`
- Try smaller/faster models from Hugging Face

## 📚 Resources

- [Transformers.js Documentation](https://huggingface.co/docs/transformers.js)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [WebGPU Guide](https://developer.chrome.com/docs/web-platform/webgpu/)
- [Hugging Face Models](https://huggingface.co/models)

## 📄 License

MIT License - Feel free to use in your projects!

---

**Built with ❤️ using Lovable, React, and cutting-edge web AI**
