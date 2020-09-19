<template>
  <div class="header">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h1><strong> B.C. </strong></h1>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          <router-link to="/" v-if="!loggedIn">Home</router-link>
        </b-navbar-item>
         <b-navbar-item href="#">
          <router-link :to="{name: 'Genre', query: {URL: this.URL, token: this.token, loggedIn: this.loggedIn}}" v-if="loggedIn">Genres</router-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div>
            <router-link :to="{name: 'Login', query: {URL: this.URL}}" 
            v-if="!loggedIn">Login
            </router-link>
            <!-- <router-link to="/login" v-bind:URL="URL" v-if="!loggedIn" class="button is-primary">Login</router-link> -->
            <router-link :to="{name: 'Signup', query: {URL: this.URL}}" v-if="!loggedIn" >Sign up</router-link>
            <button v-if="loggedIn" v-on:click="logout" class="button is-light">Log Out</button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['URL', 'loggedIn', 'token'],
  methods: {
    logout: function(){
      this.$emit('logout')
    }
  }
};
</script>

<style>
.header {
    width: 90%;
    margin: 10px auto
}
a {
  margin: 5px;
}

</style>
