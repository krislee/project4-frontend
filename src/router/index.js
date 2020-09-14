import Vue from 'vue'
import VueRouter from 'vue-router'
import Genre from '../views/Genre.vue'
import Book from '../views/Book.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/genre',
    name: 'Genre',
    component: Genre
  },
  {
    path: '/books',
    name: 'Book',
    component: Book
  },
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/signup',
    name: "Signup",
    component: Signup
  }
]

const router = new VueRouter({
  routes
})

export default router
