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
              <q-item-label class="text-bold">Nombre</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ user.nombre }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">Apellidos</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ user.apellidos }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">Correo electrónico</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ user.email }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">Rol</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ user.role }}
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
import axios from 'axios'; // Asegúrate de tener axios instalado

interface UserData {
  nombre: string;
  apellidos: string;
  email: string;
  role: string;
  // Agrega aquí otras propiedades que esperas que tenga user
}

const user = ref<UserData>({
  nombre: '', // Valores predeterminados
  apellidos: '',
  email: '',
  role: '',
  // Inicializa aquí otras propiedades si es necesario
});

async function fetchUserData() {
  try {
    const authToken = localStorage.getItem('authToken'); // Asume que tienes un authToken almacenado
    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get('http://127.0.0.1:8000/api/users', config);
    user.value = response.data; // Asigna los datos del usuario a user.value
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
}

// Llama a fetchUserData cuando el componente se monta
onMounted(fetchUserData);
</script>


<style scoped>
.my-card {
  width:  100%;
  max-width:  400px;
}
</style>
