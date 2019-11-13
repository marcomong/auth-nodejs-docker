<template>
  <div class="home">
    <h1>Welcome!</h1>
    <button v-if="isLoggedIn == true" @click="perfromSecretApi()" class="btn">Click me!</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isUserLoggedIn']),
    isLoggedIn () {
      return this.isUserLoggedIn
    }
  },
  methods: {
    ...mapActions(['retrieveSecretInfo']),
    perfromSecretApi () {
      return this.retrieveSecretInfo()
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/_home.scss";
</style>
