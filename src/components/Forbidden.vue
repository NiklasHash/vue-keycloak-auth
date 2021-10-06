<template>
  <v-container>
    <h1>{{title}}</h1>
    <p>You don´t have permission / on this server.</p>
  </v-container>
</template>

<script>
export default {
  name: 'Forbidden',

  data: () => ({
    title: "Forbidden"
  }),
}
</script>