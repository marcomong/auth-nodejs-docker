<template>
  <div class="auth">
    <h1>Insert your credentials</h1>
    <input type="text" name="username" id="username" class="inputForm" placeholder="Username" v-model="user.username">
    <input type="password" name="passowrd" id="password" class="inputForm" placeholder="Password" v-model="user.password">
    <button class="btn" @click="perfromLogIn()">LOGIN</button>
    <router-link to="/signUp">sign up</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      user: {
        username: 'test',
        password: 'test'
      }
    }
  },
  methods: {
    ...mapActions([
      'logIn'
    ]),
    perfromLogIn () {
      return this.logIn({ username: this.user.username, password: this.user.password })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/_auth.scss";
</style>
