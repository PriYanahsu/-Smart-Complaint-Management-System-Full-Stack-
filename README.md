# 🛠️ Online Complaint Management System - Full Stack Web App (JAVA)

---

## 📌 Overview  
The **Online Complaint Management System** is a secure and scalable full-stack web application that allows users to register, log in, and submit complaints, while enabling administrators to view, manage, and resolve those complaints. 

Built using **ReactJS**, **Spring Boot**, and **MySQL**, the app leverages **JWT-based authentication** and **role-based access control** to ensure a seamless and secure experience for both users and administrators.

---

## ✅ Features  

### 👤 User Features:
- User registration and login with JWT authentication  
- Submit complaints with title, description, and timestamp  
- Track complaint status in real time  
- Edit or delete complaints before resolution  

### 🛠️ Admin Features:
- View all user complaints in a dashboard  
- Change complaint status (Pending → In Progress → Resolved)  
- Filter or search complaints  
- Admin-only access to sensitive operations  

### 🌐 Common Features:
- Fully responsive design (mobile + desktop)  
- RESTful API integration between frontend and backend  
- JWT token storage in localStorage for session management  
- Detailed error messages and validations  
- Clean and intuitive UI built with React  

---

## 🧱 Tech Stack

### Frontend
- **ReactJS**
- **Axios** (for API calls)
- **React Router**
- **HTML5 + TailwindCSS + JavaScript**

### Backend
- **Spring Boot**
- **Spring Security + JWT**
- **MySQL Database**
- **Hibernate / JPA**

---

## 📁 Project Structure

### 📦 Backend (Spring Boot)


     /SMART-COMPLAINT-MANAGEMENT-SYSTEM
     │
     ├── Backend-Spring-boot/                # Spring Boot Backend
     │   ├── src/
     │   │   └── main/
     │   │       └── java/com/example/demo/
     │   │           ├── configuration/      # Security and CORS configs
     │   │           │   ├── AuthConfig.java
     │   │           │   └── CorsConfig.java
     │   │           ├── controller/         # API Controllers
     │   │           │   ├── AuthController.java
     │   │           │   ├── ComplaintController.java
     │   │           ├── entity/             # JPA Entity Classes
     │   │           │   ├── AuthEntity.java
     │   │           │   ├── AuthResponse.java
     │   │           │   └── EntityComplaint.java
     │   │           ├── filter/             # JWT Filter
     │   │           │   └── JwtRequestFilter.java
     │   │           ├── repository/         # Repository Interfaces
     │   │           │   ├── AuthRepo.java
     │   │           │   └── ComplaintRepository.java
     │   │           ├── service/            # Business Logic
     │   │           │   ├── CustomUserDetailsService.java
     │   │           │   └── ServiceComplaint.java
     │   │           ├── utils/              # Utility classes
     │   │           │   └── (any helpers)
     │   │           └── DemoApplication.java # Main app entry point
     │   └── resources/                      # application.properties, static files
     │

### 📦 Frontend (Reactjs)
    ├── Frontend-ReactJS/                   # ReactJS Frontend
    │   ├── public/                         # Static public assets
    │   ├── src/
    │   │   ├── assets/                     # Images, logos, icons
    │   │   │   └── react.svg
    │   │   ├── components/                 # UI components
    │   │   │   ├── Footer.jsx
    │   │   │   └── Navbar.jsx
    │   │   ├── pages/                      # Page-level components
    │   │   │   ├── AdminHome.jsx
    │   │   │   ├── ComplainList.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── Registration.jsx
    │   │   │   └── UserHome.jsx
    │   │   ├── App.jsx                     # App root
    │   │   ├── index.css                   # Global styles
    │   │   └── main.jsx                    # ReactDOM entry
    │   ├── index.html                      # Template file
    │   ├── package.json                    # Project metadata and dependencies
    │   ├── vite.config.js                  # Vite config
    │   └── README.md                       # Project description


---

## 🛠️ Setup & Installation

### 🔧 Prerequisites:
- **Java 11 or higher** (for backend)
- **Node.js** and **npm** (for frontend)
- **MySQL** (database)
- **Maven** (for building the backend project)

### 🔄 Backend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/complaint-management-system.git
   cd complaint-management-system/Backend-Spring-boot
   
2. Update your application.properties with MySQL credentials:

        spring.application.name=demo
        spring.datasource.url=jdbc:mysql://localhost:3306/********
        spring.datasource.username=useranme
        spring.datasource.password=*******

        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.show-sql=true
        spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
        spring.jpa.open-in-view=false

        spring.servlet.multipart.max-file-size=5MB
        spring.servlet.multipart.max-request-size=5MB

        logging.level.org.springframework.security=DEBUG
   
3.Build the project using Maven:

      mvn clean install
      
4. Run the backend server:
   
       mvn spring-boot:run
   
6. Backend should be running on http://localhost:8080.

🔄 Frontend Setup:
1. Navigate to the frontend directory:

       cd ../Frontend-ReactJS
   
3. Install the required dependencies:

       npm install
   
3. Start the development server:

       npm run dev
   
Frontend should be running on http://localhost:5137.


## Screenshot
 ### 1. Register first
![Screenshot (48)](https://github.com/user-attachments/assets/a805a38f-dd22-412a-ad51-a114621ecd7f)

 ### 2. Than login
![Screenshot (50)](https://github.com/user-attachments/assets/5aa35261-8530-4329-bb0f-48b9357ee5c1)

 ### 3. Than if ur a user than fill the camplaint from
![Screenshot (51)](https://github.com/user-attachments/assets/fde6a048-fb2a-4eb1-9b16-865c9f1da972)

 ### 4. In that u will get an live access web cam which help to click the problem you are facing
![Screenshot (52)](https://github.com/user-attachments/assets/d461ffe6-279d-417a-8553-914f8fa31bbb)

 ### 5. Submit the form 
![Screenshot (52)](https://github.com/user-attachments/assets/797412db-f784-4cd2-966a-7520d0cfdbc4)

 ### 6. User also have the access of complain that has been filled to check the status
![Screenshot (53)](https://github.com/user-attachments/assets/37555523-2aa6-4aa5-8466-cbc269155919)

 ### 7. Here is Admin Registration 
![Screenshot (54)](https://github.com/user-attachments/assets/7f66a82c-72c0-413c-a752-6c4f9a99ce7c)

 ### 8. After that login 
![Screenshot (55)](https://github.com/user-attachments/assets/916053d9-684a-4e89-8e6d-9b1de02e967b)

 ### 9. Admin can uodate the status and have the all the access
![Screenshot (56)](https://github.com/user-attachments/assets/6f33dc77-4127-48a5-aa03-169e0a14358d)


🤝 Contributing
We welcome contributions to the project! If you have any ideas for improvements or find a bug, feel free to create an issue or submit a pull request.
