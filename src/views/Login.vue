<template>
    <div class="login">
        <div class="login-container">
        <!-- USERNAME -->
            <p class="control">
                <input v-model="loginUsername" class="input" type="text"  placeholder="Username">
            </p>
        <!-- PASSWORD -->
            <p class="control has-icons-left">
                <input v-model="loginPassword" class="input" type="password" required placeholder="Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <!-- LOGIN BUTTON -->
        <button class="button is-primary" @click="handleLogin">Login</button>
    </div>
</template>


<script>
export default {
    name: "Login",
    props: [],
    data: function(){
        return {
            loginUsername: "",
            loginPassword: "",
            failedAuth: false,
            emptyField: false,
            storedCredentials: ""
        }
    }, 
    methods: {
        handleLogin: function(){
            if (this.loginUsername === "" || this.loginPassword === "") {
                // this.emptyField = true
                // this.failedAuth = false
                this.alertEmptyField()
            } else if (this.loginUsername && this.loginPassword) {
                fetch(`${this.$route.query.URL}/auth/users/login/`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.loginUsername,
                        password: this.loginPassword
                    })
                })
                .then(response => response.json())
                // Send the data with loggedIn event back up to App since data contains the token
                .then(data => {
                    if(data.non_field_errors){
                        this.alertInvalidField()
                    } else{
                        this.$emit('loggedIn', data)
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
            }
        },
        alertEmptyField: function(){
            this.$buefy.toast.open({
                duration: 2000,
                message: `<b>Fields cannot be blank</b>`,
                type: 'is-danger'
            })
        },
        alertInvalidField: function(){
            this.$buefy.toast.open({
                duration: 2000,
                message: `<b>The credentials you have provided are invalid. Please try again.</b>`,
                type: 'is-danger'
            })
        }
    }
}
</script>

<style>
.field{
    width: 40%;
    margin: 40px auto;
}
.is-primary{
    margin: 40px auto;
}

.login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
}

.login-container > .control {
    margin: 20px;
    width: 80%;
}

.warning {
    color: red;
}

@media only screen and (min-width: 700px) {

    .login-container > .control {
        width: 50%;
    }

}

</style>