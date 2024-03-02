<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card bg-color" >
      <q-card-section>
        <div class="text-h6">Perfil de Usuario</div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Nombre</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{  recurso.nombre }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Correo electrónico</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{  recurso.apellidos }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Fecha de nacimiento</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ recurso.titulo_recurso }}
            </q-item-section>
          </q-item>

          <!-- Agrega más elementos de la lista según sea necesario -->
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
const recurso = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/profesores/');
    console.log('Formulario enviado con éxito:', response.data.results);
    recurso.value = response.data.results;
  } catch (error) {
    console.error('Error al obtener los datos de los profesores:', error);
  }
});
</script>

<style scoped>
.my-card {
  width:  100%;
  max-width:  400px;
}
</style>
