<template>
    <div class="login">
        <!-- USERNAME -->
        <div class="field">
            <p class="control">
                <input v-model="loginUsername" class="input" type="text"  placeholder="Username">
            </p>
        </div>
        <!-- PASSWORD -->
        <div class="field">
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
            loginUsername: null,
            loginPassword: null
        }
    }, 
    methods: {
        handleLogin: function(){
            if (this.loginUsername && this.loginPassword){
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
                    console.log(data)
                    if(data.non_field_errors){
                        alert("Invalid credentials")
                    } else{
                        this.$emit('loggedIn', data)
                    }
                })
            } else {
                alert("Username or password is required")
            }
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
  align-items: center;
  flex-direction: column;
}

</style>