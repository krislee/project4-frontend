# Project Overview

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 3| Create login/signup page | Complete
|Day 3| Can create new genres on genre dashboard| Complete
|Day 3| Can list all genres on genre dashboard| Complete
|Day 3| Can update genres on genre dashboard| Complete
|Day 3| Can delete genres on genre dashboard| Complete
|Day 4| Can create new books on book dashboard| Complete
|Day 4| Can list all books on book dashboard| Complete
|Day 4| Can update books on book dashboard| Complete
|Day 4| Can delete books on book dashboard| Complete
|Day 5| CSS & Bug Fixes | Complete
|Day 6| Final Touches & CSS | Incomplete

## Backend
Click [here](https://github.com/krislee/project4-backend) to view backend repository.

## Live Website
Click [here](https://official-library.netlify.app/#/) to view live website.

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
| Responsive Navigation Bar | H | 2hr | 0.5hr | 0.5hr|
| User login/sign up page | H | 4hr | 7hr | 7hr|
| Genre Dashboard | H | 3hr | 1hr | 1hr|
| Modal for create button for genre | H | 1.5hr| 0.5hr | 0.5hr |
| Create function for create genre modal| H | 3hr | 1hr | 1hr|
| Modal for update button for genre | H | 2hr| 5hr | 5hr |
| Update function for update genre modal | H | 3hr | 3hr | 3hr|
| Delete function for genre | H | 1.5hr | 0.5hr | 0.5hr|
| Book dashboard | H | 3hr | 5hr | 5hr|
| Modal for one book display | H | 2hr | 5hr | 5hr|
| Modal for create button for book  | H | 2hr | 1hr | 1hr|
| Create function for create book modal | H | 3hr | 1.5hr | 1.5hr|
| Modal for update button for book | H | 1hr| 2hr | 2hr |
| Update function for update book modal | H | 4hr | 3hr | 3hr|
| Delete function for book | H | 1.5hr | 0.5hr | 0.5hr|
| Test mobile responsiveness | H | 4hr | 3hr | 3hr|
| CSS | H | 5hr | 8hr | 8hr|
| Total | H | 45.5hrs| 47.5hrs | 47.5hrs |

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| CSS Animation | L | 3hr | 0hr | 0hr|
| Search function | M | 3hr | 0hr | 0hr|
| Refractor code | M | 3hr | 5hr | 5hr|
| Research GoodReads API | H | 6hr | 0hr | 0hr|
| Use GoodReads API | H | 6hr | 0hr | 0hr|
| Make own icon | L | 2hr | 0hr | 0hr|
| Total | H | 23hrs| 6hrs | 6hrs |

## Additional Libraries
- Bootstrap
- Buefy (?) 

## Code Snippet

To output the book information on a modal when the book is clicked posed a dilemma. The code for the modal could not be placed inside the loop that went through each book to display each of the book's information. This is because when the book is clicked all the modals for all the books opened as well. Therefore, the code for the modal needed to be placed outside of the loop. Yet, being outside of the loop meant meant the modal would not have access to the book's information. To overcome this, another method needs to be created to do a get request for the information of one book. In the method, the information is stored in several data which will be called in the template and will be run when one book is clicked. 

```html
<template>
	..............
	<div class="bookContainer">
      	<div class="books" v-for="book of books" v-bind:key="book.id" v-bind:id="book.id">
			<div v-bind:style='{ backgroundSize: "cover", backgroundImage: `url("${book.photo}")` }' v-bind:id="book.id" @click="getOneBook">
			<h1 v-bind:id="book.id" v-if='book.photo == ""' class="bookTitle">{{book.title}}</h1>
			<h2 v-bind:id="book.id" v-if='book.photo == ""' class="bookAuthor">{{book.author}}</h2>
			</div>
			<div>
				<div class="bookStatusIcon" v-if="bookIconRead = book.status == 0 ? true: false"><i class="fas fa-check-circle"></i></div>
				<div class="bookStatusIcon" v-if="bookIconInProgress = book.status == 1 ? true: false"><i class="fas fa-book-open"></i></div>
				<div class="bookStatusIcon" v-if="bookIconNotRead = book.status == 2 ? true: false"><i class="fas fa-book"></i></div>
			</div>
      	</div>
		<b-modal v-model="isCardModalActive" scroll="keep">
			<div class="card review-card">
			<div class="card-content" >
				<!-- TABS -->
				<b-tabs type="is-boxed" expanded>
				<!-- BOOK INFO -->
				<b-tab-item label="Information">
					<div class="singleTitle" v-if="!editBookInfo"><b class="modalInfo"> Title: </b>{{singleBookTitle}}</div><br>
					..............
					<div class="singleAuthor" v-if="!editBookInfo"><b class="modalInfo">Author: </b>{{singleBookAuthor}}</div><br>
					..............
					<div class="singleStatus" v-if="!editBookInfo"><b class="modalInfo">Status: </b>{{singleBookStatus}}</div><br>
					..............
				</b-tab-item>
				<!-- BOOK REVIEW -->
				<b-tab-item label="Review">
					..............
					<div class="content" id="content-review">
					<div class=singleReview v-if="!editBookReview">{{singleBookReview}}</div>
					..............
					</div>
				</b-tab-item>
				</b-tabs>
			</div>
			</div>
		</b-modal>
		..............	
<template>
```
```javascript
getOneBook: function(e){
	const {token, loggedIn, URL, genreId} = this.$route.query
	this.loggedIn = loggedIn
	this.isCardModalActive = true
	this.bookId = e.target.id
	fetch(`${URL}/library/genres/${genreId}/books/${this.bookId}`, {
	method: 'get',
		headers: {
		authorization: `JWT ${token}`
		}
	})
	.then(response => response.json())
	.then(data => {
	console.log(data)
	this.singleBookTitle = data.title
	this.singleBookAuthor = data.author
	this.singleBookReview = data.review
	this.singleBookStatus = data.status

	if(this.singleBookReview == ""){
		this.displayBookReviewAlert = true
	} else {
		this.displayBookReviewAlert = false
	}

	if(data.status == 0){
		this.singleBookStatus = "Read"
	} else if(data.status == 1){
		this.singleBookStatus = "In Progress"
	} else {
		this.singleBookStatus = "Have Not Read"
	}
	})
}
```

## Issues and Resolutions

**ERROR**: Access to fetch at 'https://libraryproj.herokuapp.com/library/genres/11/books/13/' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.                                 
**RESOLUTION**: The error is relayed when making a patch request but not a put request. The updateBook and updateBookReview methods are revised to make fetches with put requests instead of patch requests. 