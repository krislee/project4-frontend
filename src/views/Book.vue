<template>
  <div class="container">
    <button class="addBook" @click="createCardModalActive = true">+</button>
    <!-- CREATE BOOK MODAL -->
    <b-modal v-model="createCardModalActive" :width="640" scroll="keep">
      <div class="card" id="modal">
        <div class="card-content" >
          <div class="media" >
            <div class="media-content">
              <p class="title is-4">Create Book</p>
            </div>
          </div>
          <div class="field" id="field">
            <b-field label="Title" class="longer-width">
              <b-input v-model="title" maxlength="255"></b-input>
            </b-field>
            
            <b-field label="Author" class="longer-width">
              <b-input v-model="author" maxlength="255"></b-input>
            </b-field>
            <b-field label="Status" class="longer-width" id="status-container">
              <b-radio v-model="status" name="status" native-value="Read">Read</b-radio>
              <b-radio v-model="status" name="status" native-value="In Progress">In Progress</b-radio>
              <b-radio v-model="status" name="status" native-value="Not Read">Not Read</b-radio>
            </b-field>
            <b-field label="Book Cover" message="Add a book cover image URL to personalize your book display" class="longer-width">
              <b-input v-model="imageURL" type="text"></b-input>
            </b-field>
            <!-- <b-field label="Review" message="Add a review for the book" class="longer-width">
              <b-input v-model="review" type="textarea"></b-input>
            </b-field> -->
            <b-button @click="createBook">Submit</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- END OF CREATE BOOK MODAL -->
    <div class="bookContainer">
      <div class="books" v-for="book of books" v-bind:key="book.id" v-bind:id="book.id">
        <div v-bind:id="book.id" @click="getOneBook">
          <h1 v-bind:id="book.id" class="bookTitle">{{book.title}}</h1>
          <h2 v-bind:id="book.id" class="bookAuthor">{{book.author}}</h2>
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
              <div class="media" >
                <div class="media-content review-title">
                  <p class="title is-4">Review</p>
                </div>
              </div>
              <div v-if="displayBookReviewAlert">
                Click the edit icon to add or edit a review.
              </div>
              <div class="content" id="content-review">
                <div>
                  {{singleBookReview}}
                </div>
              </div>
              <!-- DROP DOWN -->
              <div class="button-book-container">
                  <b-dropdown aria-role="list">
                    <button class="button is-primary" slot="trigger" slot-scope="{ active }">
                        <span><i class="far fa-edit"></i></span>
                        <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                    </button>
                    <b-dropdown-item is-up aria-role="listitem" @click="editBookFields">Edit</b-dropdown-item>
                    <b-dropdown-item is-up aria-role="listitem" @click="deleteBook">Delete</b-dropdown-item>
                  </b-dropdown>
                </div>
                <!-- END OF DROP DOWN -->
                <!-- EDIT MODAL -->
                <b-modal v-model="editCardModalActive" :width="640" scroll="keep">
                  <div class="card" id="modal">
                    <div class="card-content" >
                      <div class="media" >
                        <div class="media-content">
                          <p class="title is-4">Edit Book</p>
                        </div>
                      </div>
                      <div class="field" id="field">
                        <b-field label="Title" class="longer-width">
                          <b-input v-model="editTitle" maxlength="255"></b-input>
                        </b-field>
                        <b-field label="Author" class="longer-width">
                          <b-input v-model="editAuthor" maxlength="255"></b-input>
                        </b-field>
                        <b-field label="Status" class="longer-width" id="status-container">
                          <b-radio v-model="editStatus" name="status" native-value="Read">Read</b-radio>
                          <b-radio v-model="editStatus" name="status" native-value="In Progress">In Progress</b-radio>
                          <b-radio v-model="editStatus" name="status" native-value="Not Read">Not Read</b-radio>
                        </b-field>
                        <b-field label="ImageURL" class="longer-width">
                          <b-input v-model="editImageURL" type="text"></b-input>
                        </b-field>
                        <b-field label="Review" class="longer-width">
                          <b-input v-model="editReview" type="textarea"></b-input>
                        </b-field>
                        <b-button @click="updateBook">Edit</b-button>
                      </div>
                    </div>
                  </div>
                </b-modal>
                <!-- END OF EDIT MODAL -->
            </div>
          </div>
        </b-modal>
        <!-- END OF MODAL -->
      <!-- EMPTY BOOK PAGE -->
      <div v-if="createBookPage">
        Click the + to add books to your collection
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
      // isActive: false,
      // openModal: 0,
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
    }
  },
  created: function(){
    this.listBooks()
  },
  methods: {
    getOneBook: function(e){
      const {loggedIn, token, URL, genreId} = this.$route.query
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
          this.singleBookReview = data.review
          if(this.singleBookReview == ""){
            this.displayBookReviewAlert = true
          } else {
            this.displayBookReviewAlert = false
          }
          // if(data.status == 0){
          //   this.singleBookStatus = "Read"
          // } else if(data.status == 1){
          //   this.singleBookStatus = "In Progress"
          // } else {
          //   this.singleBookStatus = "Have Not Read"
          // }
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
          this.createBookPage = true
          this.books = {}
        } else {
          console.log(data)
          this.books = data.results
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
        this.$buefy.toast.open({
          duration: 2000,
          message: `<b>Title and Author fields cannot be blank</b>`,
          type: 'is-danger'
        })
      } else if (this.author === "") {
        this.$buefy.toast.open({
          duration: 2000,
          message: `<b>Author field cannot be blank</b>`,
          type: 'is-danger'
        })
      } else if (this.title === "") {
        this.$buefy.toast.open({
          duration: 2000,
          message: `<b>Title field cannot be blank</b>`,
          type: 'is-danger'
        })
      } else {
        if(this.status === "Read"){
          this.stat = 0
        } else if(this.status === "In Progress"){
          this.stat = 1
        } else {
          this.stat = 2
        }
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
          console.log(data)
          this.createCardModalActive = false
          this.createBookPage = false
          this.listBooks()
          this.emptyfields = false
        })
      }
    },
    // POPULATE EDIT BOOK FIELD
    editBookFields: function(){
      const {loggedIn} = this.$route.query
      this.loggedIn = loggedIn
      this.editCardModalActive = true
      const allBooks = this.books.find(book => {
        return book.id == this.bookId
      })
      this.editTitle = allBooks.title
      this.editAuthor = allBooks.author
      this.editStatus = allBooks.status
      if (this.editStatus == 0){
        this.editStatus = "Read"
      } else if(this.editStatus == 1){
        this.editStatus = "In Progress"
      } else {
        this.editStatus = "Not Read"
      }
      this.editReview = allBooks.review
      this.editImageURL = allBooks.photo
    },
    // UPDATE BOOK AFTER POPULATING BOOK FIELD
    updateBook: function(){
      const {loggedIn, token, URL, genreId} = this.$route.query
      this.loggedIn = loggedIn
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
          review: this.editReview,
          genre: Number(genreId)
        })
      })
      .then(response => response.json())
      .then((data) => {
        this.listBooks()
        // this.getOneBook()
        this.singleBookReview = data.review
        if(this.singleBookReview == ""){
            this.displayBookReviewAlert = true
        } else {
          this.displayBookReviewAlert = false
        }
        this.editCardModalActive = false
        this.isCardModalActive = false
      })
    },
    // DELETE BOOK
    deleteBook: function(){
      const {loggedIn, token, URL, genreId} = this.$route.query
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
    background-color:yellowgreen;
    height: 300px;
    width: 200px;
    margin: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  .books > div:nth-child(1) {
    height: 100%;
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
  #modal{
    /* testing purposes gave background color */
    background-color:orange;
  }

  .review-card {
    height: 100%;
    width: 100%;
  }

  .addBook{
    font-size: 40px;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-left: 20px;
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

  @media only screen and (min-width: 600px) {

    div.field-body > .has-addons {
      flex-direction: row;
      width: 500px;
      justify-content: flex-start;
    }

    div.field-body > .has-addons > .radio {
     width: 130px;
     margin: 0px;
   }

   div.field-body > .has-addons > .radio:nth-child(2) {
     margin-right: 40px;
   }

    .control-label {
      margin-left: 20px;
    }

    .b-radio.radio .control-label {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }

  }


</style>

