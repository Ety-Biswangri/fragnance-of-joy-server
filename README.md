# Project Name: Fragnance Of Joy

Live Website Link: [Fragnance Of Joy](https://fragnance-of-joy.firebaseapp.com/)


## Project Description

This project is about Perfume Warehouse Management. In this project, website users can see the all Perfumes item with their detail informations. After creating account, website users can manage the inventory items such as add new item, delete item and update the quantity of any item. Users can see the newly added item in a different section and the specific items added by the user will be desplayed on the "My Items" route.


## Project Features and Functionalities

### Client-Side:
*  User can Register and Login to this website using email address and password or using Google Sign In method
* User can see all the the inventory items (Perfumes) with their descriptions
* User can manage (add, delete, update item quantity) all the inventory items 
* Latest four perfume items are displayed in the "Latest Perfumes" section on Home page
* In "My Items" page, user can see the items added by her/him

### Server-Side:
* Products data are stored in MongoDB database
* User Authentication (email/password and Google sign in) is implemented using Firebase Authentication
* Email verification after registration and password resetting are implemented
* APIs are secured by using JWT for accessing the protected routes: Manage Inventories, My Items, Add Items
* GET, POST, PUT, DELETE APIs are implemented for reading, creating, updating and deleting any item from the database

## Technologies
* React.js
* Node.js
* Express.js
* React Router
* React Bootstrap
* Firebase Authentication
* MongoDB
