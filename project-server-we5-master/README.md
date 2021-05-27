# Pet Care

Web Client application which helps in creating a pet care community where we can sell pets and their services.

## Backend Application

## Team Members

1. Nikhil Gogineni
2. Anusha Mamidala
3. Rahul Yadav Dasari
4. Sahith Reddy
5. Shivalok netha Rudra
6. Madhav Reddy Chintapalli
7. Mikhail Udotov

## Steps to run the application

1. run `npm install`
2. run `npm start`

## Test login details

Local Endpoint : http://localhost:5000/login \
Hosted Endpoint: https://pet-care-endpoint.herokuapp.com/ \
METHOD: POST \
body: 
{
  "email": "test@test.com",
  "password: "test"
}

## Contribution

### Nikhil Gogineni

1. Login ( Authorization & Authentication )
- Logins in the user and returns the tokens
2. Register
  - Registers a new user and returns a new token
3. Terms and conditions
  - Returns all the terms and conditions from the database
4. Image File uploader across app
  - Utility helper to update images and save them on server and returns them when targeted with a path
5. Auth middleware to authenticate every request and add userId and isAdmin to the headers

### Anusha Mamidala

1. Sales
  - Create, update, get and delete on all pet sales 
2. Tutorials
  - Update content by admin and get all tutorials

### Sahith Reddy Kaluvala

1. Onboarding
2. Events - Create, Update and delete events
3. Edit profile

### Madhav Reddy Chintapalli

1. Services

### Shivalok Netha Rudra

1. Lost-pet - Create,update,delete lost pet collection
2. Found-pet - Create,update,delete lost pet collection
3. Bookmarks -Post,delete collection
4. Inappropriate posts- Gt,Post,Delete Collections


### Rahul Yadav Dasari
1. Contact Us- Create
2. Feeds-Get all latest feeds, update feeds,post new feed,delete feed.
3. Mark as Spam-admin can mark the feed as spam.
