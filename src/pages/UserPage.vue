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
              {{ user.name }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Correo electrónico</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ user.email }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Fecha de nacimiento</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ user.birthdate }}
            </q-item-section>
          </q-item>

          <!-- Agrega más elementos de la lista según sea necesario -->
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  birthdate: '01/01/1980',
  // ... otros datos del usuario
});
</script>

<style scoped>
.my-card {
  width:  100%;
  max-width:  400px;
}
</style>
