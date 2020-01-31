Read Me
# Back-End

Canvas: https://docs.google.com/document/d/15fyHtDMsf4l-Qv8TlZEEhR0hsTqma8a5Z82tCZxhawU/edit

# DevDesk Queue

This is the repository for **DevDesk Queue Back End** project.

# API URL
https://devdeskbe.herokuapp.com

# Endpoints

| Method | URL | Description |
| -- | -- | -- |
| Users | -- | -- |
| POST | /auth/user/register |Adds user creds to DB. Returns id, full_name, email of user, and JWT |
| POST | /auth/user/login | Allows user access. Returns the user info, success message, and JWT |
| GET | /user/ | Returns all the users in the db|


| Method | URL | Description |
| -- | -- | -- |
| Admin | -- | -- |
| POST | /auth/admin/register |Adds user creds to DB. Returns id, full_name, email of user, and JWT |
| POST | /auth/admin/login | Allows Admin access. Returns the user info, success message, and JWT |
| GET | /auth/admin | Returns all the users in the db|


| Method | URL | Description |
| -- | -- | -- |
| Tickets | -- | -- |
| GET | /auth/user/:user_id/tickets |Return all the ticket for a user with the user_id provided |
| POST | /auth/user/:user_id/tickets |Add ticket to the db for the user at user_id|
| GET | /auth/user/tickets | Return all the tickets in the database |
| GET | /auth/user | Returns all the users in the db|


# Schema

### Users

| field | data type        | metadata |
| ----- | ---------------- | -- |
| id    | unsigned integer | primary key, auto-increments, generated by database |
| full_name | string        | required|
| password | string | required, encrypted by the server |
| email | string | required unique|
### User Object
```js
    {
        full_name: 'John Doe',
        email: 'john@doe.com'
        password: 'password1'
    }
```
### User Return Object
```js
    {
    "message": "Successfully created a new user",
    "user": {
        "id": 3,
        "full_name": "John"
        }
    }
```

### Admin

| field | data type        | metadata |
| ----- | ---------------- | -- |
| id    | unsigned integer | primary key, auto-increments, generated by database |
| full_name | string        | required|
| password | string | required, encrypted by the server |
| email | string | required unique|

### Admin Object
```js
    {
        full_name: 'Admin Doe',
        email: 'admmin@doe.com'
        password: 'password1'
    }
```
### Admin Return Object
```js
    {
    "message": "Successfully created a new Admin",
    "user": {
        "id": 3,
        "full_name": "John"
        }
    }
```

### Tickets 
