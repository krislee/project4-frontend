<template>
  <div class="container">
    <button class="addBook" @click="createCardModalActive = true">+</button>
    <!-- CREATE BOOK MODAL -->
    <b-modal v-model="createCardModalActive" :width="640" scroll="keep">
      <div class="card" id="modal"  >
        <div class="card-content" >
          <div class="media" >
            <div class="media-content">
              <p class="title is-4">Create Book</p>
            </div>
          </div>
          <div class="field">
            <b-field label="Title">
              <b-input v-model="title"></b-input>
            </b-field>
            <b-field label="Author">
              <b-input v-model="author"></b-input>
            </b-field>
            <b-field label="Status">
              <b-radio v-model="status" name="status" native-value="Read">Read</b-radio>
              <b-radio v-model="status" name="status" native-value="In Progress">In Progress</b-radio>
              <b-radio v-model="status" name="status" native-value="Not Read">Not Read</b-radio>
            </b-field>
            <b-field label="Review">
              <b-input v-model="review" type="textarea"></b-input>
            </b-field>
          </div>
        </div>
        <button>Submit</button>
      </div>
    </b-modal>
    <!-- END OF CREATE BOOK MODAL -->
    <div class="bookContainer">
      <div class="books" v-for="book of books" v-bind:key="book.id" v-bind:id="book.id" @click="getOneBook">
        <h1 v-bind:id="book.id" class="bookTitle">{{book.title}}</h1>
        <h2 v-bind:id="book.id" class="bookAuthor">{{book.author}}</h2>
      </div>
      <!-- MODAL OUTSIDE OF LOOP -->
        <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
          <div class="card" id="modal">
            <div class="card-content" >
              <div class="media" >
                <div class="media-content">
                  <p class="title is-4">Review</p>
                </div>
              </div>
               <!-- <div class="field">
                <b-switch v-model="isSwitchedCustom"
                    true-value="Yes"
                    false-value="No">
                    {{ isSwitchedCustom }}
                </b-switch>
              </div> -->
               
              <div class="content">
                {{singleBookReview}}
                <br>
                {{singleBookStatus}}
                <br>
                <small></small>
              </div>
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
      isActive: false,
      isCardModalActive: false,
      createCardModalActive: false,
      openModal: 0,
      createBookPage: false,
      isSwitchedCustom: "Yes",
      createBookModal: false,
      // GRAB CREATE INPUT FIELD VALUES
      title: "",
      author: "",
      status: "Not Read",
      review: "",
      // FOR getOneBook METHOD:
      bookId: 0,
      singleBookReview: "",
      singleBookStatus: ""
    }
  },
  created: function(){
    this.listBooks()
  },
  methods: {
    getOneBook: function(e){
      const {token, URL, genreId} = this.$route.query
      this.isCardModalActive = true
      this.bookId = e.target.id
      console.log(this.bookId)
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
        console.log(data)
          this.books = data.results
      })
    },
    // createBook: function(){
    //   const {loggedIn, token, URL, genreId} = this.$route.query
    //   this.loggedIn = loggedIn
    //   fetch(`${URL}/library/genres/${genreId}/books`, {
    //     method: 'post',
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `JWT ${token}`
    //     },
    //     body: JSON.stringify({

    //     })
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     if(Array.isArray(data)){
    //       alert("Title has already been created")
    //     } else{
    //       this.listBooks()
    //     }
    //   })
    // }
  }
}
</script>

<style>
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

  .addBook{
    font-size: 3rem;
    border-radius: 50%;
  }

</style>
