# Project Overview

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 2| Working RestAPI | Incomplete
|Day 3| Core Application Structure (HTML, CSS, etc.) | Incomplete
|Day 4| MVP & Bug Fixes | Incomplete
|Day 5| Final Touches and Present | Incomplete

## Project Description
The Book Collection Tracker is a tracker for book lovers to keep track of the books they are reading. The application is built using Python Django framework for the backend server and Postgres SQL for the database to store all the user's books. It consists of three models, which are the user, genre, and book models. These models have a one to many relationship, where one user has many genres and books, and one genre has many books under that genre. By setting up the models and serializers, the tracker has a RESTful API that allows book lovers to create, read, update, and delete the books they are reading. 

## User Stories 
User sees a login/sign up page first
After logging in, user will see the genre cards
User can add genre cards to the library
User can also update the genre or delete the genre from the library
User can click on each genre card to see all the books in the genre
User can view the books in a flex or grid format
User can add books with a review of the book
User can keep track of the reading progree for the book
User can update or delete the book

## Wireframe

- [Mobile](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1600036729/Screen_Shot_2020-09-12_at_11.47.47_AM_fue0tb.png)
- [Tablet](https://git.generalassemb.ly/SEIR-629/project-1-portfolio/blob/master/readme-assets/nav-highlight.gif)
- [Desktop](https://git.generalassemb.ly/SEIR-629/project-1-portfolio/blob/master/readme-assets/desktop.png)


## Time/Priority Matrix 

- [Time/Priority Matrix] (https://res.cloudinary.com/dhiwn0i0g/image/upload/v1600042851/Front_End_Board_1_cle1h8.jpg)

### MVP/PostMVP - 5min
#### MVP (examples)

- User login/sign up page
- Genre Dashboard
- Make modals for create and update genre
- Develop CRUD functions for genre
- Book Dashboard
- Make modal for one book display
- Make modals for create and update book
- Develop CRUD functions for book
- Mobile responsiveness
- Navigation bar


#### PostMVP 

- CSS Animations/improve CSS display
- Add search functionality
- Refractor code
- Use GoodReads API

## Functional Components
#### MVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Responsive Navigation Bar | H | 2hr | -hr | -hr|
| User login/sign up page | H | 4hr | -hr | -hr|
| Genre Dashboard | H | 3hr | -hr | -hr|
| Modal for create button for genre | H | 1.5hr| -hr | -hr |
| Create function for create genre modal| H | 3hr | -hr | -hr|
| Modal for update button for genre | H | 2hr| -hr | -hr |
| Update function for update genre modal | H | 3hr | -hr | -hr|
| Delete function for genre | H | 1.5hr | -hr | -hr|
| Book dashboard | H | 3hr | -hr | -hr|
| Modal for one book display | H | 2hr | -hr | -hr|
| Modal for create button for book  | H | 2hr | -hr | -hr|
| Create function for create book modal | H | 3hr | -hr | -hr|
| Modal for update button for book | H | 1hr| 2hr | -hr |
| Update function for update book modal | H | 4hr | -hr | -hr|
| Delete function for book | H | 1.5hr | -hr | -hr|
| Test mobile responsiveness | H | 4hr | -hr | -hr|
| Total | H | 40.5hrs| -hrs | -hrs |

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| CSS Animation | L | 3hr | -hr | -hr|
| Search function | M | 3hr | -hr | -hr|
| Refractor code | M | 3hr | -hr | -hr|
| Research GoodReads API | H | 6hr | -hr | -hr|
| Use GoodReads API | H | 6hr | -hr | -hr|
| Make own icon | L | 2hr | -hr | -hr|
| Total | H | 23hrs| -hrs | -hrs |

## Additional Libraries
- Bootstrap
- Buefy (?) 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object

## Previous Project Worksheet
 - [Readme's](https://github.com/jkeohan/fewd-class-repo/tree/master/final-project-worksheet/project-worksheet-examples)
 - [Best of class readme](https://github.com/jkeohan/fewd-class-repo/blob/master/final-project-worksheet/project-worksheet-examples/portfolio-gracie.md)