# **Vencap: The Smart Venture Capital Hub**

Vencap is a comprehensive web-based platform that bridges the gap between project owners seeking investment and investors interested in equity participation. The platform offers a secure, interactive, and reliable environment for digital investment ecosystems.

[Click To Watch The Live Demonstration](https://drive.google.com/file/d/13A9vYaHd5Sw5qYFFtAGxtZDqnJm_RV9t/view?usp=sharing)

---

## **Features**

### **1. User Features**

* **Home Page**:

  * Navbar with logo, Home, Explore Projects, and Login.
  * Banner, Recommended Projects (based on saved search keywords on localhost), Project Listings, and Footer.

* **Explore Projects**:

  * View project details by clicking on a project.
  * Search functionality based on category, title, and date.
  * Only logged-in users can buy equity.

* **User Authentication**:

  * Register using email and password (Firebase authentication).
  * Email verification after registration.
  * Login available only after verification.

* **Investor Functionalities**:

  * Buy equity after login.
  * Add a new project.
  * View investments and owned projects in a tabular format.
  * Lodge a complaint against other users using the complaint form.
  * View personal complaints and profile information.
  * Withdraw or recharge funds (available only for verified users).
  * After each transaction (withdraw and recharge), a confirmation email is sent to the user.
  * Verification involves uploading NID (PDF) and taking a picture using a webcam.
  * Real-time facial recognition (Python-Flask) and OTP verification via mobile (Firebase).
  * Refund after the project deadline if applicable.

### **2. Admin Features**

* View and manage users (delete if necessary).
* View and manage projects (delete if necessary).
* Explore available projects.

### **3. AI Assistance**

* AI chat assistant using OpenAI API to help project owners and investors.

### **4. Financial Transactions**

* Secure transactions via SSL Commerz.
* Deduction of investment amount from the investor’s balance.
* Credit to the project owner's account after equity purchase.

---

## **Technologies Used**

* **Frontend**:

  * React.js
  * Bootstrap
  * FontAwesome
  * Email.js

* **Backend**:

  * Node.js
  * Express.js
  * Python (Flask)
  * OpenAI API

* **Database**:

  * MongoDB

* **Authentication & Verification**:

  * Firebase (Email/Password & Mobile OTP)
  * NID Verification (Face Matching via Flask)

* **Payment Gateway**:

  * SSL Commerz

* **File Handling**:

  * Multer

---

## **Installation**

### **1. Clone the Repository**
## Frontend
```bash
git clone https://github.com/AlaminHossain01052000/vencap/tree/main/vite-project
cd vite-project
```

### **2. Install Dependencies**

```bash
npm install  
npm run dev
```
## Backend
```bash
git clone https://github.com/AlaminHossain01052000/vencap/tree/main/backend
cd backend
```

### **2. Install Dependencies**

```bash
npm install  
nodemon
```


### **4. Run the Server**

```bash
npm start  
cd client  
npm start  
```

### **5. Python Backend for NID Verification**

Ensure Python and Flask are installed.

```bash
git clone https://github.com/AlaminHossain01052000/face-matching-backend.git
cd face-matching-backend
pip install -r requirements.txt 
python app.py  
```

---

## **Usage**

    1. Register and verify via email.
    2. Log in to access project investment features.
    3. Add, explore, and invest in projects.
    4. Admins can manage users and projects.
    5. Use AI assistance for queries.



