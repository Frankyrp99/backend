<template>
  <div class="q-pa-lg">
    <q-table
      title="Revistas"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="search"
      pidap
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
            <q-btn color="secondary" icon="visibility" size="sm" />
            <q-btn color="primary" icon="edit" size="sm" />
            <q-btn color="negative" icon="delete" size="sm" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const search = ref('');
const rows = ref([]);
const columns = [
  {
    name: 'nombre_revista',
    required: true,
    label: 'Nombre de la Revista',
    align: 'left',
    field: 'nombre_revista',
    filter: true,
    sortable: true,
  },

  {
    name: 'nombre_articulo',
    label: 'Nombre del Articulo',
    field: 'nombre_articulo',
    sortable: true,
    filter: true,
  },
  {
    name: 'formato',
    label: 'Formato ',
    field: 'formato',
    sortable: true,
    filter: true,
  },
  {
    name: ' fecha_publicacion',
    label: ' Fecha de Publicacion',
    field: ' fecha_publicacion',
    sortable: true,
    filter: true,
  },
  {
    name: 'url',
    label: 'Url',
    field: 'url',
    sortable: true,
    filter: true,
  },
  {
    name: 'autor',
    label: 'Autor',
    field: 'autor',
    sortable: true,
    filter: true,
  },
  {
    name: 'coautores',
    label: 'Coautores',
    field: 'coautores',
    sortable: true,
    filter: true,
  },
];
onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/profesores/');
    rows.value = response.data;
  } catch (error) {
    console.error('Error al obtener los datos de los profesores:', error);
  }
});

// Métodos para manejar las acciones de los botones
//const deleteRow = (row) => {
// Lógica para eliminar la fila
//};

//const updateRow = (row) => {
// Lógica para actualizar la fila
//};

//const showRow = (row) => {
// Lógica para mostrar la fila
</script>
