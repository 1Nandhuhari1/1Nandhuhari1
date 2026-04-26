# Resumer.ai - AI Resume Builder

Resumer.ai is a full-stack, PWA-enabled React application designed to help users build, style, and export professional resumes. It features a step-by-step builder, multiple customizable templates, ATS scoring, and cloud storage.

## ✨ Features

*   **7-Step Resume Builder:** Easily input personal info, experience, education, projects, skills, and achievements.
*   **8 Professional Templates:** Choose from Modern, Minimalist, Professional, Creative, Executive, Noir, Elegant, and Vibrant designs.
*   **Live Preview:** See your resume update in real-time as you type.
*   **PDF Export:** Download your finished resume as a high-quality PDF.
*   **Resume Import:** Upload existing PDF or DOCX resumes to auto-fill the builder.
*   **ATS Score Checker:** Get instant feedback on how well your resume is optimized for Applicant Tracking Systems.
*   **Cloud Save:** Securely save your resumes to the cloud and access them from anywhere (powered by Supabase).
*   **Passwordless Login:** Secure OTP authentication via email.
*   **PWA Support:** Install the app on your device for offline access and a native-like experience.

## 🚀 Tech Stack

*   **Frontend:** React 19, Vite 7
*   **Routing:** React Router DOM v7
*   **Authentication:** Custom OTP via EmailJS + SHA-256 Hashing
*   **Database:** Supabase (PostgreSQL)
*   **Styling:** Vanilla CSS (App.css, index.css)
*   **Icons:** Lucide React
*   **PDF Generation:** html2pdf.js
*   **File Parsing:** pdfjs-dist (PDF), mammoth (DOCX)
*   **Animations:** Framer Motion

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn
*   A Supabase project (for database)
*   An EmailJS account (for OTP emails)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ai-resume-builder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your keys:
    ```env
    # Supabase (Database & Cloud Storage)
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

    # EmailJS (For OTP Authentication)
    VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

### Building for Production

To create a production build:
```bash
npm run build
```
The optimized files will be generated in the `dist` directory.

## 🔒 Security Notes

*   **API Keys:** Never commit your `.env.local` file. Ensure it is listed in your `.gitignore`.
*   **OTP Security:** The application uses SHA-256 hashing via the Web Crypto API to securely verify One-Time Passwords without storing the raw code in state.

## 📄 License

This project is licensed under the MIT License.
