<template>
    <b-carousel>
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
            <section :class="`hero is-medium is-${carousel.color}`">
                <div class="hero-body has-text-centered">
                    <h1 class="title">{{carousel.text}}</h1>
                </div>
            </section>
        </b-carousel-item>
    </b-carousel>

</template>

<script>
export default {
    data(){
        return {
            carousels: [
                { text: 'At the age of digital reading, a digital library for book lovers and students is born.', color: 'primary' },
                { text: 'Introducing... the Book Collection or B.C.', color: 'info' },
                { text: 'With B.C. you can manage your books by genres. You can add as many genres and books as you like in each of the genres.', color: 'success' },
                { text: 'You can formulate a review, keep track of your reading status, and personalize your book with a book image cover.', color: 'warning' },
                { text: 'Let B.C. do the book tracking, and you do the reading', color: 'danger' }
            ]
        }
    }
}
</script>

<style>
   .carousel{
       width: 50%;
    }
    .hero {
        border-radius: 5px;
    }
    
    .title {
        font-size: 1rem;
    }
</style>