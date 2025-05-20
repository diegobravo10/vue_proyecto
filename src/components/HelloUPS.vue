<template>
  <h1>{{ texto }} - Ecuador</h1>
  <form>
    <label id="textNombre">Nombre</label>
    <input id="textNombre" v-model="nombre" type="text" />
    <label id="textDireccion">Direccion</label>
    <input id="textDireccion" v-model="direccion" type="text" />
    <button @click="guardar" type="button">
      {{ editando !== null ? 'Actualizar' : 'Guardar' }}
    </button>
  </form>

  <table id="tabla-personas">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(persona, index) in personas" :key="index">
        <td>{{ persona.nombre }}</td>
        <td>{{ persona.direccion }}</td>
        <td>
          <dv id="botones">
          <button @click="editar(index)">Editar</button>
          <button @click="eliminar(index)">Eliminar</button>
        </dv>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { db } from './service/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default {
  name: 'HelloUPS',
  props: {
    texto: String
  },
  data() {
    return {
      nombre: '',
      direccion: '',
      personas: [],
      editando: null
    };
  },
  methods: {
   async guardar() {
     /*const registro = {
        nombre: this.nombre,
        direccion: this.direccion
      };*/

      if (this.editando !== null) {
        const datoRef = doc(db, 'contactos', this.personas[this.editando].id);
        await updateDoc(datoRef, {
        nombre: this.nombre,
        direccion: this.direccion});
        this.editando = null;
        await this.cargarDatos();

      } else {
        await addDoc(collection(db, 'contactos'),{
        nombre: this.nombre,
        direccion: this.direccion});
        await this.cargarDatos();

        //this.personas.push(registro);
      }

      //localStorage.setItem('datos', JSON.stringify(this.personas));
      this.nombre = '';
      this.direccion = '';
    },
   async eliminar(index) {

      const dato =  doc(db, 'contactos', this.personas[index].id);
      await deleteDoc(dato);
      await this.cargarDatos();

      //this.personas.splice(index, 1);
      //localStorage.setItem('datos', JSON.stringify(this.personas));
    },
    editar(index) {
      const persona = this.personas[index];
      this.nombre = persona.nombre;
      this.direccion = persona.direccion;
      this.editando = index;
    },
    async cargarDatos(){
      const contactos = await getDocs(collection(db, 'contactos'));
      this.personas =  contactos.docs.map(doc => ({id: doc.id, ...doc.data()}));
    }

  },
  async mounted() {
    //const datos = localStorage.getItem('datos');
    const contactos = await getDocs(collection(db, 'contactos'));
    this.personas =  contactos.docs.map(doc => ({id: doc.id, ...doc.data()}));
  }

};
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  width: 60%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

th, td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
}

thead {
  background-color: #42b983;
  color: white;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #97e0ae;
}
#botones button{
  margin-right: 10px;
}



label, input {
    margin: 10px;
}
label{
    font-weight: bold;
}

button{
    background:rgb(48, 154, 135);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
}
input{
    border-radius: 5px;
    border-color: rgb(146, 243, 188);
    padding: 4px;
}

#botones button {
  margin-right: 10px; 
  font-size: 15px;
}



</style>
