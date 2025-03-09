# swift-code-application

Features:
- Add, retrieve, and delete Swift Codes.
- Search Swift Codes by countryISO2.
- Import Swift Codes from an Excel (.xlsx) file (already included in a project).
- React frontend for interacting with the API.
- Uses Gradle for build and dependency management.
- Integration with PostgreSQL.
- Unit tests to ensure system reliability.

Prerequisites:
-Java 17+
-Gradle
-PostgreSQL
-Node.js 18+ (for frontend)

 Database Configuration:
 1. Create a PostgreSQL database:  CREATE DATABASE swiftdb;
 2. Update application.properties in src/main/resources/ with your database details:
    -spring.datasource.username=your_username
    -spring.datasource.password=your_password

  Backend Setup (Spring Boot + Gradle):
  1. Clone the repository:
     -git clone https://github.com/your-username/swift-code-api.git
     -cd swift-code-api
  2. Build the project: ./gradlew build
  3. Run the Spring Boot application: ./gradlew bootRun
  The API will be available at: http://localhost:8080/v1/swift-codes

 Frontend Setup (React):
 1. Install dependencies: npm install
 2. Navigate to the frontend directory: cd .\swift-code-frontend\
 3. Start the React application: npm start
  The UI will be available at: http://localhost:3000

 API Endpoints:
  1. GET    	/v1/swift-codes/{swiftCode}	            Retrieve Swift Code by swiftCode
  2. GET    	/v1/swift-codes/country/{countryISO2}	  Get Swift Codes by countryISO2
  3. POST  	/v1/swift-codes                        	Add a new Swift Code
  4. DELETE	/v1/swift-codes/{swiftCode}            	Delete Swift Code by swiftCode
  5. POST	  /v1/swift-codes/upload	                Import Swift Codes from Excel
