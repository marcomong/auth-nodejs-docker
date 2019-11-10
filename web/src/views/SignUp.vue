<template>
  <div class="auth">
    <h1>Insert your credentials</h1>
    <input type="text" name="username" id="username" class="inputForm" placeholder="Username" v-model="user.username">
    <input type="password" name="passowrd" id="password" class="inputForm" placeholder="Password" v-model="user.password">
    <input type="password" name="confirmPassword" id="confirmPassword" class="inputForm" placeholder="Confirm password" v-model="user.confirmPassword">
    <button class="btn" @click="submitSignUp()">SIGN UP</button>
    <router-link to="/logIn">login in</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      user: {
        username: 'test',
        password: 'test',
        confirmPassword: 'test'
      }
    }
  },
  methods: {
    ...mapActions([
      'signUp'
    ]),
    submitSignUp () {
      if (this.user.password !== this.user.confirmPassword) {
        console.log('error password match')
        return
      }
      return this.signUp({ username: this.user.username, password: this.user.password })
        .then(() => {
          this.$router.push({ name: 'home' })
        })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/_auth.scss";
</style>
