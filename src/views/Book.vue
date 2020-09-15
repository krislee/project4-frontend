<template>
  <div class="container">
    <button class="addBook" @click="createBookModal = !createBookModal">+</button>
    <b-modal v-if="createBookModal" v-model="isCardModalActive" :width="640" scroll="keep">
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
                  <b-radio v-model="read" name="status" native-value="Read">Read</b-radio>
                  <b-radio v-model="inProgress" name="status" native-value="Read">In Progress</b-radio>
                  <b-radio v-model="notRead" name="status" native-value="Read">Not Read</b-radio>
                </b-field>
                <b-field label="Review">
                  <b-input v-model="review" type="textarea"></b-input>
                </b-field>
                </div>
            </div>
          </div>
      </b-modal>
    <div class="bookContainer">
      <div class="books" v-for="book of books" v-bind:key="book.id" v-on:click.prevent="openModal = openModal == book.id? 0: book.id; isCardModalActive = true">
        <h1 class="bookTitle">{{book.title}}</h1>
        <h2 class="bookAuthor">{{book.author}}</h2>
        <!-- MODAL -->
        <b-modal v-if="openModal == book.id" v-model="isCardModalActive" :width="640" scroll="keep">
          <div class="card" id="modal"  >
            <div class="card-content" >
              <div class="media" >
                <div class="media-content">
                  <p class="title is-4">Review</p>
                </div>
              </div>
               <div class="field">
            <b-switch v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No">
                {{ isSwitchedCustom }}
            </b-switch>
        </div>
               
              <div class="content">
                {{book.review}} 
                <br>
                <small>{{book.updated_at}}</small>
              </div>
            </div>
          </div>
        </b-modal>
        <!-- END OF MODAL -->
      </div>
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
      isCardModalActive: true,
      openModal: 0,
      createBookPage: false,
      isSwitchedCustom: "Yes",
      createBookModal: false
    }
  },
  created: function(){
    this.listBooks()
  },
  methods: {
    status: function(){
      if(this.isSwitchedCustom == "Not Read"){
        this.isSwitchedCustom == "In Progress"
      } else if(this.isSwitchedCustom == "In Progress"){
         this.isSwitchedCustom == "Read"
      } else {
        this.isSwitchedCustom == "Not Read"
      }
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
        if(Array.isArray(data)){
          this.createBookPage = true
        } else {
          this.books = data.results
        }
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
