# Dataset Microservice

## Installation and How to Run the Project

1. First, run the following command to install project dependencies: 'npm install'

2. Next, start the server using nodemon: 'nodemon server.js'



## API Endpoints

### Add a New Record
- **Endpoint:** POST `/records`
- **Description:** Add a new record to the dataset.
- **Payload:** JSON object with the following fields:
- `name` (required): Name of the record.
- `salary` (required): Salary of the record.
- `currency`: Currency of the salary (optional).
- `department`: Department of the record (optional).
- `on_contract`: Whether the record is on contract (optional).
- `sub_department`: Sub-department of the record (optional).

### Delete a Record
- **Endpoint:** DELETE `/records/:id`
- **Description:** Delete a record by its ID.

### Get Summary Statistics
- **Endpoint:** GET `/statistics`
- **Description:** Fetch summary statistics for salary over the entire dataset.

### Get Summary Statistics for "on_contract" Records
- **Endpoint:** GET `/statistics/on_contract`
- **Description:** Fetch summary statistics for salary for records with "on_contract" set to true.

### Get Summary Statistics for Each Department
- **Endpoint:** GET `/statistics/department`
- **Description:** Fetch summary statistics for salary for each department.

### Get Summary Statistics for Each Department and Sub-department Combination
- **Endpoint:** GET `/statistics/department/:sub_department`
- **Description:** Fetch summary statistics for salary for each department and sub-department combination.

## Basic Authentication
- **Username:** umar
- **Password:** pass

To test authorization in Postman:
1. Create a new request.
2. Set the HTTP method to the appropriate method for the endpoint you want to test.
3. Enter the URL of the endpoint in the request URL field.
4. Click on the Authorization tab.
5. Select the Basic Auth option from the Type dropdown menu.
6. Enter the username and password (provided above) in the Username and Password fields, respectively.
7. Click on the Send button to send the request.
8. If the authentication is successful, you will receive a valid response. Otherwise, you will see an error message.


