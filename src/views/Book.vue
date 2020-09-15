<template>
  <div class="container">
    BOOKS 
    <div class="bookContainer">
      <div class="books">
      </div>
    </div>
  </div>
</template>

<script>
// import Collapse from '../components/Collapse.vue'

export default {
  name: 'Book',
  components: {
    // Collapse
  },
  data: function(){
    return {

    }
  },
  // create: function(){
  //   this.getBooks()
  // }
  // methods: {
  //   getBooks: function(){
  //     const
  //   }
  // }
}
</script>

<style>
  .bookContainer{
    display: flex;
    flex-direction: wrap;
    width: 80%;
  }
</style>
