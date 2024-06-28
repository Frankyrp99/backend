<template>
  <div class="q-pa-lg">
    <q-table
      title="Avales de Tutorías"
      title-class="text-bold"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="search"
      dense
      no-data-label="No hay datos disponibles."
      no-results-label="No se encontraron resultados para tu búsqueda."
      :loading="isLoading"
      loading-label="Cargando..."

    >
      <template v-slot:top-right>
        <q-btn label="Menos Detalles" color="primary" size="md" flat dense to="/lista_avales_tuto" />
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
            <q-btn
              v-if="user.isViewerOnly || user.isAdmin"
              color="positive"
              icon="edit"
              size="sm"
              flat
              dense
              @click="editRow(props.row)"
            />
            <q-btn
              v-if="user.isViewerOnly || user.isAdmin"
              color="negative"
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
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Editar Recurso</div>
        </q-card-section>

        <q-card-section>
          <q-input autogrow v-model="editForm.nombre" label="Nombre" />
          <q-input autogrow v-model="editForm.apellidos" label="Apellidos" />
          <q-input
            autogrow
            v-model="editForm.titulo_recurso"
            label="Titulo del Recurso"
          />
          <q-input
            v-model="editForm.departamento"
            label="Departamento"
            class="form-item"
            @click="showSelectorDepartamento = true"
          />
          <q-dialog v-model="showSelectorDepartamento" persistent>
            <SelectorDepartamento
              v-model="editForm.departamento"
              :open-first-dialog-automatically="true"
              @close-first-dialog="closeFirstDialogAndUpdateModel"
            />
          </q-dialog>

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
import { ref, onMounted, reactive, watch, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import SelectorDepartamento from 'src/components/SelectorDepartamento.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const user = ref({ role: 'invitado', isAdmin: false, isViewerOnly: false });
const search = ref('');
const rows = ref<RowType[]>([]);
const selectedRow = ref<RowType | null>(null);
const router = useRouter();
const showSelectorDepartamento = ref(false);
const closeFirstDialogAndUpdateModel = () => {
  showSelectorDepartamento.value = false;
};
const isLoading = ref(false);
type RowType = {
  id: number;
  nombre: string;
  apellidos: string;
  titulo_recurso: string;
  departamento: string;
  lugar_pub: string;
  tomo: string;
  folio: string;
  fecha: string;
};
const columns = [
  {
    name: 'nombre',
    required: true,
    label: 'Nombre ',
    align: 'left',
    field: 'nombre',
    filter: true,
    sortable: true,
    classes: 'texto-truncado',
  },
  {
    name: 'apellidos',
    required: true,
    label: ' Apellidos',
    field: 'apellidos',
    filter: true,
    sortable: true,
    classes: 'texto-truncado',
  },

  {
    name: 'titulo_recurso',
    label: 'Titulo del Recurso',
    field: 'titulo_recurso',
    sortable: true,
    filter: true,
    classes: 'texto-truncado',
  },
  {
    name: 'departamento',
    label: 'Departamento de Trabajo',
    field: 'departamento',
    sortable: true,
    filter: true,
  },
  {
    name: 'fecha',
    label: 'Fecha de Publicación',
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

const fetchUserData = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.get('/api/users', config);

    // Verificar si la petición fue exitosa
    if (response.status === 200) {
      user.value.role = response.data.role;
      user.value.isAdmin = response.data.role === 'admin';
      user.value.isViewerOnly = response.data.role === 'especialista';
      console.log('Datos del usuario obtenidos correctamente.');
    } else {
      console.error(
        `Error al obtener los datos del usuario: Estado ${response.status}`
      );
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
};
onMounted(async () => {
  try {
    const response = await api.get('/api/avales_tuto/');
    console.log('Formulario enviado con éxito:', response.data.results);
    rows.value = response.data.results;
  } catch (error) {
    console.error('Error al obtener los datos de los profesores:', error);
  }
  cargarDatos()
  fetchUserData();
});
const editDialogOpen = ref(false);
interface Form {
  nombre: string;
  apellidos: string;
  titulo_recurso: string;
  departamento: string;
  lugar_pub: string;
  tomo: string;
  folio: string;
  fecha: string;
}

const editForm = reactive<Form>({
  nombre: '',
  apellidos: '',
  titulo_recurso: '',
  departamento: '',
  lugar_pub: '',
  tomo: '',
  folio: '',
  fecha: '',
});
const { nombre, apellidos } = toRefs(editForm);
//metodos
function capitalizeWords(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
function cargarDatos() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false; // Finaliza la simulación de carga después de 2 segundos
  }, 2000);
}
//watchers
watch(
  nombre,
  (newValue) => {
    editForm.nombre = capitalizeWords(newValue);
  },
  { deep: true }
);

watch(
  apellidos,
  (newValue) => {
    editForm.apellidos = capitalizeWords(newValue);
  },
  { deep: true }
);

//boton editar
const editRow = (row: RowType) => {
  selectedRow.value = row;
  editForm.nombre = row.nombre;
  editForm.apellidos = row.apellidos;
  editForm.titulo_recurso = row.titulo_recurso;
  editForm.departamento = row.departamento;
  editForm.lugar_pub = row.lugar_pub;
  editForm.tomo = row.tomo;
  editForm.folio = row.folio;
  editForm.fecha = row.fecha;
  editDialogOpen.value = true;
};

const saveEdit = async () => {
  try {
    await api.put(
      `/api/avales_tuto/${selectedRow.value.id}/`,
      editForm
    );

    const index = rows.value.findIndex(
      (row) => row.id === selectedRow.value.id
    );
    if (index !== -1) {
      Object.assign(rows.value[index], editForm);
    }

    console.log('Recurso actualizado con éxito');

    editDialogOpen.value = false;
  } catch (error) {
    console.error('Error al actualizar el recurso:', error);
  }
  $q.notify({
    type: 'positive',
    message: '¡Aval Actualizado Correctamente!',
    position: 'top-right',
  });
};

//boton mostrar
const showRow = (row: null) => {
  console.log('Mostrando detalles del recurso:', row);
  router.push({ name: 'ShowTuto', params: { id: row.id } });
};
// boton eliminar
const deleteRow = async (row: { id: null }) => {
  try {
    await api.delete(`/api/avales_tuto/${row.id}/`);
    console.log('Recurso eliminado con éxito');

    rows.value = rows.value.filter((item) => item.id !== row.id);
  } catch (error) {
    console.error('Error al eliminar el recurso:', error);
  }
};
</script>
