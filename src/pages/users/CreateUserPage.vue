<template>
  <div class="column justify-center items-center">
    <q-form @submit="onSubmit" id="form">
      <div style="margin-top: 10px; margin-bottom: 10px">
        <h4 class="text-bold">Nuevo Usuario</h4>
      </div>
      <div class="q-gutter-xl row justify-center items-center">
        <q-input
          filled
          class="form-item"
          v-model="form.nombre"
          label="Nombre"
          :rules="nombreRules"
        />
        <q-input
          filled
          class="form-item"
          v-model="form.apellidos"
          label="Apellidos"
          :rules="apellidosRules"
        />
        <q-input
          filled
          v-model="form.role"
          label="Rol"
          class="form-item"
          @click="showNivActDialog = true"
        />
        <q-dialog v-model="showNivActDialog" persistent>
          <selector-rol
            v-model="form.role"
            :public-types="['admin', 'especialista', 'invitado']"
            :open-dialog-automatically="showNivActDialog"
            @update:modelValue="form.role = $event"
            @dialogClosed="hideNivActDialog"
          />
        </q-dialog>
      </div>
      <div class="q-gutter-xl row justify-center items-center">
        <q-input
          style="width: 500px"
          autogrow
          filled
          class="form-item"
          v-model="form.email"
          label="Email"
          :rules="email_Rules"
        />
      </div>
      <q-input
        style="width: 350px"
        filled
        v-model="form.password"
        label="Contraseña"
        :rules="password_Rules"
      />
      <div>
        <q-btn
          flat
          class="text-bold"
          rounded
          label="Guardar"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { api } from 'src/boot/axios';
import SelectorRol from 'src/components/SelectorRol.vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const showNivActDialog = ref(false);
const hideNivActDialog = () => {
  showNivActDialog.value = false;
};
interface Form {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  role: string;
}
type Rule = (value: string) => boolean | string;
const form = reactive<Form>({
  nombre: '',
  email: '',
  apellidos: '',
  password: '',
  role: '',
});

const $q = useQuasar();
const router = useRouter();
const nombreRules: Rule[] = [(v) => !!v || 'El Nombre es requerido'];
const apellidosRules: Rule[] = [(v) => !!v || 'Los Apellidos son requeridos'];
const email_Rules: Rule[] = [
  (v) => !!v || 'El Email es requerido',
  (v) =>
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v) ||
    'El Email no es válido',
];
const password_Rules: Rule[] = [(v) => !!v || 'La Contraseña es requerida'];
const profile_Rules: Rule[] = [
  (v) => !!v || 'El Perfil de Usuario es requerido',
];

//metodos
function capitalizeWords(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

//watchers
watch(
  () => form.nombre,
  (newValue) => {
    form.nombre = capitalizeWords(newValue);
  },
  { deep: true }
);

watch(
  () => form.apellidos,
  (newValue) => {
    form.apellidos = capitalizeWords(newValue);
  },
  { deep: true }
);

async function onSubmit() {
  if (!form.nombre || !form.apellidos) {
    $q.notify({
      type: 'negative',
      message: 'Por favor complete todos los campos',
      position: 'top-right',
    });
    return;
  }

  try {
    const authToken = localStorage.getItem('authToken');

    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.post('/api/users/list/', form, config);

    if (response) {
      console.log('Formulario enviado con éxito:', response.data.message);
      $q.notify({
        type: 'positive',
        message: '¡Usuario Registrado con Éxito !',
        position: 'top-right',
      });
      router.push({ name: 'usuarios' });
    } else {
      $q.notify({
        type: 'negative',
        message: 'Hubo un error al enviar el formulario. ',
        position: 'top-right',
      });
    }
  } catch (error) {
    let errorMessage =
      'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.';
    if (error) {
      errorMessage = 'Hubo un error al enviar el formulario: ';
    }
    $q.notify({
      type: 'negative',
      message: errorMessage,
      position: 'top-right',
    });
    console.error('Error al enviar el formulario:', error);
  }
}
</script>
