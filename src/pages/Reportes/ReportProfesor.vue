<template>
  <div class="q-pa-lg">
    <q-table
      title="Lista de Autores"
      title-class="text-bold text-color"
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
      rows-per-page-label="Profesor por Página"
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
              @click="showRow(props.row)"
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
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(true);
const search = ref('');
type AutorType = {
  id:number;
  nombre: string;
  apellidos: string;
  departamento: string;
};
const Autor = ref<AutorType[]>([]);

const columnas = ref([
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    filter: true,
    sortable: true,
  },
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
    const authToken = localStorage.getItem('authToken'); // Asume que tienes un authToken almacenado
    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await api.get('/api/autores/',config);
    Autor.value = response.data.results;;
    console.log('Formulario enviado con éxito:', response.data.results);
  } catch (error) {
    console.error('Error al obtener los datos de los profesores:', error);
  }
  isLoading.value = false;
});

const showRow = (row: any) => {
  router.push({
    name: 'AvalesProfesor',
    params: {
      id: row.id,
      nombre: row.nombre,
      apellidos: row.apellidos,

    },

  });
  console.log(row)
};


</script>
