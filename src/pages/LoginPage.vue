<template>
  <q-page class="flex flex-center " >
    <q-card class="my-card bg-color">
      <q-card-section>
        <div class="text-h6">Iniciar sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="username"
            label="Nombre de usuario"
            lazy-rules
            :rules="[val => val && val.length >  0 || 'Por favor ingrese su nombre de usuario']"
          />

          <q-input
            type="password"
            filled
            v-model="password"
            label="Contraseña"
            lazy-rules
            :rules="[val => val && val.length >  0 || 'Por favor ingrese su contraseña']"
          />

          <div>
            <q-btn flat rounded label="Iniciar sesión" type="submit" color="primary" />
            <q-btn label="Restablecer" type="reset" color="secondary" flat rounded />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const onSubmit = () => {
  // Lógica para manejar el inicio de sesión
};

const onReset = () => {
  // Lógica para restablecer el formulario
  username.value = '';
  password.value = '';
};
</script>

<style scoped>
.my-card {
  width:  100%;
  max-width:  400px;
}
</style>
