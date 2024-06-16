<template>
  <div class="q-pa-lg">
    <q-table
      v-model:selected="selectedAuthor"
      title="Autores"
      title-class="text-bold"
      :rows="Autor"
      :columns="columnas"
      row-key="id"
      :filter="search"
      class="q-mt-md"
      dense
      no-data-label="No hay datos disponibles."
      no-results-label="No se encontraron resultados para tu búsqueda."
      :loading="isLoading"
      loading-label="Cargando..."
    >
      <template v-slot:top-right>
        <q-input dense outlined v-model="search" placeholder="Buscar" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>

          <q-td auto-width>
            <q-btn
              color="primary"
              icon="visibility"
              size="sm"
              flat
              dense
              @click="obtenerAvalProfesor"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';

const isLoading = ref(false);
const search = ref('');
type AutorType = {

  nombre: string;
  apellidos: string;
  departamento: string;
};
const Autor = ref<AutorType[]>([]);
const selectedAuthor = ref<AutorType>();
const columnas = ref([
  {
    name: 'nombre',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: 'nombre',
    filter: true,
    sortable: true,
  },
  {
    name: 'apellidos',
    required: true,
    label: 'Apellidos',
    align: 'left',
    field: 'apellidos',
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
]);

// Propiedad para recibir los datos de los autores

onMounted(async () => {
  try {
    const response = await api.get('/api/autores/');
    Autor.value = response.data;
    console.log('Formulario enviado con éxito:', response.data);
  } catch (error) {
    console.error('Error al obtener los datos de los profesores:', error);
  }
  cargarDatos();
});
function cargarDatos() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
}
async function obtenerAvalProfesor() {
  if (!selectedAuthor.value) return;

  try {
    const response = await api.get(
      `/api/avales-profesor/?nombre=${selectedAuthor.value.nombre}&apellidos=${selectedAuthor.value.apellidos}`
    );

    // Asegúrate de que la respuesta sea tratada como un arreglo
    const avalesData = Array.isArray(response.data)? response.data : [response.data];

    // Verifica si hay datos antes de asignarlos a Autor.value
    if (avalesData.length > 0) {
      Autor.value = avalesData;
      console.log(Autor.value)
    } else {
      console.log('No se encontraron avales para el profesor seleccionado.');
    }
  } catch (error) {
    console.error('Error al obtener los avales del profesor:', error);
  } finally {
    cargarDatos();
  }
}

</script>
