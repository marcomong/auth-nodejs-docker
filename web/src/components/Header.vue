<template>
   <header class="header">
     <router-link to="/">
      <img src="@/assets/SVG/home.svg" alt="home" class="home-icon">
     </router-link>
      <nav class="user">
        <div class="authContainer">
          <router-link to="/auth">
            LOGIN
          </router-link>
        </div>
        <div class="authContainer">
          LOGOUT
        </div>
      </nav>
    </header>
</template>

<style lang="scss">
@import "@/styles/components/_header.scss";
</style>
