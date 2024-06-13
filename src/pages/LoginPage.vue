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
          (val) => (val && val.length > 0) || 'Por favor ingrese su contraseña',
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
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const email = ref('');
const password = ref('');
const router = useRouter();

const errorMessage = ref('');
const isLoading = ref(false);
const $q = useQuasar();
const onSubmit = async () => {
  if (!email.value || !password.value) {
    handleLoginError('Por favor, complete todos los campos.');
    return;
  }
  isLoading.value = true;
  try {
    const response = await api.post('/api/token/', {
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

  $q.notify({
    type: 'negative',
    message: 'Correo electrónico o Contraseña incorrectos.',
    position: 'top-right',
    color: 'red',
    textColor: 'white',
    icon: 'error_outline',
  });
};

const navigateHome = () => {
  router.push('/home');
  $q.notify({
    type: 'positive',
    message: '¡Inicio de sesión exitoso!',
    position: 'top-right',
  });
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
