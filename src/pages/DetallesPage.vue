<template>
  <div class="q-pa-lg">
    <q-table
      title="Avales de Publicación"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="search"
      pidap
    >
      <template v-slot:top-right>
        <q-btn
          icon="dehaze "
          size="md"
          flat
          dense
          @click="onItemClick"
          to="lista_avales"
        />
        <q-input dense outlined v-model="search" placeholder="Buscar" />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>

          <q-td auto-width>
            <q-btn
              icon="visibility"
              size="sm"
              flat
              dense
              @click="showRow(props.row)"
            />
            <q-btn
              icon="edit"
              size="sm"
              flat
              dense
              @click="editRow(props.row)"
            />
            <q-btn
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="deleteRow(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="editDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Recurso</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="editForm.nombre" label="Nombre" />
          <q-input v-model="editForm.apellidos" label="Apellidos" />
          <q-input
            v-model="editForm.titulo_recurso"
            label="Titulo del Recurso"
          />
          <q-input
            v-model="editForm.departamento"
            label="Departamento de Trabajo"
          />
          <q-input v-model="editForm.lugar_pub" label="Lugar de Publicacion" />
          <q-input v-model="editForm.tomo" label="Tomo" />
          <q-input v-model="editForm.folio" label="Folio" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat rounded label="Cancelar" v-close-popup />
          <q-btn
            flat
            rounded
            color="primary"
            label="Guardar"
            @click="saveEdit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const search = ref('');
const rows = ref([]);
const router = useRouter();
const columns = [
  {
    name: 'nombre',
    required: true,
    label: 'Nombre ',
    align: 'left',
    filter: true,
    sortable: true,
    field: 'nombre',
  },
  {
    name: 'apellidos',
    required: true,
    label: ' Apellidos',
    field: 'apellidos',
    filter: true,
    sortable: true,
  },

  {
    name: 'titulo_recurso',
    label: 'Titulo del Recurso',
    field: 'titulo_recurso',
    sortable: true,
    filter: true,
  },
  {
    name: 'departamento',
    label: 'Departamento de Trabajo',
    field: 'departamento',
    sortable: true,
    filter: true,
  },
  {
    name: 'lugar_pub',
    label: 'Lugar de Publicacion',
    field: 'lugar_pub',
    sortable: true,
    filter: true,
  },
  {
    name: 'fecha_publicacion',
    label: 'Fecha de Publicacion',
    field: 'fecha',
    sortable: true,
    filter: true,
  },
  {
    name: 'tomo',
    label: 'Tomo',
    field: 'tomo',
    sortable: true,
    filter: true,
  },
  {
    name: 'folio',
    label: 'Folio',
    field: 'folio',
    sortable: true,
    filter: true,
  },
];
onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/profesores/');
    console.log('Formulario enviado con éxito:', response.data.results);
    rows.value = response.data.results;
  } catch (error) {
    console.error('Error al obtener los datos de los profesores:', error);
  }
});
const editDialogOpen = ref(false);
const editForm = ref({
  nombre: '',
  apellidos: '',
  titulo_recurso: '',
  departamento: '',
  lugar_pub: '',
  tomo: '',
  folio: '',
});
const selectedRow = ref(null);
const editRow = (row: null) => {
  selectedRow.value = row;
  editForm.value = { ...row };
  editDialogOpen.value = true;
};
const saveEdit = async () => {
  try {
    await axios.put(
      `http://127.0.0.1:8000/api/profesores/${selectedRow.value.id}/`,
      editForm.value
    );
    console.log('Recurso actualizado con éxito');

    editDialogOpen.value = false;
  } catch (error) {
    console.error('Error al actualizar el recurso:', error);
  }
};
const showRow = (row: null) => {
  console.log('Mostrando detalles del recurso:', row);
  router.push({ name: 'show', params: { id: row.id } });
};
// boton eliminar
const deleteRow = async (row: { id: null }) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/profesores/${row.id}/`);
    console.log('Recurso eliminado con éxito');

    rows.value = rows.value.filter((item) => item.id !== row.id);
  } catch (error) {
    console.error('Error al eliminar el recurso:', error);
  }
};
</script>
