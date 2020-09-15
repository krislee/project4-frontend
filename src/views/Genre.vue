<template>
  <div class="genre">
    <button class="buttonGenreCreate" v-if="loggedIn" @click="clickedCreate = !clickedCreate">Create</button>
    <!-- DIV CONTAINING INPUT FIELD SHOWS WHEN CREATE BUTTON IS CLICKED -->
    <div class="inputCreate" v-if="clickedCreate">
      <b-field label="Create Genre">
        <!-- Grab genre name through v-model="genreName" for this.createGenre()-->
        <b-input v-model="genreName" placeholder="Name" rounded></b-input>
      </b-field>
      <button class="genreCreateSubmit" @click="createGenre">Submit</button>
    </div>
    <!-- DISPLAY GENRE -->
    <div class="genre-cards" v-if="URL && tokenFromGenre && loggedIn">
      <!-- LINK TO BOOK WHEN GENRE DIV IS CLICKED -->
        <div v-for="genre in genres" v-bind:key="genre.id" class="genreCard" v-bind:id="genre.id" @click="getBooks">
          <!-- <router-link :to="{name: 'Book', query: { URL: this.URL, loggedIn:this.loggedIn,}}" tag="div" v-for="genre in genres" v-bind:key="genre.id" class="genreCard"> -->
            <!-- <router-link :to="{name: 'Book', query: { URL: this.URL, loggedIn:this.loggedIn, token: this.tokenFromGenre}}"> -->
              {{genre.name}} 
            <!-- </router-link>  -->
          <!-- </router-link> -->
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
      genreName: null,
      clickedCreate: false,
      tokenFromGenre: "",
      URL: "",
      loggedIn: false
    }
  },
  created: function(){
    this.getGenre()
  },
  methods: {
    createGenre: function(){
      const {token, URL} = this.$route.query
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
          alert("This genre already exists.")
          this.genreName = null
        } else{
           this.getGenre()
           this.genreName = null
        }
      })
    },
    getGenre: function(){
      // Pass from App the token, URL, and loggedIn
      const {token, URL, loggedIn} = this.$route.query
      this.tokenFromGenre = token.token
      console.log(this.tokenFromGenre)
      this.URL = URL
      console.log(this.URL)
      console.log(URL)
      this.loggedIn = loggedIn
      console.log(this.loggedIn)

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
     getBooks: function(){
       this.$router.push({path: 'Book', query: {loggedIn: this.loggedIn, token: this.tokenFromGenre, URL: this.URL}})
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
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 50px;
}

.genre-cards > a {
  display: flex;
}


.genreCard {
  height: 20rem;
  background-color: yellow;
  width: 30%;
  margin-right: 15px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
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


</style>