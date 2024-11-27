# User Management Role-Based Access Control (RBAC) System

This project is a **User and Role Management System** built using **React**. It allows you to manage users and roles, including adding, editing, and deleting records. The system is designed to handle basic role-based access control with a clean and responsive UI.

---

## Features

- **Add, Edit, Delete Users**:
  - Add new users with a form including name, email, role, and status (active/inactive).
  - Edit existing user details directly from the table.
  - Delete users permanently from the system.

- **Role Management**:
  - Create roles with permissions like Read, Write, and Delete.
  - Assign roles to users while adding or editing them.

- **Data Persistence**:
  - All data is saved in **localStorage**, so it remains available even after a page refresh.

- **Responsive Design**:
  - The app is styled with **Material-UI**, ensuring it works well on both desktop and mobile devices.

---

## Technologies Used

- **React** for the frontend.
- **Material-UI** for styling and responsive components.
- **localStorage** for storing user and role data locally.

---

## How to Run

1. **Clone the repository**:
   git clone https://github.com/Nani2139/RBAC-UI.git
   cd RBAC

2. **Install dependencies**:
  npm install
  
3. **Start the app**:
  npm start


## Using the Application

Add Roles: Start by creating roles with specific permissions.
Add Users: Click the "Add User" button to add a new user and assign a role.
Edit Users: Click the "Edit" button next to a user’s record to update their details or change their role.
Delete Users: Remove users using the "Delete" button.
Responsive Design: The tables and forms adjust automatically for different screen sizes.


