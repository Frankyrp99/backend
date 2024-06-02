<template>
  <q-page>
    <div class="flex justify-center items-center" style="height: 130vh">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md flex flex-row flex-wrap justify-between bg-color"
        id="form"
      >
        <div class="text-center">
          <h4 id="form-title">Nuevo Aval de Publicación</h4>
        </div>
        <q-input
          filled
          v-model="form.nombre"
          label="Nombre"
          class="form-item"
          :rules="nombreRules"
        />
        <q-input
          filled
          v-model="form.apellidos"
          label="Apellidos"
          class="form-item"
          :rules="apellidosRules"
        />
        <q-input
          filled
          v-model="form.titulo_recurso"
          label="Título del Recurso"
          class="form-item"
          :rules="titulo_recursoRules"
        />
        <q-input
          filled
          v-model="form.departamento"
          label="Departamento de Trabajo"
          class="form-item"
          :rules="departamentoRules"
        />
        <q-input
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

        <q-input filled v-model="form.url" label="URL" />
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
        <q-input filled readonly  v-model="form.fecha" label="Fecha" :rules="fechaRules">
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

        <div>
          <q-btn
            flat
            rounded
            label="Guardar"
            type="submit"
            class="form-item"
            color="primary"
          />
          <q-btn
            flat
            rounded
            label="Exportar a PDF"
            class="form-item"
            @click="exportToPDF"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Definición de tipos para el formulario
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
// Reglas de validación
const nombreRules: Rule[] = [(v) => !!v || 'El Nombre es requerido'];
const apellidosRules: Rule[] = [(v) => !!v || 'Los Apellidos son requeridos'];
const titulo_recursoRules: Rule[] = [(v) => !!v || 'El Titulo es requerido'];
const departamentoRules: Rule[] = [
  (v) => !!v || 'El Departamentode Trabajo es requerido',
];
const fechaRules: Rule[] = [(v) => !!v || 'La Fecha es requerida'];
const lugarpubRules: Rule[] = [
  (v) => !!v || 'El Lugar de la Publicación es requerido',
];
const tipo_recursoRules: Rule[] = [
  (v) => !!v || 'El Tipo de Recurso es requerido',
];
const tipoPubRules: Rule[] = [
  (v) => !!v || 'El Tipo de Publicación es requerido',
];
const issnRules: Rule[] = [(v) => !!v || 'El ISSN es requerido'];
const eissnRules: Rule[] = [(v) => !!v || 'El E-ISSN es requerido'];
const isbnRules: Rule[] = [(v) => !!v || 'El ISBN es requerido'];

watch(
  () => form.url,
  (newVal) => {
    let modifiedUrl = newVal;
    if (!newVal.startsWith('http://') && !newVal.startsWith('https://')) {
      modifiedUrl = 'https://' + newVal;
    }
    if (modifiedUrl !== newVal) {
      form.url = modifiedUrl;
    }
  },
  { immediate: true }
);

function onSubmit() {
  if (!form.nombre || !form.apellidos || !form.titulo_recurso) {
    errorMessage.value = 'Por favor, completa todos los campos requeridos.';
    return;
  }

  axios.post('http://127.0.0.1:8000/api/profesores/', form)
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

function exportToPDF() {
  // Asegúrate de que 'form' esté definido y accesible aquí
  const formElement = document.getElementById('form');
  if (!formElement) {
    console.error('No se encontró el elemento del formulario');
    return;
  }

  html2canvas(formElement)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      // Asegúrate de que 'form.titulo_recurso' esté definido
      if (form.titulo_recurso) {
        pdf.save(`${form.titulo_recurso}.pdf`);
      } else {
        console.error(
          "El campo 'titulo_recurso' no está definido en el formulario"
        );
      }
    })
    .catch((error) => {
      console.error('Error al generar el PDF:', error);
    });
}

// Declaración de variables reactivas adicionales si es necesario
const errorMessage = ref('');
</script>
