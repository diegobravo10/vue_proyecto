<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Hola estoy usando Vue, pero es mejor React"/>
  <HelloUPS texto="Programacion"/>
</template>

<script>
import HelloUPS from './components/HelloUPS'

export default {
  name: 'App',
  components: {
    HelloUPS
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
