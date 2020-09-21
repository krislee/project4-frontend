<template>
    <div class="register">
        <div class="register-container">
        <!-- FIRST NAME -->
            <p class="control has-icons-left">
                <input v-model="firstName" class="input" type="text"  placeholder="First Name">
                <span class="icon is-small is-left">
                    <i class="fas fa-pen"></i>
                </span>
            </p>
        <!-- LAST NAME -->
            <p class="control has-icons-left">
                <input v-model="lastName" class="input" type="text"  placeholder="Last Name">
                <span class="icon is-small is-left">
                    <i class="fas fa-pen"></i>
                </span>
            </p>
        <!-- EMAIL -->
            <p class="control has-icons-left">
                <input v-model="email" class="input" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </p>
        <!-- USERNAME -->
            <p class="control has-icons-left">
                <input v-model="registerUsername" class="input" type="text"  placeholder="Username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user-circle"></i>
                </span>
            </p>
        <!-- PASSWORD -->
            <p class="control has-icons-left">
                <input v-model="registerPassword" class="input" type="password" required placeholder="Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
            <!-- SIGN UP BUTTON -->
            <button class="button is-primary" @click="handleSignUp">Sign Up</button>
        </div>
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
            registerPassword: null,
            loggedIn: false,
            token: ""
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
                        first_name: this.firstName,
                        last_name: this.lastName,
                        email: this.email,
                        username: this.registerUsername,
                        password: this.registerPassword
                    })
                })
                .then(response => response.json())
                // Send the data with loggedIn event back up to App since data contains the token
                .then(data => {
                    if(Array.isArray(data.email)){
                        if (data.email[0] == "Enter a valid email address."){
                            this.invalidCredentials("Please enter a valid email address")
                        } else if(data.email[0] == "user with this email already exists."){
                            this.invalidCredentials("Email already exists")
                        }
                    } else if(Array.isArray(data.username)){
                        if(data.username[0] == "Ensure this field has at least 8 characters."){
                            this.invalidCredentials("Username must have at least 8 characters")
                        } else if(data.username[0] == "user with this username already exists."){
                            this.invalidCredentials("Username is unavailable")
                        }
                    } else if(Array.isArray(data.password)){
                        if(data.password[0] == "Ensure this field has at least 8 characters."){
                            this.invalidCredentials("Password must have at least 8 characters")
                        } 
                    } else {
                        this.$emit('registered', data)
                        this.loggedIn = true
                        this.token = data.token
                    }
                })
                .then(() => {
                    if(this.loggedIn){
                        localStorage.setItem('token', this.token)
                        localStorage.setItem('loggedIn', this.loggedIn)
                    }
                })
            } else{
                this.emptyFields()
            }
        },
        invalidCredentials: function(message){
            this.$buefy.toast.open({
                duration: 2000,
                message: `<b>${message}</b>`,
                type: 'is-danger'
            })
        },
        emptyFields: function(){
            this.$buefy.toast.open({
                duration: 2000,
                message: `<b>All fields are required.</b>`,
                type: 'is-danger'
            })
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

.register {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.register-container > .control {
    margin: 20px;
    width: 80%;
}

@media only screen and (min-width: 600px) {

    .register-container > .control {
        width: 35%;
    }

}

</style>