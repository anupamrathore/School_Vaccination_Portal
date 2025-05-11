# School_Vaccination_Portal
**School Vaccination Portal**: A web application enabling school coordinators to schedule and manage vaccination drives, assign students to drives, and track vaccination statuses.


**1.** **System Overview**

**Title: School Vaccination Portal** – A School Vaccination Management System

Description: A web application enabling school admins/coordinators to schedule and manage vaccination drives, assign students to drives, and track vaccination statuses.

**Key Features:**

•	**Dashboard**: Manage students, vaccination drives, and generate reports.

•	**Student Portal**: View assigned drives and vaccination statuses.

•	**Vaccination Drives**: Schedule, approve, and manage drives.

•	**Assignments**: Assign students to specific drives.



**2.** **Application Architecture**

      **Frontend**:

            •	Framework: React.js
            
            •	State Management: React Context API
            
            •	Routing: React Router
            
            •	Styling: CSS Modules / Styled Components


      **Backend:**

            •	Framework: node.js/ express.js

            •	Database: MongoDB with Mongoose ORM

            •	Authentication: JWT (JSON Web Tokens)


        **Communication**:

            •	API: RESTful endpoints

            •	HTTP Client: Axios for API requests



**3. Frontend-Backend Interaction**

          **Frontend:**

            •	Forms: Collect data for students and vaccination drives.

            •	Tables: Display lists of students and drives.

            •	Modals: For adding/editing entries.


            **Backend:**

            •	**Endpoints:**
                
                o	POST /api/students: Add new student.

                o	GET /api/students: Fetch all students.

                o	POST /api/drives: Schedule a new vaccination drive.

                o	GET /api/drives: Fetch all upcoming drives.


            •	**Data Handling**

                o	Use of axios for making HTTP requests.

                o	State management with React's useState and useEffect hooks.




**LOGIN FLOW & WIREFRAMES:**

**Login Page:**

![image](https://github.com/user-attachments/assets/eb0583e7-6b14-428b-9b68-c9eece95cf61)


**Dashboard Page:**

![image](https://github.com/user-attachments/assets/2feeda54-3d9e-4062-b663-0637db66dc9a)


**Manage Student (Student Page)  - Add Students & Edit existing students**

![image](https://github.com/user-attachments/assets/01eed0fa-a253-414c-a727-e82412301fd1)
![image](https://github.com/user-attachments/assets/f7d0c6f9-1439-47e7-be4c-0b77f64b1de5)


**Schedule a Vaccination Drive**

![image](https://github.com/user-attachments/assets/3a21caf1-5d11-4795-89c5-f943bb5e2d17)



