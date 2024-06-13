<template>
  <div class="q-pa-lg">
    <q-card class="row justify-evenly align-center">
      <div class="flex flex-row items-center">
        <q-card-section>
          <q-btn class="text-bold"
            >Cantidad de Avales del Departamento: {{ cantidadDeAvaless }}</q-btn
          >
        </q-card-section>
        <q-card-section class="text-bold">
          <q-btn @click="dialogDepartamentosVisible = true" class="text-bold"
            >Ver Cantidad Global por Departamento</q-btn
          >
        </q-card-section>
      </div>
    </q-card>
    <q-table
      :rows="reportData.rows"
      :columns="columnas"
      :filter="search"
      class="q-mt-md"
      dense
      no-data-label="No hay datos disponibles."
      no-results-label="No se encontraron resultados para tu búsqueda."
      :loading="isLoading"
      loading-label="Cargando..."
    >
      <template v-slot:top-left>
        <q-input
          autogrow
          filled
          v-model="departamentoSeleccionado"
          label="Seleccione un Departamento"
          @click="showSelectorDepartamento = true"
          @update:model-value="mostrarAvales"
        />
      </template>
      <template v-slot:top-right>
        <q-input dense outlined v-model="search" placeholder="Buscar" />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>

          <q-td auto-width>
            <q-btn color="primary" icon="visibility" size="sm" flat dense />

          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="showSelectorDepartamento" persistent>
      <SelectorDepartamento
        v-model="departamentoSeleccionado"
        :open-first-dialog-automatically="true"
        @close-first-dialog="closeFirstDialogAndUpdateModel"
        @update:model-value="mostrarAvales"
      />
    </q-dialog>
    <q-dialog v-model="dialogDepartamentosVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6 text-bold">
            Cantidad de Avales por Departamento y Facultad
          </div>
          <ul class="text-bold">
            <li

              v-for="(departamentos, facultad) in avalesPorFacultad"
              :key="facultad"
            >
              <strong>{{ facultad }}:</strong>
              <ul>
                <li
                  v-for="departamento in Object.keys(departamentos)"
                  :key="departamento"
                >
                  {{ departamento }}: {{ departamentos[departamento] || 0 }}
                </li>
              </ul>
            </li>
          </ul>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cerrar"
            @click="dialogDepartamentosVisible = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import { api } from 'src/boot/axios';
import SelectorDepartamento from 'src/components/SelectorDepartamento.vue';

interface Aval {
  tipo: string;
  nombre_completo: string;
  departamento: string;
  fecha: string;
}

interface avalesPorFacultad {
  [facultad: string]: {
    [departamento: string]: number;
  };
}

type ColumnType = {
  name: string;
  required?: boolean;
  label: string;
  align: string;
  field: string;
  filter?: boolean;
  sortable?: boolean;
  format?: (value: string) => string;
};

let departamentoSeleccionado = ref('');
const search = ref('');
const showSelectorDepartamento = ref(false);
const closeFirstDialogAndUpdateModel = () => {
  showSelectorDepartamento.value = false;
};
const dialogDepartamentosVisible = ref(false);
const isLoading = ref(false);
const columnas: ColumnType[] = [
  {
    name: 'tipo',
    required: true,
    label: 'Tipo de Aval',
    align: 'left',
    field: 'tipo',
    filter: true,
    sortable: true,
    format: (value: string) => {
      if (value === 'Profesor') {
        return 'Aval de Publicación';
      } else if (value === 'avales_tuto') {
        return 'Aval de Tutoría';
      } else if (value === 'avales_biblio') {
        return 'Aval de Bibliografía';
      } else {
        return value;
      }
    },
  },
  {
    name: 'nombre_completo',
    required: true,
    label: 'Nombre Completo',
    align: 'left',
    field: 'nombre_completo',
    filter: true,
    sortable: true,
  },
  {
    name: 'departamento',
    required: true,
    label: 'Departamento',
    align: 'left',
    field: 'departamento',
    filter: true,
    sortable: true,
  },
  {
    name: 'fecha',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: 'fecha',
    filter: true,
    sortable: true,
  },
];

const reportData = reactive({
  rows: [] as Aval[],
});

const cantidadDeAvaless = computed(() => {
  if (!departamentoSeleccionado.value) return 0;
  return reportData.rows.filter(
    (row) => row.departamento === departamentoSeleccionado.value
  ).length;
});

const avalesPorDepartamento = reactive({});
const avalesPorFacultad: avalesPorFacultad = reactive({});
const departamentosPorFacultad = reactive({
  'Ciencias Sociales': [
    'Derecho',
    'Estudios Socioculturales',
    'Psicología - Sociología',
  ],
  'Ciencias Aplicadas': [
    'Alimentos',
    'Educación Biología',
    'Educación Geografía',
    'Ingeniería Química',
    'Ingeniería Industrial',
    'Química',
    'CEECE',
    'CEGEA',
  ],
  'Ciencias Agropecuarias': [
    'Agronomía',
    'Educación Agropecuaria',
    'Morfofisiología',
    'Medicina Veterinaria',
    'CEDEPA',
  ],
  'Ciencias Económicas': [
    'Contabilidad',
    'Economía',
    'Educación Economía',
    'Turismo',
    'CEMTUR',
    'CEDET',
  ],
  Electromecánica: [
    'Educación Electromecánica',
    'Ingeniería Eléctrica',
    'Ingeniería Mecánica',
    'CEEFREP',
  ],
  Construcciones: [
    'Arquitectura',
    'Educación Construcción',
    'Ingeniería Civil',
    'CECODEC',
  ],
  'Lengua y Comunicación': [
    'Español',
    'Lenguas Extranjeras',
    'Periodismo y Comunicación Social',
    'Centro de Idiomas',
  ],
  'Informática y Ciencias Exactas': [
    'Educación Laboral e Informática',
    'Ciencias de la Información',
    'Ingeniería Informática',
    'Física',
    'Matemática',
  ],
  'Ciencias Pedagógicas': [
    'Educación Artística',
    'Educación Especial',
    'Educación Pedagogía - Psicología',
    'Formación Pedagógica General',
    'Educación Preescolar',
    'Educación Primaria',
  ],
  'Cultura Física': [
    'Cultura Física',
    'Ciencias Aplicadas al Deporte',
    'Didáctica del Deporte',
    'Educación Física y Recreación',
    'CEAFIDE',
  ],
  CUM: [
    'Céspedes',
    'Esmeralda',
    'Florida',
    'Guáimaro',
    'Jimaguayú',
    'Minas',
    'Najasa',
    'Nuevitas',
    'Santa Cruz del Sur',
    'Sibanicú',
    'Sierra de Cubitas',
    'Vertientes',
  ],
});

///////////consultas////////
async function cargarDatos() {
  try {
    const response = await api.get(
      `/api/reporte-departamento/${departamentoSeleccionado.value}/`
    );

    const data = response.data;

    // Combina los arrays de avales en uno único
    const combinedAvals = Object.values(data).flat() as Aval[];

    // Actualiza avales con los avales combinados
    reportData.rows = combinedAvals;
  } catch (error) {
    console.error('Error al cargar los datos del endpoint:', error);
  }
  cargarDatos1()
}

async function procesarAvalessPorDepartamento() {
  try {
    const response = await api.get(
      '/api/reporte-total-avaless-por-departamento/'
    );
    const data = response.data;

    // Procesar los datos obtenidos
    Object.keys(data).forEach((departamento) => {
      const facultad = obtenerFacultadPorDepartamento(departamento);

      // Asignar avales por departamento
      avalesPorDepartamento[departamento] = data[departamento];

      // Asignar avales por facultad, asegurándose de que la facultad exista
      if (!avalesPorFacultad[facultad]) {
        avalesPorFacultad[facultad] = {};
      }
      avalesPorFacultad[facultad][departamento] = data[departamento];
    });

    Object.keys(avalesPorFacultad).forEach((facultad) => {
      let sumaTotal = 0;
      Object.values(avalesPorFacultad[facultad]).forEach((cantidad) => {
        sumaTotal += cantidad;
      });

      if (!avalesPorFacultad[facultad].total) {
        avalesPorFacultad[facultad].total = 0;
      }
      avalesPorFacultad[facultad].total = sumaTotal;
    });
  } catch (error) {
    console.error('Error al cargar los datos del endpoint:', error);
  }
}

/////////////////////// Funciónes
function mostrarAvales() {
  if (departamentoSeleccionado.value) {
    cargarDatos();
  } else {
    reportData.rows = [];
  }
}
function cargarDatos1() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false; // Finaliza la simulación de carga después de 2 segundos
  }, 2000);
}
function obtenerFacultadPorDepartamento(departamento: string): string | '' {
  for (const [facultad, departamentos] of Object.entries(
    departamentosPorFacultad
  )) {
    if (departamentos.includes(departamento)) {
      return facultad;
    }
  }

  return '';
}

///watchers////////////////////////////////////////////////
watch(departamentoSeleccionado, async (nuevoValor, antiguoValor) => {
  if (nuevoValor !== antiguoValor) {
    await mostrarAvales();
  }
});

watch(dialogDepartamentosVisible, async (nuevoValor, antiguoValor) => {
  if (nuevoValor && !antiguoValor) {
    Object.keys(avalesPorFacultad).forEach((facultad) => {
      avalesPorFacultad[facultad].total = 0;
    });

    await procesarAvalessPorDepartamento();
  }
});
</script>
