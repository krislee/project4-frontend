<template>
  <div id="app">
    <div id="nav">
      <!-- Pass the URL in down down to header, which then passes to Login via query (URL is for shorthanding the fetch URL) -->
      <!-- Pass the loggedIn data to toggle log in and log off button display on header -->
      <!-- App is listening for logout event to run logout function -->
      <Header 
        v-bind:URL="URL" 
        v-bind:loggedIn="loggedIn" 
        @logout="logout"/>
    </div>
    <!-- App is listening for loggedIn event to run login function -->
    <!-- App is listening for registered event to run signup function -->
    <router-view 
    @loggedIn="login($event)"
    @registered="signup($event)"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data: function(){
    return {
      // Store loggedIn and token on App component since other components need these two data 
      loggedIn: false,
      token: null,
      URL: "http://localhost:8000"
    }
  },
  methods: {
    // Token gets stored in App
    login: function(e){
      this.loggedIn = true
      this.token = e
      console.log(this.token)
      // Send token down to Genre page after logging in (token is stored in data.$route.query) 
      this.$router.push({path: 'Genre', query: {token: this.token, URL: this.URL}})
    },
    logout: function(){
      console.log('Hello World')
      this.loggedIn = false
      this.token = null
      this.$router.push('/')
    },
    signup: function(e){
      this.loggedIn = true
      this.token = e
      console.log(this.token)
      // Send token down to Genre page after registering (token is stored in data.$route.query) 
      this.$router.push({path: 'Genre', query: {token: this.token, URL: this.URL}})
    }
  }
  
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
