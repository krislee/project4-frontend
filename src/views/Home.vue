<template>
  <div class="home">
      <Carousel/>
  </div>
  
</template>

<script>
import Carousel from '../components/Carousel'


export default {
  name: 'Home',
  components: {
    Carousel,

  }
}
</script>

<style>
.home{
  background-image: url('https://i0.wp.com/thecoffeechronicle.de/wp-content/uploads/2018/11/photo-1524995997946-a1c2e315a42f-1.jpeg?fit=1350%2C901&ssl=1');
  /* background-image: url('https://media.istockphoto.com/photos/modern-library-picture-id1087424756?k=6&m=1087424756&s=170667a&w=0&h=PK4QCYThhVDnpgMUkNS_sojsSXHlbyvLzxIvSCVzc88='); */
  width: 100%;
  height: 650px;
  background-size: cover;
  image-rendering: -webkit-optimize-contrast;
  /* display: flex;
  justify-content: center; */
}

</style>
