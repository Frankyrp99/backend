<template>
  <div class="q-pa-lg">
    <q-table
      title="Lista de Usuarios"
      title-class="text-bold text-color"
      :rows="users"
      :columns="columns"
      row-key="nombre"
      :filter="search"
      dense
      no-data-label="No hay datos disponibles."
      no-results-label="No se encontraron resultados para tu búsqueda."
      :loading="isLoading"
      loading-label="Cargando..."
    >
      <template v-slot:top-right>
        <div class="row q-gutter-md">
          <q-btn
            color="primary"
            icon="add"
            size="md"
            align="left"
            dense
            label="Nuevo Usuario"
            class="text-bold"
            to="/NuevoUsuario"
          />
          <q-input dense outlined v-model="search" placeholder="Buscar" />
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>

          <q-td auto-width>
            <q-btn
              color="positive"
              icon="edit"
              size="sm"
              flat
              dense
              @click="editUser(props.row)"
            />
            <q-btn
              color="negative"
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="eliminar(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- Dialog for editing user details -->
    <q-dialog v-model="editDialogOpen">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">Editar Usuario</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="editForm.role"
            label="Rol"
            class="form-item"
            @click="showNivActDialog = true"
          />
          <q-dialog v-model="showNivActDialog" persistent>
            <selector-rol
              v-model="editForm.role"
              :public-types="['admin', 'especialista', 'invitado']"
              :open-dialog-automatically="showNivActDialog"
              @update:modelValue="editForm.role = $event"
              @dialogClosed="hideNivActDialog"
            />
          </q-dialog>
          <q-input
            type="password"
            autogrow
            v-model="editForm.password"
            label="Nueva Contraseña"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn  rounded label="Cancelar" v-close-popup />
          <q-btn

            rounded
            color="primary"
            label="Guardar"
            @click="saveEditUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import SelectorRol from 'src/components/SelectorRol.vue';

const $q = useQuasar();
const search = ref('');
const users = ref<UsersType[]>([]);
const isLoading = ref(true);
const showNivActDialog = ref(false);
const hideNivActDialog = () => {
  showNivActDialog.value = false;
};

type UsersType = {
  id: string;
  email: string;
  role: string;
  password: string;
  format?: (value: string) => string;
};
const columns = [
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    sortable: true,
    filter: true,
    align: 'left',
  },
  {
    name: 'role',
    label: 'Rol',
    field: 'role',
    align: 'left',

    sortable: true,
    filter: true,
    format: (value: string) => {
      if (value === 'admin') {
        return 'Administrador';
      } else if (value === 'especialista') {
        return 'Especialista';
      } else if (value === 'invitado') {
        return 'Invitado';
      } else {
        return value;
      }
    },
  },
];

onMounted(async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await api.get('/api/users/list', config);

    users.value = response.data.results;
    isLoading.value = false;
    console.log('Usuarios recuperados:');
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const editDialogOpen = ref(false);
const editForm = reactive({
  id: '',

  role: '',
  password: '',

  // Agrega más campos según sea necesario
});

const editUser = (selectedUser: UsersType) => {
  editForm.id = selectedUser.id;
  editForm.role = selectedUser.role;
  editForm.password = selectedUser.password;
  editDialogOpen.value = true;
};

async function saveEditUser() {
  try {
    const authToken = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
    await api.put(`/api/users/${editForm.id}/`, editForm, config);

    const index = users.value.findIndex((user) => user.id === editForm.id);
    if (index !== -1) {
      Object.assign(users.value[index], editForm);
    }
    $q.notify({
      type: 'positive', // Cambiado a positive para indicar éxito
      message: '¡Usuario Actualizado Correctamente!',
      position: 'top-right',
    });
    editDialogOpen.value = false;
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

async function eliminar(user: { id: null }) {
  try {
    const authToken = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
    await $q
      .dialog({
        title: 'Eliminar Usuario',
        message: '¿Estás seguro de eliminar?',
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        api
          .delete(`/api/deleteuser/${user.id}/`, config)
          .then(() => {
            console.log('Recurso eliminado con éxito');
            users.value = users.value.filter((item) => item.id !== user.id);
            $q.notify({
              type: 'positive',
              message: '¡Usuario Eliminado Correctamente!',
              position: 'top-right',
            });
          })
          .catch((error) => {
            console.error('Error al eliminar el recurso:', error);
            $q.notify({
              type: 'negative',
              message: 'Hubo un error al eliminar el Usuario.',
              position: 'top-right',
            });
          });
      });
  } catch (error) {
    console.error('Error al mostrar el diálogo:', error);
  }
}
</script>
