# Project Title
NavBCIT

## 1. Project Description  
This browser based web application is to display an interactive map of BCIT that shows small details such as washrooms, water fountains, and pinpoints the location of all your classrooms.  

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Mohamed! let's create our first project.
* Hi I am Allan Nguyen! I am very excited to create my first project with others! 
* greeting Jonathan Y
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Node JS
* Google maps API

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Clone or fork the project through git
* Download Node JS 
* Put in your Firebase API key in a seperate script called "firebaseAPI_TEAMBBY4.js"
* Put your Google Maps API key in a seperate script called "GoogleAPI_BBY4.js" and export ONLY the key using "export default" in that 
  JS file

## 5. Known Bugs and Limitations
Here are some known bugs:
* Navigation feature is not real-time making the user have to keep creating a route if they wonder off the created route
* Dark mode doesn't currently work for map or any other pages aside from the settings
* A lot of data is stilling missing like certain washrooms, microwaves, classrooms, and many more
* Buttons on the infocard are still missing

## 6. Features for Future
What we'd like to build in the future:
* Adding local food in the area
* Accessibility needs like elevators and ramps
* Clean up the UI and add animations to certain features
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── app                     # Stores the HTML of the app
├── public                  # Stores the client side of the app (Images, JS files, CSS)
├── package.json
├── package-lock.json
├── .gitignore              # Git ignore file
├── main.js                 # JS file to be run by Node
└── README.md

It has the following subfolders and files:
├── .git                    # Folder for git repo
├── app                     
    /html                   # Folder for the HTML of the app
    /index.html             # The landing page of our app
    /login.html             # The login page of our app
    /main.html              # The main page of our app where the map loads in
    /favourites.html        # The page that loads up the user's favourited place's 
    /infoCard.html          # The card that pops up when a user clicks on a marker
├── public
    /scripts                # Folder for scripts
        /map.js             # main script file for handeling the map and all its functionality  
        /authentication.js  # Handles the user login and authentication of the user
        /favourites.js      # Handles the favourites system
        /datastore.js       # Loads all the fata within the 'Features' collection onto the map


```


