[![Build Status](https://travis-ci.org/daddychukz/OLMS.svg?branch=refactored)](https://travis-ci.org/daddychukz/OLMS)
[![Coverage Status](https://coveralls.io/repos/github/daddychukz/OLMS/badge.svg?branch=refactored)](https://coveralls.io/github/daddychukz/OLMS?branch=refactored)
[![Code Climate](https://codeclimate.com/github/daddychukz/OLMS.png)](https://codeclimate.com/github/daddychukz/OLMS)


# HELLO BOOKS LIBRARY MANAGEMENT SYSTEM
API model for hello-books library management system that helps automate the processes of a library. The system allow performance of the actions needed in order to manage the library in a simple convenient way. Processes for the library management includes addition/removal of books, addition/removal of members/users, member and book searches, membership level that determines the borrowed limit. The system prevents access or modification of data by users not granted the proper permissions.

<b>View App Here</b> https://hello-books.herokuapp.com

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Front-end: React/Redux + Material Design Framework (To be Implemented)</li>
  <li>Back-end: Node/Expressjs + Sequelize/Postgres</li>
  <li>Libraries: jsonwebtoken, ES6, Babel-CLI, eslint, Mocha/Chai + chai-http</li>
  <li>Postman</li>
</ul>

<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/users/signup</td>
      <td>Creates New User</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/users/signin</td>
      <td>Logs in a User</td>
  </tr>
  
  <tr>
      <td>POST</td>
      <td>/api/books</td>
      <td>Add a new book</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/books/<bookId></td>
      <td>Modify Book information</td>
  </tr>
  
  <tr>
      <td>GET</td>
      <td>/api/books</td>
      <td>Get all available books in the library</td>
  </tr>
  
  <tr>
      <td>GET</td>
      <td>/api/users/<userId>/books?returned=false</td>
      <td>View books borrowed but yet to be returned</td>
  </tr>
  
  <tr>
      <td>POST</td>
      <td>/api/users/<userId>/books</td>
      <td>Borrow book from the Library</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/users/<userId>/books</td>
      <td>Return book borrowed</td>
  </tr>
</table>

<h2>Users</h2
<hr>

<h3>Signup</h3>
<hr>
To Register as a regular User, make a <b>POST</b> request to the end-point /api/users/signup

<h4>Request</h4>
<b>POST:</b> /api/users/signup <br>
<br>
{<br>
    'fullName': 'adminu',<br>
    'email': 'amin@gmail.com',<br>
    'sex': 'male',<br>
    'userName': 'amin',<br>
    'phoneNumber': 08099098765,<br>
    'password': 'pass',<br>
    'memLevel': 'Silver'<br>
}<br>

<h3>Mock Response</h3>
<hr><br>
{<br>
    "message": "User Successfully Registered",<br>
    "regUser": {<br>
        "isAdmin": false,<br>
        "id": 4,<br>
        "fullName": "adminu",<br>
        "email": "amin@gmail.com",<br>
        "sex": "male",<br>
        "userName": "amin",<br>
        "phoneNumber": "08099098765",<br>
        "password": "$2a$08$ROmRyF6O9UMe62kIsOSq0OkmjPDhEaL2bQ./JuNgPHAay8KvzcyFG",<br>
        "memLevel": "Silver",<br>
        "updatedAt": "2017-08-11T06:44:06.834Z",<br>
        "createdAt": "2017-08-11T06:44:06.834Z",<br>
    }
}
