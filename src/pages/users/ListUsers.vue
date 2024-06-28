<template>
  <div class="q-pa-lg">
    <q-table
      title="Lista de Usuarios"
      title-class="text-bold"
      :rows="users"
      :columns="columns"
      row-key="nombre"
      :filter="search"
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
            <q-btn color="primary" icon="visibility" size="sm" flat dense />
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
          <q-input autogrow v-model="editForm.nombre" label="Nombre" />
          <q-input autogrow v-model="editForm.apellidos" label="apellidos" />
          <q-input autogrow v-model="editForm.email" label="Email" />
          <q-input autogrow v-model="editForm.role" label="Rol" />
          <q-input
            type="password"
            autogrow
            v-model="editForm.password"
            label="Contraseña"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat rounded label="Cancelar" v-close-popup />
          <q-btn
            flat
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
import axios from 'axios';

const search = ref('');
const users = ref<UsersType[]>([]);
const router = useRouter();
console.log('das', users);
type UsersType = {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  role: string;
  password: string;
  format?: (value: string) => string;
};
const columns = [
  {
    name: 'nombre',
    label: 'Nombre',
    field: 'nombre',
    sortable: true,
    filter: true,
    align: 'left',
  },
  {
    name: 'apellidos',
    label: 'Apellidos',
    field: 'apellidos',
    sortable: true,
    filter: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    sortable: true,
    filter: true,
  },
  {
    name: 'role',
    label: 'Rol',
    field: 'role',
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

    const response = await axios.get(
      'http://127.0.0.1:8000/api/users/list',
      config
    );

    users.value = response.data.results;
    console.log('Usuarios recuperados:', users.value);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const editDialogOpen = ref(false);
const editForm = reactive({
  id: '',
  nombre: '',
  apellidos: '',
  email: '',
  role: '',
  password: '',

  // Agrega más campos según sea necesario
});

const editUser = (user) => {
  editForm.id = user.id;
  editForm.nombre = user.nombre;
  editForm.apellidos = user.apellidos;
  editForm.email = user.email;
  editForm.role = user.role;
  editForm.password = user.password;

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
    await axios.put(
      `http://127.0.0.1:8000/api/users/${editForm.id}/`,
      editForm,
      config
    );
    const index = users.value.findIndex((user) => user.id === editForm.id);
    if (index !== -1) {
      Object.assign(users.value[index], editForm);
    }
    console.log('Usuario actualizado con éxito');
    editDialogOpen.value = false;
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

const deleteUser = async (user) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/users/${user.id}/`);
    console.log('Usuario eliminado con éxito');
    users.value = users.value.filter((u) => u.id !== user.id);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const showUserDetails = (user) => {
  console.log('Detalles del usuario:', user);
  router.push({ name: 'user-details', params: { id: user.id } });
};
</script>
