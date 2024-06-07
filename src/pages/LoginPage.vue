<template>
  <q-page class="flex flex-center">




        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="text-h6">Iniciar sesión</div>
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
          <div class="full-width text-center">
            <q-spinner-circle v-if="isLoading" size="3em" color="primary" />
          </div>
        </q-form>

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
import { QSpinner } from 'quasar';

const email = ref('');
const password = ref('');
const router = useRouter();
const showErrorDialog = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

const onSubmit = async () => {
  if (!email.value || !password.value) {
    handleLoginError('Por favor, complete todos los campos.');
    return;
  }
  isLoading.value = true;
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      email: email.value,
      password: password.value,
    });

    const token = response.data.token;
    localStorage.setItem('authToken', token);
    navigateHome();
  } catch (error) {
    handleLoginError('Correo electrónico o Contraseña incorrectos.');
    console.error('Error al iniciar sesión:', error);
  } finally {
    isLoading.value = false;
  }
};



const handleLoginError = (message: string) => {
  errorMessage.value = message;
  showErrorDialog.value = true;
};

const navigateHome = () => {
  router.push('/home');
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
