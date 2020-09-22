<template>
  <div class="container">
    <div class="create-button-container">
      <button class="addBook" @click="createCardModalActive = true"><i @click="createCardModalActive = true" class="fas fa-plus"></i></button>
    </div>
    <!-- CREATE BOOK MODAL -->
    <b-modal v-model="createCardModalActive" :width="640" scroll="keep" id="create-modal">
      <div class="card">
        <div class="card-content" id="create-modal" >
          <div class="media" >
            <div class="media-content">
              <p class="title is-4">Create Book</p>
            </div>
          </div>
          <div class="field" id="field-create">
            <b-field label="Title" class="longer-width">
              <b-input v-model="title" maxlength="30"></b-input>
            </b-field>
            <b-field label="Author" class="longer-width">
              <b-input v-model="author" maxlength="40"></b-input>
            </b-field>
            <b-field label="Status" class="longer-width" id="status-container-create">
              <b-radio v-model="status" name="status" native-value="Read">Read</b-radio>
              <b-radio v-model="status" name="status" native-value="In Progress">In Progress</b-radio>
              <b-radio v-model="status" name="status" native-value="Not Read">Not Read</b-radio>
            </b-field>
            <b-field label="Book Cover" message="Add a book cover image URL to personalize your book display" class="longer-width">
              <b-input v-model="imageURL" type="text"></b-input>
            </b-field>
            <b-button @click="createBook">Submit</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- END OF CREATE BOOK MODAL -->
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
      <!-- MODAL OUTSIDE OF LOOP -->
        <b-modal v-model="isCardModalActive" scroll="keep">
          <div class="card review-card">
            <div class="card-content" >
              <!-- TABS -->
              <b-tabs type="is-boxed" expanded>
                <!-- BOOK INFO -->
                <b-tab-item label="Information">
                  <div class="singleTitle" v-if="!editBookInfo"><b class="modalInfo"> Title: </b>{{singleBookTitle}}</div><br>
                  <b-input v-model="editTitle" v-if="editBookInfo" maxlength="100" placeholder="Title"></b-input>
                  <div class="singleAuthor" v-if="!editBookInfo"><b class="modalInfo">Author: </b>{{singleBookAuthor}}</div><br>
                  <b-input v-model="editAuthor" v-if="editBookInfo" maxlength="40" placeholder="Author"></b-input>
                  <div class="singleStatus" v-if="!editBookInfo"><b class="modalInfo">Status: </b>{{singleBookStatus}}</div><br>
                  <b-field class="longer-width" v-if="editBookInfo" id="status-container">
                    <b-radio v-model="editStatus" name="status" native-value="Read">Read</b-radio>
                    <b-radio v-model="editStatus" name="status" native-value="In Progress">In Progress</b-radio>
                    <b-radio v-model="editStatus" name="status" native-value="Not Read" checked>Not Read</b-radio>
                  </b-field>
                  <b-input v-model="editImageURL" v-if="editBookInfo" placeholder="Book Cover URL"></b-input>
                  <div class="submit-button-container">
                    <b-button class="submit-book-info" v-on:click="updateBook" v-if="editBookInfo">Submit</b-button>
                    <b-button class="submit-book-info" @click="editBookInfo = !editBookInfo" v-if="editBookInfo">Back</b-button>
                  </div>
                  <div class="button-book-container">
                    <span v-if="!editBookInfo" @click="editBookFields"><i class="far fa-edit"></i></span>
                  </div>
                </b-tab-item>
                <!-- BOOK REVIEW -->
                <b-tab-item label="Review">
                  <div v-if="displayBookReviewAlert">Click the edit icon to add or edit a review.</div>
                  <div class="content" id="content-review">
                    <div class=singleReview v-if="!editBookReview">{{singleBookReview}}</div>
                    <b-input class="textArea"  v-on:keyup.enter="enterNewLine" v-model="editReview" v-if="editBookReview" type="textarea"></b-input>
                    <div class="review-edit-button">
                      <b-button @click="updateBookReview" v-if="editBookReview">Submit</b-button>
                      <b-button @click="editBookReview = !editBookReview" v-if="editBookReview">Back</b-button>
                    </div>
                  </div>
                  <div class="button-book-container">
                    <span v-if="!editBookReview" @click="editBookReviewField"><i class="far fa-edit"></i></span>
                  </div>
                </b-tab-item>
                <b-tab-item label="Delete">
                  <div class="deleteAlert">
                    <p><b>Are you sure you want to delete?</b></p> <br> 
                    <b-button type="is-danger" @click="deleteBook">Yes</b-button>
                    <b-button type="is-light" @click="isCardModalActive = false">No</b-button>
                  </div>
                </b-tab-item>
              </b-tabs>
            </div>
          </div>
        </b-modal>
        <!-- END OF MODAL -->
      <!-- EMPTY BOOK PAGE -->
      <div v-if="createBookPage">
        <b>Click the + to add books to your collection</b>
      </div>
    </div>
  </div>
</template>

<script>
// import ModalForm from '../components/BookCreateModal.vue'

export default {
  name: 'Book',
  components: {
    // ModalForm
  },
  data: function(){
    return {
      books: {},
      loggedIn: false,
      // FOR NO BOOKS
      createBookPage: false,
      // FOR MODALS
      isCardModalActive: false,
      createCardModalActive: false,
      createBookModal: false,
      // CREATING BOOK FIELDS
      title: "",
      author: "",
      status: "Not Read",
      review: "",
      imageURL: "",
      emptyTitleField: false,
      emptyAuthorField: false,
      // FOR RETRIEVING ONE BOOK
      bookId: 0,
      singleBookReview: "",
      singleBookStatus: "",
      singleBookTitle: "",
      singleBookAuthor: "",
      bookIconRead: false,
      bookIconInProgress: false,
      bookIconNotRead: false,
      // EDIT BOOK:
      editCardModalActive: false,
      editTitle: "",
      editAuthor: "",
      editStatus: 0,
      editReview: "",
      editImageURL: "",
      displayBookReviewAlert: false,
      editBookInfo: false,
      editBookReview: false
    }
  },
  created: function(){
    this.listBooks()
  },
  methods: {
    getOneBook: function(e){
      const {token, loggedIn, URL, genreId} = this.$route.query
      this.loggedIn = loggedIn
      // Modal to show the book info will pop up
      this.isCardModalActive = true
      // Store the id of the book to bookId to be used later for update or delete
      this.bookId = e.target.id

      fetch(`${URL}/library/genres/${genreId}/books/${this.bookId}`, {
        method: 'get',
          headers: {
            authorization: `JWT ${token}`
          }
      })
      .then(response => response.json())
      .then(data => {
        this.singleBookTitle = data.title
        this.singleBookAuthor = data.author
        this.singleBookReview = data.review
        this.singleBookStatus = data.status
        // If no review has been made yet a div containing the statement to make the review will appear 
        if(this.singleBookReview == ""){
          this.displayBookReviewAlert = true
        } else {
          this.displayBookReviewAlert = false
        }
        // Convert the statuses sent from server as integer to strings
        if(data.status == 0){
            this.singleBookStatus = "Read"
        } else if(data.status == 1){
          this.singleBookStatus = "In Progress"
        } else {
          this.singleBookStatus = "Have Not Read"
        }
      })
    },
    listBooks: function(){
      const {loggedIn, token, URL, genreId} = this.$route.query
      this.loggedIn = loggedIn

      fetch(`${URL}/library/genres/${genreId}/books`, {
        method: 'get',
          headers: {
            authorization: `JWT ${token}`
          }
      })
      .then(response => response.json())
      .then(data => {
        if(Array.isArray(data)){
          // Div that states create books will not display since there are no books
          this.createBookPage = true
          // Even though on the server side the book is deleted the last book is still displayed so when the message that states there are no books after deleting the last book, we empty the books data
          this.books = {}
        } else {
          // Loop through books data in template
          this.books = data.results
          // If no review has been made yet a div containing the statement to make the review will appear 
          this.singleBookReview = data.review
          if(this.singleBookReview == ""){
            this.displayBookReviewAlert = true
          }
        }
      })
    },
    createBook: function(){
      const {loggedIn, token, URL, genreId} = this.$route.query
      this.loggedIn = loggedIn

      if (this.title === "" && this.author === "") {
        this.alertEmptyField("Title and Author fields cannot be blank")
      } else if (this.author === "") {
        this.alertEmptyField("Author field cannot be blank")
      } else if (this.title === "") {
        this.alertEmptyField("Title field cannot be blank")
      } else {
        // Convert the reading statuses to integers to send back to server
        if(this.status === "Read"){
          this.stat = 0
        } else if(this.status === "In Progress"){
          this.stat = 1
        } else {
          this.stat = 2
        }
        // Title case the book title before sending to server
        this.title = this.titleBook(this.title)
        fetch(`${URL}/library/genres/${genreId}/books`, {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            authorization: `JWT ${token}`
          },
          body: JSON.stringify({
            title: this.title,
            author: this.author,
            status: this.stat,
            photo: this.imageURL,
            review: this.review,
            genre: Number(genreId)
          })
        })
        .then(response => response.json())
        .then(data => {
          // Server sends a message if book exists already, so alert will pop up
          if(data.message){
            this.alertUpdate()
          } else{
            // Modal for creating will close
            this.createCardModalActive = false
            // Books exist so div that states create books will not display
            this.createBookPage = false
            this.listBooks()
            // Empty out input fields after submitting create
            this.title = ""
            this.author = ""
            this.imageURL = ""
            this.review = ""
          }
        })
      }
    },
    // TITLE CASE THE BOOK TITLE
    titleBook: function(str){
      return str.replace(
        /\b\w+/g, function(s){
          return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
        }
      )
    },
    // POPULATE EDIT TITLE, AUTHOR, STATUS, URL FIELDS
    editBookFields: function(){
      this.editBookInfo = !this.editBookInfo

      const {loggedIn} = this.$route.query
      this.loggedIn = loggedIn

      const allBooks = this.books.find(book => {
        return book.id == this.bookId
      })
      this.editTitle = allBooks.title
      this.editAuthor = allBooks.author
      this.editStatus = allBooks.status
      this.editImageURL = allBooks.photo

      if (this.editStatus == 0){
        this.editStatus = "Read"
      } else if(this.editStatus == 1){
        this.editStatus = "In Progress"
      } else {
        this.editStatus = "Not Read"
      }
    },
    // POPULATE EDIT REVIEW FIELD
    editBookReviewField: function(){
      this.editBookReview = !this.editBookReview

      const {loggedIn} = this.$route.query
      this.loggedIn = loggedIn

      const allBooks = this.books.find(book => {
        return book.id == this.bookId
      })
      this.editReview = allBooks.review
    },
    // UPDATE BOOK TITLE, AUTHOR, STATUS, URL AFTER POPULATING BOOK FIELDS
    updateBook: function(){
      const {token, loggedIn, URL, genreId} = this.$route.query
      this.loggedIn = loggedIn

      // Title case the book before sending to server
      this.editTitle = this.titleBook(this.editTitle)

      // Convert reading status to integers to send back to server
      if(this.editStatus === "Read"){
        this.editStat = 0
      } else if(this.editStatus  === "In Progress"){
        this.editStat = 1
      } else {
        this.editStat = 2
      }
      fetch(`${URL}/library/genres/${genreId}/books/${this.bookId}`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
          authorization: `JWT ${token}`
        },
        body: JSON.stringify({
          title: this.editTitle,
          author: this.editAuthor,
          status: this.editStat,
          photo: this.editImageURL,
          genre: Number(genreId)
        })
      })
      .then(response => response.json())
      .then((data) => {
        if(data.message){
          this.alertUpdate()
        } else{
          this.listBooks()
          this.singleBookReview = data.review
          if(this.singleBookReview == ""){
              this.displayBookReviewAlert = true
          } else {
            this.displayBookReviewAlert = false
          }
          this.editTitle = ""
          this.editAuthor = ""
          this.editImageURL = ""
          this.editBookInfo = false
          this.isCardModalActive = false
        }
      })
    },
    // UPDATE BOOK REVIEW AFTER POPULATING FIELD
    updateBookReview: function(){
      const {token, loggedIn, URL, genreId} = this.$route.query
      this.loggedIn = loggedIn
      fetch(`${URL}/library/genres/${genreId}/books/${this.bookId}`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
          authorization: `JWT ${token}`
        },
        body: JSON.stringify({
          review: this.editReview,
          genre: Number(genreId),
          title: this.singleBookTitle,
          author: this.singleBookAuthor
        })
      })
      .then(response => response.json())
      .then((data) => {
        this.listBooks()
        this.singleBookReview = data.review
        if(this.singleBookReview == ""){
            this.displayBookReviewAlert = true
        } else {
          this.displayBookReviewAlert = false
        }
        this.editReview = ""
        this.editBookReview = false
        this.isCardModalActive = false
      })
    },
    // ALERT IF TITLE EXISTS WHILE CREATING OR UPDATING A BOOK
    alertUpdate: function(){
      this.$buefy.toast.open({
          duration: 2000,
          message: `<b>This book exists in your collection.</b>`,
          type: 'is-danger'
      })
    },
    // ALERT IF FIELDS ARE EMPTY WHEN CREATING BOOK
    alertEmptyField: function(message){
      this.$buefy.toast.open({
          duration: 2000,
          message: `<b>${message}</b>`,
          type: 'is-danger'
      })
    },
    // DELETE BOOK
    deleteBook: function(){
      const {token, loggedIn, URL, genreId} = this.$route.query
      this.loggedIn = loggedIn
      fetch(`${URL}/library/genres/${genreId}/books/${this.bookId}`, {
        method: 'delete',
        headers: {
          authorization: `JWT ${token}`
        }
      })
      .then(response => response.json())
      .then(() => {
        this.listBooks()
        this.editCardModalActive = false
        this.isCardModalActive = false
      })
    }
  }
}
</script>

<style>

  .content {
    height: 190px;
    overflow: auto;
    margin-bottom: 20px;
  }

  .bookContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .books {
    width: 100%;
    height: 300px;
    width: 200px;
    margin: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  .books > div:nth-child(1) {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    background: #d2d2d2; 
    border-radius: 15px;
    margin-bottom: 10px;
  }

  .books > div:nth-child(1) > h1 {
    font-size: 20px;
  }

  .books > div:nth-child(1) > h2 {
    font-size: 15px;
  }

  .books > div:nth-child(2) {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    width: 100%;
  }

  .button > .icon {
    display: none;
  }

  #create-modal > .modal-content {
    height: 500px;
  }

  #status-container-create {
    margin-bottom: 1rem;
  }

  .button-book-container > .dropdown > .dropdown-trigger > .is-primary {
    color: #000000 !important;
    background: white !important;
    margin-top: 0px !important;
    margin-bottom: 0px !important;
  }

  .animation-content {
    max-width: 500px !important;
    height: 350px;
    background: white;
    border-radius: 20px;
  }

  .card-content {
    background: white !important;
    padding: 1.75rem;
  }

  .review-title {
    border-bottom: 1px solid #d2d2d2;
  }

  .review-title > p {
    margin-bottom: 10px;
  }

  .bookTitle {
    font-size: 2em;
    width: 100%;
  }

  .bookAuthor{
    font-size: 1.5em;
  }


  

  .review-card {
    height: 100%;
    width: 100%;
  }

  #status-container {
    width: 100%;
    margin-top: -10px;
    margin-bottom: 30px;
  }

  .singleStatus {
    margin-bottom: 70px;
  }

  .b-tabs .tab-content {
    padding-bottom: 0px !important; 
  }
  
  .create-button-container {
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    margin-bottom: 20px;
  }

  .addBook{
    font-size: 30px;
    border-radius: 50px;
    border: none;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 60px;
    background: #d2d2d2;
  }

  .addBook:hover {
    background: #767676;
  }

  .fa-edit {
    font-size: 25px;
  }

  #field {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #field-create {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #field-create > .field {
    margin: 0px;
  }

  #field-create > #status-container-create {
    margin-bottom: 10px;
  }

  #field-create > button {
    margin-top: 10px;
  }

  .field > .longer-width {
    width: 80%;
  }

  .button-book-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  div.field-body {
    display: flex;
    flex-direction: column;
  }

  .b-radio.radio {
    display: flex;
  }

  div.field-body > .has-addons {
    margin: initial;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

   div.field-body > .has-addons > .radio {
     width: 200px;
     margin: 10px 0px;
   }

  .control-label {
    width: 200px;
  }

  span .control-label {
    width: 300px;
  }

  .b-radio.radio .control-label {
    padding-left: 15px !important;
    padding-right: 5px !important;
  }

  .is-4 {
    text-align: center;
  }
  
  .button-book-container > .dropdown > .dropdown-menu {
    top: 0%;
    left: -400%;
    margin-bottom: 30px;
  }

  .warning {
    color: red;
    margin-bottom: 10px;
  }

  a.dropdown-item:hover, .dropdown .dropdown-menu .has-link a:hover, button.dropdown-item:hover {
    background-color: transparent !important;
    color: black !important;
  }

  .submit-book-info {
    margin-right: 10px;
    margin-top: 20px;
  }

  .submit-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .review-edit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .review-edit-button > button {
    margin-right: 10px;
  }

  @media only screen and (min-width: 600px) {

    div.field-body > .has-addons {
      justify-content: flex-start;
    }

    div.field-body > .has-addons > .radio {
     width: 180px;
     margin-bottom: 10px;
   }

   div.field-body > .has-addons > .radio:nth-child(2) {
     margin-right: 40px;
   }

    .control-label {
      margin-left: 20px;
    }

    .b-radio.radio .control-label {
      padding-right: 0px !important;
    }

    .textArea{
      white-space: pre-wrap;
    }

    .addBook {
      height: 60px;
      width: 60px;
      font-size: 35px;
      margin-right: 60px;
    }

    @media only screen and (min-width: 1100px) {

      .addBook {
        margin-right: 0px;
      }

    }

    @media only screen and (min-width: 1200px) {

      .addBook {
        margin-right: -50px;
      }

    }

    @media only screen and (min-width: 1300px) {

      .addBook {
        margin-right: 50px;
      }

    }

  

    @media only screen and (min-width: 1408px) {

      .addBook {
        margin-right: 150px;
      }

    }

  }


</style>

