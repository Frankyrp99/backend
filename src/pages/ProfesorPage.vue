<template>
  <div class="q-pa-lg">
    <q-table
      title="Profesores"
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
            <q-btn
              color="secondary"
              icon="visibility"
              size="sm"

            />
            <q-btn
              color="primary"
              icon="edit"
              size="sm"

            />
            <q-btn
              color="negative"
              icon="delete"
              size="sm"
            
            />
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
    name: 'nombre',
    required: true,
    label: 'Nombre y Apellidos',
    align: 'left',
    filter: true,
    sortable: true,
  },

  { name: 'ci', label: 'Ci', field: 'ci', sortable: true, filter: true },
  {
    name: 'departamento',
    label: 'Nombre del Departamento',
    field: 'departamento',
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
