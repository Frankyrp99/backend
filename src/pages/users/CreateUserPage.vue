<template>
  <div class="column justify-center items-center">
    <q-form @submit="onSubmit" id="form">
      <div style="margin-top: 10px; margin-bottom: 10px">
        <h4 class="text-bold text-color">Nuevo Usuario</h4>
      </div>
      <div class="q-gutter-md column justify-center items-center">
        <q-input
          style="width: 300px"
          autogrow
          filled
          class="form-item"
          v-model="form.email"
          label="Email"
          :rules="email_Rules"
        />
        <q-input
          style="width: 250px"
          filled
          v-model="form.password"
          label="Contraseña"
          :rules="password_Rules"
        />
        <q-input
          filled
          v-model="form.role"
          label="Rol"
          class="form-item"
          :rules="profile_Rules"
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
        <div>
          <q-btn
            class="text-bold"
            rounded
            label="Guardar"
            type="submit"
            color="primary"
          />
        </div>
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
  email: string;
  password: string;
  role: string;
}
type Rule = (value: string) => boolean | string;
const form = reactive<Form>({
  email: '',
  password: '',
  role: '',
});

const $q = useQuasar();
const router = useRouter();
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


//watchers

async function onSubmit() {
  if (!form.email || !form.password) {
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
    $q.loading.show();

    const response = await api.post('/api/users/list/', form, config);

    if (response) {
      console.log('Formulario enviado con éxito:');
      $q.notify({
        type: 'positive',
        message: '¡Usuario Registrado con Éxito !',
        position: 'top-right',
      });
      $q.loading.hide();
      router.push({ name: 'usuarios' });
    } else {
      $q.loading.hide();
      $q.notify({
        type: 'negative',
        message: 'Hubo un error al enviar el formulario. ',
        position: 'top-right',
      });
    }
  } catch (error) {
    $q.loading.hide();
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
