<template>
  <q-page>
    <div class="column justify-center items-center">
      <q-form @submit="onSubmit" id="form">
        <div style="margin-top: 10px; margin-bottom: 10px">
          <h4 class="text-bold text-color">Nuevo Aval de Publicación</h4>
        </div>
        <div class="q-gutter-md flex flex-row flex-wrap justify-center">
          <div class="q-gutter-xl q-gutter-y-md row justify-around" >
            <q-input
              style="width: 200px"
              autogrow
              filled
              v-model="form.nombre"
              label="Nombre"
              class="form-item"
              :rules="nombreRules"
            />
            <q-input
              style="width: 200px"
              autogrow
              filled
              v-model="form.apellidos"
              label="Apellidos"
              class="form-item"
              :rules="apellidosRules"
            />
            <q-input
              style="width: 200px"
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
          </div>
          <div class="content-div">
            <q-input
              autogrow
              filled
              v-model="form.titulo_recurso"
              label="Título del Recurso"

              :rules="titulo_recursoRules"
            />
          </div>
          <div class="q-gutter-xl q-gutter-y-md row justify-around">
            <q-input
              style="width: 200px"
              autogrow
              filled
              v-model="form.lugar_pub"
              label="Lugar de Publicación"
              class="form-item"
              :rules="lugarpubRules"
            />

            <q-input
              style="width: 200px"
              filled
              v-model="form.tipo_recurso"
              label="Tipo de Recurso"
              class="form-item"
              @click="showTipoRecursoDialog = true"
              :rules="tipo_recursoRules"
            />
            <q-dialog v-model="showTipoRecursoDialog" persistent>
              <selector-tipo-recurso
                v-model="form.tipo_recurso"
                :resource-types="['Artículo', 'Libro', 'Capítulo', 'Epígrafe']"
                :open-dialog-automatically="showTipoRecursoDialog"
                @update:modelValue="form.tipo_recurso = $event"
                @dialogClosed="hideTipoRecursoDialog"
              />
            </q-dialog>
            <q-input
              style="width: 200px"
              filled
              v-model="form.tipo_publicacion"
              label="Tipo de Publicación"
              class="form-item"
              @click="showTipoPublicDialog = true"
              :rules="tipoPubRules"
            />
            <q-dialog v-model="showTipoPublicDialog" persistent>
              <selector-tipo-public
                v-model="form.tipo_publicacion"
                :public-types="[
                  'Revista Impresa',
                  'Revista Digital',
                  'Libro Impreso',
                  'Libro Digital',
                ]"
                :open-dialog-automatically="showTipoPublicDialog"
                @update:modelValue="form.tipo_publicacion = $event"
                @dialogClosed="hideTipoPublicDialog"
              />
            </q-dialog>
          </div>
          <div class="q-gutter-xl q-gutter-y-md row items-center">
            <q-input
              style="width: 200px"
              v-if="form.tipo_publicacion === 'Revista Impresa'"
              filled
              v-model="form.issn"
              label="ISSN"
              class="form-item"
              :rules="issnRules"
            />
            <q-input
              style="width: 200px"
              v-if="form.tipo_publicacion === 'Revista Digital'"
              filled
              v-model="form.e_issn"
              label="E-ISSN"
              class="form-item"
              :rules="eissnRules"
            />
            <q-input
              style="width: 200px"
              v-if="
                form.tipo_publicacion === 'Libro Impreso' ||
                form.tipo_publicacion === 'Libro Digital'
              "
              filled
              v-model="form.isbn"
              label="ISBN"
              class="form-item"
              :rules="isbnRules"
            />
            <q-input
              style="width: 200px"
              filled
              v-model="form.grupo"
              label="Grupo"
              class="form-item"
              @click="showGrupoDialog = true"
              :rules="grupoRules"
            />
            <q-dialog v-model="showGrupoDialog" persistent>
              <selector-grupo
                v-model="form.grupo"
                :public-types="[
                  'Grupo 1',
                  ' Grupo 2',
                  ' Grupo 3',
                  ' Grupo 4',
                  ' No Precisado',
                ]"
                :open-dialog-automatically="showGrupoDialog"
                @update:modelValue="form.grupo = $event"
                @dialogClosed="hideGrupoDialog"
              />
            </q-dialog>
            <q-input
              style="width: 200px"
              autogrow
              filled
              v-model="form.url"
              label="URL"
              :rules="urlRules"
            />
          </div>
          <div class="row q-gutter-xl q-gutter-y-md">
            <q-input
              style="width: 200px"
              filled
              v-model="form.tomo"
              label="Tomo"
              :rules="[
                (val) => (val && val.trim().length > 0) || 'Tomo es requerido',
                (val) => /^\d+$/.test(val) || 'Solo se permiten números',
              ]"
            />
            <q-input
              style="width: 200px"
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
              style="width: 200px"
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
                        <q-btn v-close-popup label="Cerrar" color="primary" />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row justify-around">
            <q-checkbox v-model="form.cdrom_dvd" label="CDROM/DVD" />
            <q-checkbox v-model="form.base_de_datos" label="Base de Datos" />
          </div>
        </div>
        <div class="row justify-center items-center">
          <q-btn
            rounded
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
import { ref, reactive, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import SelectorDepartamento from 'src/components/SelectorDepartamento.vue';
import SelectorTipoRecurso from 'src/components/SelectorTipoRecurso.vue';
import SelectorTipoPublic from 'src/components/SelectorTipoPublic.vue';
import SelectorGrupo from 'src/components/SelectorGrupo.vue';

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
  grupo: string;
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
  grupo: '',
});

const $q = useQuasar();
const router = useRouter();
const errorMessage = ref('');
const showSelectorDepartamento = ref(false);
const closeFirstDialogAndUpdateModel = () => {
  showSelectorDepartamento.value = false;
};
const showTipoRecursoDialog = ref(false);
const hideTipoRecursoDialog = () => {
  showTipoRecursoDialog.value = false;
};

const showTipoPublicDialog = ref(false);
const hideTipoPublicDialog = () => {
  showTipoPublicDialog.value = false;
};
const showGrupoDialog = ref(false);
const hideGrupoDialog = () => {
  showGrupoDialog.value = false;
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
const grupoRules: Rule[] = [(v) => !!v || 'El Grupo es requerido'];

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

const urlRules: Rule[] = [
  (val: string): string | boolean => {
    const domainExtensions = /\.(com|cu|ru)$/i;
    if (!domainExtensions.test(val.toLowerCase())) {
      return 'La URL debe terminar con una extensión de dominio válida (.com,.cu,.ru)';
    }
    return true; // Retorna true si la URL es válida
  },
];

// Watcher
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

function formatWithInfiniteSeparators(value) {
  // Convertir el valor a una cadena y eliminar caracteres no numéricos
  let cleaned = ('' + value).replace(/\D/g, '');

  // Dividir la cadena en grupos de tres dígitos
  let groups = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    groups.push(cleaned.substr(i, 4));
  }

  // Concatenar los grupos con guiones
  let result = groups.join('-');

  return result;
}

// Uso en los watchers para form.isbn, form.issn, y form.e_issn
watch(
  () => form.isbn,
  (newValue) => {
    form.isbn = formatWithInfiniteSeparators(newValue);
  },
  { immediate: true }
);
watch(
  () => form.issn,
  (newValue) => {
    form.issn = formatWithInfiniteSeparators(newValue);
  },
  { immediate: true }
);

watch(
  () => form.e_issn,
  (newValue) => {
    form.e_issn = formatWithInfiniteSeparators(newValue);
  },
  { immediate: true }
);

watchEffect(() => {
  if (form.tipo_publicacion !== form.tipo_publicacion.value) {
    form.isbn = '';
    form.issn = '';
    form.e_issn = '';
  }
});

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
    .post('/api/profesores/', form, config)
    .then((response) => {
      console.log('Formulario enviado con éxito:');
      router.push({ name: 'ListaAvalesPublic' });
      $q.loading.hide();
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        $q.notify({
          type: 'negative',
          message: 'Hubo un error al enviar el formulario.',
          position: 'top-right',
        });
        $q.loading.hide();
      } else {
        $q.notify({
          type: 'negative',
          message:
            'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
          position: 'top-right',
        });
        $q.loading.hide();
      }
      console.error('Error al enviar el formulario:', error);
    });
  $q.notify({
    type: 'positive',
    message: '¡Aval Registrado con Éxito !',
    position: 'top-right',
  });
}
</script>
