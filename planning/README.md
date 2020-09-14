# Project Overview

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 3| Create login/signup page | Incomplete
|Day 3| Can create new genres on genre dashboard| Incomplete
|Day 3| Can list all genres on genre dashboard| Incomplete
|Day 3| Can update genres on genre dashboard| Incomplete
|Day 3| Can delete genres on genre dashboard| Incomplete
|Day 4| Can create new books on book dashboard| Incomplete
|Day 4| Can list all books on book dashboard| Incomplete
|Day 4| Can update books on book dashboard| Incomplete
|Day 4| Can delete books on book dashboard| Incomplete
|Day 5| CSS & Bug Fixes | Incomplete
|Day 6| Final Touches & CSS | Incomplete

## Backend
Click [here](https://github.com/krislee/project4-backend) to view backend repository.

## Live Website
Click [here](https://project4-ga.netlify.app/#/) to view live website.

## Project Description
The Book Collection Tracker is a tracker for book lovers and students to keep track of the books they are readind. It will allow them to track the progress of their reading status of each book and what they thought of the book. The frontend application is built using Vue framework and Boostrap CSS library. The tracker allows user to sign up and login to their book collection. The book collection will consist of a genre dashboard, listing all the genres the user has made, and a book dashboard, listing all the books of each genre the user has created. The user also has the option of updating and deleting the genres or books in their respective dashboards. 

## User Stories 
- User sees a login/sign up page first
- After logging in, user will see the genre cards
- User can add genre cards to the library
- User can also update the genre or delete the genre from the library
- User can click on each genre card to see all the books in the genre
- User can view the books in a flex or grid format
- User can add books with a review of the book
- User can keep track of the reading progree for the book
- User can update or delete the book

## Wireframe

- [Mobile](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1600045219/Screen_Shot_2020-09-13_at_8.59.26_PM_n4n5yn.png)
- [Tablet](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1600045229/Screen_Shot_2020-09-13_at_8.59.36_PM_e4nplg.png)
- [Desktop](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1600045229/Screen_Shot_2020-09-13_at_8.59.36_PM_e4nplg.png)


## Time/Priority Matrix 

- [Time/Priority Matrix](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1600042851/Front_End_Board_1_cle1h8.jpg)

### MVP/PostMVP - 5min
#### MVP 

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