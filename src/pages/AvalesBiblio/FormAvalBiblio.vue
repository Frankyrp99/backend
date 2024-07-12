<template>
  <q-page>
    <div class=" column justify-center items-center">
      <q-form @submit="onSubmit" id="form">
        <div style="margin-top: 10px; margin-bottom: 10px">
          <h4 class="text-bold text-color">Nuevo Aval de Bibliografía</h4>
        </div>
        <div class="q-gutter-md row justify-center items-center">
          <div class=" q-gutter-xl row justify-center items-center">
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
          <div class="q-gutter-xl row justify-center items-center">
            <q-input
              filled
              v-model="form.total_asient"
              label="Total de Asientos Bibliográficos"
              class="form-item"
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) ||
                  'Total de Asientos es requerido',
                (val) => /^\d+$/.test(val) || 'Solo se permiten números',
              ]"
            />
            <q-input
              filled
              v-model="form.rev_bilio"
              label="Tipo de Revisión Bibliográfica"
              class="form-item"
              @click="showRevBiblioDialog = true"
              :rules="revRules"
            />
            <q-dialog v-model="showRevBiblioDialog" persistent>
              <selector-rev-biblio
                v-model="form.rev_bilio"
                :public-types="[
                  'Maestría',
                  'Doctorado',
                  'Trabajo de Diploma',
                  'Proyecto',
                  'Curso de Posgrado',
                  'Proyecto de Curso',
                  'Disciplina',
                  'Asignatura',
                  'Evaluación Ind. Prof',
                ]"
                :open-dialog-automatically="showRevBiblioDialog"
                @update:modelValue="form.rev_bilio = $event"
                @dialogClosed="hideRevBiblioDialog"
              />
            </q-dialog>
            <q-input
              filled
              v-model="form.niv_act"
              label="Nivel de Actualización"
              class="form-item"
              @click="showNivActDialog = true"
              :rules="revRules"
            />
            <q-dialog v-model="showNivActDialog" persistent>
              <selector-niv-act
                v-model="form.niv_act"
                :public-types="['Alto', 'Medio', 'Bajo']"
                :open-dialog-automatically="showNivActDialog"
                @update:modelValue="form.niv_act = $event"
                @dialogClosed="hideNivActDialog"
              />
            </q-dialog>
          </div>

          <div class="q-gutter-xl row justify-center items-center">
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
              v-model="form.pag"
              label="Página"
              class="form-item"
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Página es requerida',
                (val) => /^\d+$/.test(val) || 'Solo se permiten números',
              ]"
            />
          </div>
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
                      <q-btn v-close-popup label="Cerrar" color="primary" />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="column items-center">
          <h6 >Tipo de Búsqueda Informativa</h6>
          <div class="row q-gutter-xl">
            <div class="column">
              <q-checkbox
                v-model="form.bd_local"
                label="Base de Datos Locales"
              />
              <q-checkbox v-model="form.cd_rom" label="CD ROM / DVD" />
              <q-checkbox
                v-model="form.bd_internet"
                label="Base de Datos en Internet"
              />
              <q-checkbox
                v-model="form.curso_pos_bus"
                label="Curso de Posgrado"
              />
            </div>
            <div class="column">
              <q-checkbox
                v-model="form.busqueda_internet"
                label="Búsqueda en Internet"
              />
              <q-checkbox
                v-model="form.biblio_personal"
                label="Bibliografía Personal"
              />
              <q-checkbox v-model="form.otros" label="Otros" />
              <q-checkbox
                v-model="form.no_biblio"
                label="No Existe Bibliografía"
              />
            </div>
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
import { ref, reactive, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import SelectorDepartamento from 'src/components/SelectorDepartamento.vue';
import SelectorRevBiblio from 'src/components/SelectorRevBiblio.vue';
import SelectorNivAct from 'src/components/SelectorNivAct.vue';
import { useQuasar } from 'quasar';

interface Form {
  nombre: string;
  apellidos: string;
  departamento: string;
  total_asient: string;
  rev_bilio: string;
  bd_local: boolean;
  cd_rom: boolean;
  bd_internet: boolean;
  curso_pos_bus: boolean;
  busqueda_internet: boolean;
  biblio_personal: boolean;
  otros: boolean;
  no_biblio: boolean;
  tomo: string;
  pag: string;
  folio: string;
  fecha: string;
  niv_act: string;
}

// Definición de tipos para reglas de validación
type Rule = (value: string) => boolean | string;

// Inicialización del estado reactivo
const form = reactive<Form>({
  nombre: '',
  apellidos: '',
  departamento: '',
  rev_bilio: '',
  niv_act: '',
  total_asient: '',
  bd_local: false,
  cd_rom: false,
  bd_internet: false,
  curso_pos_bus: false,
  busqueda_internet: false,
  biblio_personal: false,
  otros: false,
  no_biblio: false,
  tomo: '',
  pag: '',
  folio: '',
  fecha: '',
});

const showNivActDialog = ref(false);
const hideNivActDialog = () => {
  showNivActDialog.value = false;
};
const router = useRouter();
const showRevBiblioDialog = ref(false);
const hideRevBiblioDialog = () => {
  showRevBiblioDialog.value = false;
};

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
const revRules: Rule[] = [(v) => !!v || 'El dato es requerido'];
const apellidosRules: Rule[] = [
  (v) => !!v || 'Los Apellidos son requeridos',
  (v) => v.length <= 50 || 'Los apellidos exceden el límite de 100 caracteres',
];

const departamentoRules: Array<(value: string) => boolean | string> = [
  (v) => !!v || 'El Departamento de Trabajo es requerido',
];
const fechaRules: Rule[] = [(v) => !!v || 'La Fecha es requerida'];

//peticioens
function onSubmit() {
  const authToken = localStorage.getItem('authToken'); // Asume que tienes un authToken almacenado
  const config = {
    headers: {
      Authorization: `Token ${authToken}`,
      'Content-Type': 'application/json',
    },
  };
  if (!form.nombre || !form.apellidos) {
    errorMessage.value = 'Por favor, completa todos los campos requeridos.';
    return;
  }
  $q.loading.show();
  api
    .post('/api/avales_biblio/', form, config)
    .then((response) => {
      router.push({ name: 'ListaAvalesBiblio' });
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
