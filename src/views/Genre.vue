<template>
  <div class="genre">
    <button class="buttonGenreCreate" v-if="loggedIn" @click="clickedCreate = !clickedCreate">Create</button>
    <!-- DIV CONTAINING INPUT FIELD SHOWS WHEN CREATE BUTTON IS CLICKED -->
    <div class="inputCreate" v-if="clickedCreate">
      <b-field label="Create Genre">
        <!-- Grab genre name through v-model="genreName" for this.createGenre()-->
        <b-input v-model="genreName" placeholder="Name" rounded maxlength="255"></b-input>
      </b-field>
       <!-- NEW ALERT DIVS -->
        <div class="warning genre-warning" v-if="noGenreName">
           Please provide a genre.
        </div>
        <div class="warning genre-warning" v-if="genreExists">
          This genre already exists.
        </div>
      <button class="genreCreateSubmit" @click="createGenre">Submit</button>
    </div>
    <!-- DISPLAY GENRE -->
    <div class="genre-cards" v-if="URL && tokenFromGenre && loggedIn">
      <!-- LINK TO BOOKS WHEN GENRE DIV IS CLICKED -->
      <div v-for="genre in genres" v-bind:key="genre.id" class="genreCard">
        <div v-bind:id="genre.id" @click="getBooks" class="book-link">
          {{genre.name}} 
        </div>
        <!-- DROP DOWN -->
        <div class="dropdown container" @click="openingDropdown = openingDropdown == genre.id ? 0 : genre.id">
          <div class="dropdown" v-bind:class="{'is-active': openingDropdown == genre.id }" v-bind:id="genre.id">
            <div class="dropdown-trigger">
              <button class="button edit-genre-button"  aria-haspopup="true" aria-controls="dropdown-menu" v-bind:id="genre.id" ref="editButton">
                <span v-bind:id="genre.id" ><i v-bind:id="genre.id" class="fas fa-edit"></i></span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item" v-bind:id="genre.id" @click="editGenreFields">Edit</a>
                <a class="dropdown-item" v-bind:id="genre.id" @click="deleteGenre">Delete</a>
              </div>
            </div>
          </div>
        </div>
        <!-- EDIT MODAL -->
        <b-modal v-model="updateModal" :width="640" scroll="keep" id="edit-title-modal">
          <div class="card" id="modal-edit-title">
            <div class="card-content" >
              <div class="media" >
                <div class="media-content">
                  <p class="title is-4">Edit Genre</p>
                </div>
              </div>
              <div class="field" id="field">
                <b-field label="Title" class="longer-width">
                  <b-input v-model="editGenreName" maxlength="255"></b-input>
                </b-field>
                <b-button @click="updateGenre">Edit</b-button>
              </div>
            </div>
          </div>
        </b-modal>
        <!-- END OF EDIT MODAL -->
      </div>
    </div>
  </div>
</template>

 
<script>

export default {
  name: 'Genre',
  components: {
  },
  data: function(){
    return {
      genres: [],
      genreName: "",
      clickedCreate: false,
      tokenFromGenre: "",
      URL: "",
      loggedIn: false,
      editGenreName: "",
      genreId: 0,
      updateModal: false,
      genreUpdateId: 0,
      isActive: null,
      openingDropdown: 0,
      // Warnings:
      noGenreName: false,
      genreExists: false
    }
  },
  created: function(){
    this.getGenre()
  },
  methods: {
    createGenre: function(){
      const {token, URL, loggedIn} = this.$route.query
      this.loggedIn = loggedIn
      console.log(this.genreName)
      if (this.genreName === "") {
        this.noGenreName = true
        this.genreExists = false
      } else {
        this.genreName = this.nameGenre(this.genreName)
        console.log(this.genreName)
        fetch(`${URL}/library/genres/`, {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            authorization: `JWT ${token.token}`
          },
          body: JSON.stringify({
              name: this.genreName
          })
        })
        .then(response => response.json())
        .then((data) => {
          if(Array.isArray(data)){
            this.noGenreName = false
            this.genreExists = true
            this.genreName = ""
          } else{
            this.getGenre()
            this.genreName = ""
            this.noGenreName = false
            this.genreExists = false
          }
        })
      }
    },
    nameGenre: function(str){
      return str.replace(
        /\b\w+/g, function(s){
          return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
        }
      )
    },
    getGenre: function(){
      // Pass from App the token, URL, and loggedIn
      const {token, URL, loggedIn} = this.$route.query
      this.tokenFromGenre = token.token
      this.URL = URL
      this.loggedIn = loggedIn

      fetch(`${this.URL}/library/genres/`, {
        method: 'get',
        headers: {
          authorization: `JWT ${this.tokenFromGenre}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.genres = data.results
        console.log(this.genres)
      })
    },
    getBooks: function(e){
       this.$router.push({path: 'Book', query: {loggedIn: this.loggedIn, token: this.tokenFromGenre, URL: this.URL, genreId: e.target.id}})
    },
    editGenreFields: function(event){
      this.updateModal = true
      console.log(event)
      console.log(event.target)
      this.genreUpdateId = event.target.id
      console.log(this.genreUpdateId)
      const oneGenre = this.genres.find(genre => {
        return genre.id == this.genreUpdateId
      })
      console.log(oneGenre)
      this.editGenreName = oneGenre.name
    },
    updateGenre: function(){
      const {token, URL, loggedIn} = this.$route.query
      this.loggedIn = loggedIn
      this.editGenreName = this.nameGenre(this.editGenreName)
      fetch(`${URL}/library/genres/${this.genreUpdateId}/`, {
          method: 'put',
          headers: {
            "Content-Type": "application/json",
            authorization: `JWT ${token.token}`
          },
          body: JSON.stringify({
              name: this.editGenreName
          })
      })
      .then(response => response.json())
      .then(() => {
        this.getGenre()
        this.updateModal = false
      })
    },
    deleteGenre: function(e){
      const {token, URL, loggedIn} = this.$route.query
      this.loggedIn = loggedIn
      this.genreId = e.target.id
      fetch(`${URL}/library/genres/${this.genreId}`, {
          method: 'delete',
          headers: {
            authorization: `JWT ${token.token}`
          }
      })
      .then(response => response.json())
      .then(() => {
        this.getGenre()
      })
    }
  } 
}

</script>

<style>

.genre {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.genre-cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 50px;
}

.genre-cards > a {
  display: flex;
}


.genreCard {
  height: 20rem;
  background-color: #98cbd4;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  width: 60%;
  border-radius: 30px;
}

.genreCard:nth-child(even) {
  background-color: #67929b;
}

.book-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  cursor: pointer;
  height: 100%;
  font-size: 90%;
}

.dropdown-trigger > .edit-genre-button {
  background: transparent;
  border: none;
}


.buttonGenreCreate {
  margin: 0 auto;
  float: right;
}

.inputCreate {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin: 4px;
  width: 80%;
  font-size: 20px;
}

.button-container > i:hover {
  color: rgb(152, 152, 1);
  cursor: pointer;
}

.button-container > .dropdown > .dropdown-trigger > .dropdown-menu {
  top: 95%;
}

.warning {
    color: red;
}

.genre-warning {
  margin-bottom: 10px;
}

#modal-edit-title {
  height: 100%;
}

#edit-title-modal > .animation-content {
  height: 300px;
  width: 400px;
}

@media only screen and (min-width: 620px) {

  .genre-cards {
    flex-direction: row;
  }

  .genreCard {
    width: 40%;
    margin: 30px;
  }

}

@media only screen and (min-width: 1080px) {

  .genreCard {
    width: 300px;
  }

}

</style>