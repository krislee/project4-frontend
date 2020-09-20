<template>
  <div class="home">
      <!-- <Carousel/> -->
      <div class="description">
        <br>
        <h1>At the age of digital reading, a digital library for book lovers and students is born.</h1><br>
        <h1><span class="homespan"><b>Introducing... the Book Collection or B.C.</b></span></h1><br>
        <h1>With B.C. you can manage your books by genres. You can add as many genres and books as you like in each of the genres.</h1>
        <h1>You can formulate a review, keep track of your reading status, and personalize your book with a book image cover.</h1><br>
        <h1><span><b>Let B.C. do the book tracking, and you do the reading</b></span></h1>
      </div>
      <div>
        <b-button> <router-link :to="{name:'Signup', query: {URL: this.URL}}">Signup</router-link></b-button>
      </div>
  </div>
  
</template>

<script>
// import Carousel from '../components/Carousel'


export default {
  name: 'Home',
  components: {
    // Carousel,

  },
  data: function(){
    return {
      URL: "https://project4-ga.herokuapp.com",
    }
  }
}
</script>

<style>
.home{
  background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(139, 180, 224, 0.73)), url('https://i0.wp.com/thecoffeechronicle.de/wp-content/uploads/2018/11/photo-1524995997946-a1c2e315a42f-1.jpeg?fit=1350%2C901&ssl=1');
  width: 100%;
  height: 603px;
  background-size: cover;
  /* image-rendering: -webkit-optimize-contrast; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.description{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}

.homespan{
  font-size: 1.5em
}

@media only screen and (min-width: 501px) {
  .description {
    display:flex;
    width: 60%;
  }
}

@media only screen and (min-width: 1000px) {

  .description {
    width: 45%;
    font-size: 1.1em;
  }

}

</style>
