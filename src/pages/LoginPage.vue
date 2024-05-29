<template>
  <q-page class="flex flex-center">
    <q-card class="my-card bg-color">
      <q-card-section>
        <div class="text-h6">Iniciar sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit"  class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Correo electrónico"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor ingrese su correo electrónico',
            ]"
            :error-message="emailErrorMessage"
          />

          <q-input
            type="password"
            filled
            v-model="password"
            label="Contraseña"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor ingrese su contraseña',
            ]"
          />

          <div>
            <q-btn
              flat
              rounded
              label="Iniciar sesión"
              type="submit"
              color="primary"
            />

          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="showErrorDialog">
      <q-card class="bg-color">
        <q-card-section>
          {{ errorMessage }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const showErrorDialog = ref(false);
const errorMessage = ref('');

const onSubmit = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor, complete todos los campos.';
    showErrorDialog.value = true;
    return;
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      email: email.value,
      password: password.value,
    });
    console.log({response});

    const token = response.data.token;

    // Almacenar el token en el almacenamiento local
    localStorage.setItem('authToken', token);

    router.push('/home');
  } catch (error) {
    errorMessage.value = 'Correo electrónico o Contraseña incorrectos.';

    showErrorDialog.value = true;
    console.error('Error al iniciar sesión:', error);
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
