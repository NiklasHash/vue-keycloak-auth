<template>
  <v-container>
    <h1>{{title}}</h1>
    <h3>Willkommen zurück {{this.$store.state.userData.firstname}}!</h3>
    <hr>
    <h4>Deine persönlichen Daten</h4>
    <p>Vorname: {{this.$store.state.userData.firstname}}</p>
    <p>Nachname: {{this.$store.state.userData.lastname}}</p>
    <p>Rollen: </p>
    <ul id="listwrapper">
      <li v-for="item in this.$store.state.userData.roles" :key="item.id">
        {{item}}
      </li>
    </ul>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      title: "Home"
    }),
  }
</script>
<style>
  hr {
    margin-bottom: 30px;
    margin-top: 30px;
  }
</style>
