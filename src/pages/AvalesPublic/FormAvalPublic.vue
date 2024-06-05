<template>
  <q-page>
    <div class="column justify-center items-center">
      <div style="margin-top: 20px; margin-bottom: 20px">
        <h4 class="text-bold">Nuevo Aval de Publicación</h4>
      </div>
      <q-form
        @submit="onSubmit"
        class=" bg-color"
        id="form"
      >
      <div class="q-gutter-md flex flex-row flex-wrap justify-between">
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
          style="max-width: 300px"
          autogrow
          filled
          v-model="form.lugar_pub"
          label="Lugar de Publicación"
          class="form-item"
          :rules="lugarpubRules"
        />
        <q-select
          filled
          v-model="form.tipo_recurso"
          :options="tiposRecurso"
          label="Tipo de Recurso"
          class="form-item"
          :rules="tipo_recursoRules"
        />
        <q-select
          filled
          v-model="form.tipo_publicacion"
          :options="tiposPublicacion"
          label="Tipo de Publicación"
          class="form-item"
          :rules="tipoPubRules"
        />
        <q-input
          v-if="form.tipo_publicacion === 'revistaImpresa'"
          filled
          v-model="form.issn"
          label="ISSN"
          class="form-item"
          :rules="issnRules"
        />
        <q-input
          v-if="form.tipo_publicacion === 'revistaDigital'"
          filled
          v-model="form.e_issn"
          label="E-ISSN"
          class="form-item"
          :rules="eissnRules"
        />
        <q-input
          v-if="
            form.tipo_publicacion === 'libroImpreso' ||
            form.tipo_publicacion === 'libroDigital'
          "
          filled
          v-model="form.isbn"
          label="ISBN"
          class="form-item"
          :rules="isbnRules"
        />
        <q-checkbox v-model="form.cdrom_dvd" label="CDROM/DVD" />
        <q-checkbox v-model="form.base_de_datos" label="Base de Datos" />

        <q-input
          filled
          type="url"
          v-model="form.url"
          label="URL"
          :rules="urlRules"
        />
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
                    <q-btn v-close-popup label="Cerrar" color="primary" flat />
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
import { ref, reactive, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SelectorDepartamento from 'src/components/SelectorDepartamento.vue';

interface Form {
  nombre: string;
  apellidos: string;
  titulo_recurso: string;
  departamento: string;
  lugar_pub: string;
  tomo: string;
  folio: string;
  tipo_publicacion: string;
  issn: string;
  e_issn: string;
  isbn: string;
  cdrom_dvd: boolean;
  base_de_datos: boolean;
  url: string;
  tipo_recurso: string;
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
  lugar_pub: '',
  tomo: '',
  folio: '',
  tipo_publicacion: '',
  issn: '',
  e_issn: '',
  isbn: '',
  cdrom_dvd: false,
  base_de_datos: false,
  url: '',
  tipo_recurso: '',
  fecha: '',
});

const tiposPublicacion: string[] = [
  'revistaImpresa',
  'revistaDigital',
  'libroImpreso',
  'libroDigital',
];

const tiposRecurso: string[] = ['articulo', 'libro', 'capitulo', 'epigrafe'];

const router = useRouter();
const errorMessage = ref('');
const showSelectorDepartamento = ref(false);
const closeFirstDialogAndUpdateModel = () => {
  showSelectorDepartamento.value = false;
};

function capitalizeWords(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

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
const departamentoRules: Rule[] = [
  (v) => !!v || 'El Departamento de Trabajo es requerido',
  (v) =>
    v.length <= 200 || 'El departamento excede el límite de 200 caracteres',
];
const lugarpubRules: Rule[] = [
  (v) => !!v || 'El Lugar de Publicación es requerido',
  (v) =>
    v.length <= 100 ||
    'El lugar de publicación excede el límite de 255 caracteres',
];

const fechaRules: Rule[] = [(v) => !!v || 'La Fecha es requerida'];

const tipo_recursoRules: Rule[] = [
  (v) => !!v || 'El Tipo de Recurso es requerido',
];
const tipoPubRules: Rule[] = [
  (v) => !!v || 'El Tipo de Publicación es requerido',
];
const issnRules: Rule[] = [(v) => !!v || 'El ISSN es requerido'];
const eissnRules: Rule[] = [(v) => !!v || 'El E-ISSN es requerido'];
const isbnRules: Rule[] = [(v) => !!v || 'El ISBN es requerido'];

// Reglas de validación actualizadas para el campo de URL
const urlRules: Rule[] = [
  (val) => !!val || 'La URL es requerida',

  (val) =>
    /\.(com|cu|ru)$/i.test(val.toLowerCase()) ||
    'La URL debe terminar con una extensión de dominio válida (.com,.cu,.ru)',
];

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
watchEffect(() => {
  if (form.url.trim() === '') {
    form.url = 'http://';
  }
});

function onSubmit() {
  if (!form.nombre || !form.apellidos || !form.titulo_recurso) {
    errorMessage.value = 'Por favor, completa todos los campos requeridos.';
    return;
  }

  axios
    .post('http://127.0.0.1:8000/api/profesores/', form)
    .then((response) => {
      console.log('Formulario enviado con éxito:', response.data);
      router.push({ name: 'ListaAvalesPublic' });
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
}
</script>
