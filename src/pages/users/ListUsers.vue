<template>
  <div class="q-pa-lg">
    <q-table
      title="Lista de Usuarios"
      :rows="users"
      :columns="columns"
      row-key="id"
      :filter="search"
    >
      <template v-slot:top-right>
        <q-btn icon="dehaze" size="md" flat dense to="detalles" />
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
              @click="showUserDetails(props.row)"
            />
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
              @click="deleteUser(props.row)"
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
          <q-input autogrow v-model="editForm.username" label="Username" />
          <q-input autogrow v-model="editForm.email" label="Email" />
          <!-- Add more fields as necessary -->
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
const users = ref([]);
const router = useRouter();

const columns = [
  { name: 'username', label: 'Username', field: 'username', sortable: true, filter: true },
  { name: 'email', label: 'Email', field: 'email', sortable: true, filter: true },
  // Agrega más columnas según sea necesario
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

    const response = await axios.get('http://127.0.0.1:8000/api/users', config);
    console.log('Usuarios recuperados:', response.data);
    users.value = response.data; // Asumiendo que la respuesta directa es el array de usuarios
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const editDialogOpen = ref(false);
const editForm = reactive({
  username: '',
  email: '',
  role: '',
  // Agrega más campos según sea necesario
});

const editUser = (user) => {
  editForm.username = user.username;
  editForm.email = user.email;
  editForm.role = user.role;
  editForm.id = user.id; // Asegúrate de guardar el ID del usuario para usarlo en saveEditUser

  editDialogOpen.value = true;
};

const saveEditUser = async () => {
  try {
    await axios.put(`http://127.0.0.1:8000/api/users/${editForm.id}/`, editForm);
    const index = users.value.findIndex(user => user.id === editForm.id);
    if (index!== -1) {
      Object.assign(users.value[index], editForm);
    }
    console.log('Usuario actualizado con éxito');
    editDialogOpen.value = false;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const deleteUser = async (user) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/users/${user.id}/`);
    console.log('Usuario eliminado con éxito');
    users.value = users.value.filter(u => u.id!== user.id);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const showUserDetails = (user) => {
  console.log('Detalles del usuario:', user);
  router.push({ name: 'user-details', params: { id: user.id } });
};
</script>

