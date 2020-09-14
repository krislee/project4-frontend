<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Collapse/>
  </div>
</template>

<script>
// @ is an alias to /src
import Collapse from '../components/Collapse.vue'

export default {
  name: 'Genre',
  components: {
    Collapse
  }
}
</script>
