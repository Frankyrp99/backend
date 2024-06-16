<template>
  <q-page>
    <div class="column justify-center items-center">
      <div style="margin-top: 20px; margin-bottom: 20px">
        <h4 class="text-bold">Nuevo Aval de Bibliografía</h4>
      </div>
      <q-form @submit="onSubmit"  id="form">
        <div class="q-gutter-md row justify-center items-center ">
          <q-input
            style="max-width: 300px"
            autogrow
            filled
            v-model="form.nombre"
            label="Nombre"
            class="form-item"
            :rules="nombreRules"
          />
          <q-input
            style="max-width: 300px"
            autogrow
            filled
            v-model="form.apellidos"
            label="Apellidos"
            class="form-item"
            :rules="apellidosRules"
          />
          <q-input
            style="max-width: 300px"
            autogrow
            filled
            v-model="form.titulo_recurso"
            label="Título del Recurso"
            class="form-item"
            :rules="titulo_recursoRules"
          />
          <q-input
            filled
            v-model="form.departamento"
            label="Departamento"
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

          <q-input
            filled
            v-model="form.tomo"
            label="Tomo"
            :rules="[
              (val) => (val && val.trim().length > 0) || 'Tomo es requerido',
              (val) => /^\d+$/.test(val) || 'Solo se permiten números',
            ]"
          />
          <q-input
            filled
            v-model="form.folio"
            label="Folio"
            class="form-item"
            :rules="[
              (val) => (val && val.trim().length > 0) || 'Folio es requerido',
              (val) => /^\d+$/.test(val) || 'Solo se permiten números',
            ]"
          />

          <q-input
            filled
            readonly
            v-model="form.fecha"
            label="Fecha"
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
                      <q-btn
                        v-close-popup
                        label="Cerrar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row justify-center items-center">
          <q-btn
            flat
            rounded
            label="Guardar"
            type="submit"
            class="form-item"
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
const showSelectorDepartamento = ref(false);
const closeFirstDialogAndUpdateModel = () => {
  showSelectorDepartamento.value = false;
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

  api
    .post('/api/avales_biblio/', form)
    .then((response) => {
      console.log('Formulario enviado con éxito:', response.data);
      router.push({ name: 'ListaAvalesBiblio' });
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        errorMessage.value =
          error.response.data.detail ||
          'Hubo un error al enviar el formulario.';
      } else {
        errorMessage.value =
          'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.';
      }
      console.error('Error al enviar el formulario:', error);
    });
    $q.notify({
    type: 'positive',
    message: '¡Aval Registrado con Éxito !',
    position: 'top-right'
  });
}

// Declaración de variables reactivas adicionales si es necesario
const errorMessage = ref('');
</script>
