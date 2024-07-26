<template>
  <q-page>
    <div
      class="row justify-around"
      style="margin-top: 30px; margin-bottom: 30px"
    >
      <div>
        <p class="text-bold text-body1">Aval de Tutoría</p>
        <p class="text-bold text-body2" style="color: grey">
          Introduce los datos del aval
        </p>
      </div>

      <q-form @submit="onSubmit" id="form">
        <div class="q-gutter-md row justify-center items-center">
          <div class="q-gutter-xl q-gutter-y-md row justify-around">
            <div class="column q-gutter-md-y-sm">
              <div><p class="text-bold text-body2">Nombre</p></div>
              <q-input
                style="width: 200px"
                autogrow
                outlined
                dense
                v-model="form.nombre"
                label="Ej: Pedro"
                class="form-item"
                :rules="nombreRules"
              />
            </div>
            <div class="column q-gutter-md-y-sm">
              <div><p class="text-bold text-body2">Apellidos</p></div>
              <q-input
                style="width: 200px"
                autogrow
                outlined
                dense
                v-model="form.apellidos"
                label="Ej: Rodriguez"
                class="form-item"
                :rules="apellidosRules"
              />
            </div>
            <div class="column q-gutter-md-y-sm">
              <div>
                <p class="text-bold text-body2">Departamento de Trabajo</p>
              </div>
              <q-input
                style="width: 200px"
                outlined
                dense
                v-model="form.departamento"
                label="Selecciona un Departamento"
                class="form-item"
                @click="showSelectorDepartamento = true"
                :rules="departamentoRules"
              />
              <q-dialog v-model="showSelectorDepartamento" persistent>
                <SelectorDepartamento
                  v-model="form.departamento"
                  :departamento-rules="departamentoRules"
                  :open-first-dialog-automatically="true"
                  @close-first-dialog="closeFirstDialogAndUpdateModel"
                />
              </q-dialog>
            </div>
          </div>
          <div class="content-div">
            <div>
              <p class="text-bold text-body2">Título</p>
            </div>
            <div>
              <q-input
                autogrow
                outlined
                dense
                v-model="form.titulo_recurso"
                label="Título del Recurso a avalar"
                :rules="titulo_recursoRules"
              />
            </div>
          </div>

          <div class="row q-gutter-xl q-gutter-y-md">
            <div>
              <div>
                <p class="text-bold text-body2" style="width: 200px">Tomo</p>
              </div>
              <q-input
                style="width: 200px"
                outlined
                dense
                v-model="form.tomo"
                label="Introduce el Tomo"
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'Tomo es requerido',
                  (val) => /^\d+$/.test(val) || 'Solo se permiten números',
                ]"
              />
            </div>
            <div>
              <div>
                <p class="text-bold text-body2" style="width: 200px">Folio</p>
              </div>
              <q-input
                style="width: 200px"
                outlined
                dense
                v-model="form.folio"
                label="Introduce el Folio"
                class="form-item"
                :rules="[
                  (val) =>
                    (val && val.trim().length > 0) || 'Folio es requerido',
                  (val) => /^\d+$/.test(val) || 'Solo se permiten números',
                ]"
              />
            </div>
            <div>
              <div>
                <p class="text-bold text-body2" style="width: 200px">Fecha</p>
              </div>
              <q-input
                style="width: 200px"
                outlined
                dense
                readonly
                v-model="form.fecha"
                label="Selecciona una Fecha "
                :rules="fechaRules"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="form.fecha" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <q-separator inset class="container" />
        <div class="row justify-end items-center">
          <q-btn
            rounded
            size="sm"
            label="Volver"
            class="form-item text-weight-bolder"
            color="primary"
            style="margin-top: 20px; margin-bottom: 20px; margin-right: 10px"
            @click="goBack"
          />
          <q-btn
            rounded
            size="sm"
            label="Guardar"
            type="submit"
            class="form-item text-weight-bolder"
            color="primary"
            style="margin-top: 20px; margin-bottom: 20px"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import SelectorDepartamento from 'src/components/SelectorDepartamento.vue';
import { useQuasar } from 'quasar';

interface Form {
  nombre: string;
  apellidos: string;
  titulo_recurso: string;
  departamento: string;
  tomo: string;
  folio: string;
  fecha: string;
}

// Definición de tipos para reglas de validación
type Rule = (value: string) => boolean | string;

// Inicialización del estado reactivo
const form = reactive<Form>({
  nombre: '',
  apellidos: '',
  titulo_recurso: '',
  departamento: '',
  tomo: '',
  folio: '',
  fecha: '',
});
const router = useRouter();
const $q = useQuasar();
//variables del selector del departamento
const showSelectorDepartamento = ref(false);
const closeFirstDialogAndUpdateModel = () => {
  showSelectorDepartamento.value = false;
};
const goBack = () => {
  router.back();
};
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

// Reglas de validación
const nombreRules: Rule[] = [
  (v) => !!v || 'El Nombre es requerido',
  (v) => v.length <= 50 || 'El nombre excede el límite de 100 caracteres',
];
const apellidosRules: Rule[] = [
  (v) => !!v || 'Los Apellidos son requeridos',
  (v) => v.length <= 50 || 'Los apellidos exceden el límite de 100 caracteres',
];
const titulo_recursoRules: Rule[] = [
  (v) => !!v || 'El Título del Recurso es requerido',
  (v) =>
    v.length <= 500 ||
    'El título del recurso excede el límite de 500 caracteres',
];
const departamentoRules: Array<(value: string) => boolean | string> = [
  (v) => !!v || 'El Departamento de Trabajo es requerido',
];
const fechaRules: Rule[] = [(v) => !!v || 'La Fecha es requerida'];

//peticioens
function onSubmit() {
  if (!form.nombre || !form.apellidos || !form.titulo_recurso) {
    errorMessage.value = 'Por favor, completa todos los campos requeridos.';
    return;
  }
  const authToken = localStorage.getItem('authToken'); // Asume que tienes un authToken almacenado
  const config = {
    headers: {
      Authorization: `Token ${authToken}`,
      'Content-Type': 'application/json',
    },
  };
  $q.loading.show();
  api
    .post('/api/avales_tuto/', form, config)
    .then((response) => {
      console.log('Formulario enviado con éxito:');
      router.push({ name: 'ListaAvalesTuto' });
      $q.loading.hide();
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        $q.loading.hide();
        $q.notify({
          type: 'negative',
          message: 'Hubo un error al enviar el formulario.',
          position: 'top-right',
        });
      } else {
        $q.loading.hide();
        $q.notify({
          type: 'negative',
          message:
            'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
          position: 'top-right',
        });
      }
      console.error('Error al enviar el formulario:', error);
    });
  $q.notify({
    type: 'positive',
    message: '¡Aval Registrado con Éxito !',
    position: 'top-right',
  });
}

// Declaración de variables reactivas adicionales si es necesario
const errorMessage = ref('');
</script>
