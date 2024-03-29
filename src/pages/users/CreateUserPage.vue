<template>
  <div class="flex justify-center items-center" style="height: 130vh">
    <q-form @submit="onSubmit" class="q-gutter-md" id="form">
      <h4>Nuevo Usuario</h4>
      <q-input
        filled
        v-model="form.nombre"
        label="Nombre"
        :rules="nombreRules"
      />
      <q-input
        filled
        v-model="form.apellidos"
        label="Apellidos"
        :rules="apellidosRules"
      />
      <q-input filled v-model="form.email" label="Email" :rules="email_Rules" />
      <q-input
        filled
        v-model="form.password"
        label="Contraseña"
        :rules="password_Rules"
      />
      <q-select
        filled
        v-model="form.role"
        :options="role"
        label="Rol"
        :rules="profile_Rules"
      />

      <div>
        <q-btn flat rounded label="Guardar" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  nombre: '',
  email: '',
  apellidos: '',
  password: '',
  role: '',
});

const role = ['admin', 'especialista', 'invitado'];

const nombreRules = [(v) => !!v || 'El Nombre es requerido'];
const apellidosRules = [(v) => !!v || 'Los Apellidos son requeridos'];
const email_Rules = [
  (v) => !!v || 'El Email es requerido',
  (v) =>
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v) ||
    'El Email no es válido',
];
const password_Rules = [(v) => !!v || 'La Contraseña es requerida'];
const profile_Rules = [(v) => !!v || 'El Perfil de Usuario es requerido'];

const onSubmit = () => {
  if (
    !form.value.nombre ||
    !form.value.apellidos ||
    !form.value.email ||
    !form.value.password ||
    !form.value.role
  ) {
    console.error('Por favor, completa todos los campos requeridos.');
    return;
  }

  axios
    .post('http://127.0.0.1:8000/api/users/create/', form.value)
    .then((response) => {
      console.log('Usuario creado con éxito:', response.data);
      // Aquí puedes redirigir al usuario a la página principal
    })
    .catch((error) => {
      console.error('Error al enviar el formulario:', error);
      // Aquí puedes manejar y mostrar el mensaje de error al usuario
    });
};
</script>
