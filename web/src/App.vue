<template>
  <div class="appContainer">
    <Header></Header>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    Header
  },
  methods: {
    ...mapActions(['tryAutoSignIn'])
  },
  mounted () {
    return this.tryAutoSignIn()
  }
}
</script>
