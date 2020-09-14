<template>
    <div class="login">
        <!-- FIRST NAME -->
        <div class="field">
            <p class="control has-icons-left">
                <input v-model="firstName" class="input" type="text"  placeholder="First Name">
                <span class="icon is-small is-left">
                    <i class="fas fa-pen"></i>
                </span>
            </p>
        </div>
        <!-- LAST NAME -->
        <div class="field">
            <p class="control has-icons-left">
                <input v-model="lastName" class="input" type="text"  placeholder="Last Name">
                <span class="icon is-small is-left">
                    <i class="fas fa-pen"></i>
                </span>
            </p>
        </div>
        <!-- EMAIL -->
        <div class="field">
            <p class="control has-icons-left">
                <input v-model="email" class="input" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </p>
        </div>
        <!-- USERNAME -->
        <div class="field">
            <p class="control has-icons-left">
                <input v-model="registerUsername" class="input" type="text"  placeholder="Username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user-circle"></i>
                </span>
            </p>
        </div>
        <!-- PASSWORD -->
        <div class="field">
            <p class="control has-icons-left">
                <input v-model="registerPassword" class="input" type="password" required placeholder="Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <!-- SIGN UP BUTTON -->
        <button class="button is-primary" @click="handleSignUp">Sign Up</button>
    </div>
</template>


<script>
export default {
    name: "Signup",
    props: [],
    data: function(){
        return {
            firstName: null,
            lastName: null,
            email: null,
            registerUsername: null,
            registerPassword: null
        }
    }, 
    methods: {
        handleSignUp: function(){
            if (this.firstName && this.lastName && this.email && this.registerUsername && this.registerPassword){
                fetch(`${this.$route.query.URL}/auth/users/register/`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        username: this.registerUsername,
                        password: this.registerPassword
                    })
                })
                .then(response => response.json())
                // Send the data with loggedIn event back up to App since data contains the token
                .then(data => {
                    console.log(data)
                    this.$emit('registered', data)
                })
            }
        }
    }
}
</script>

<style>
.field{
    width: 40%;
    margin: 20px auto;
}
.is-primary{
    margin: 40px auto;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>