<template>
  <q-layout view="hHh LpR lfr" class="bg-color">
    <q-header elevated>
      <q-toolbar class="bg-color">
        <q-btn
          dense
          flat
          round
          icon="menu"
          class="text-black"
          @click="toggleLeftDrawer"
        />
        <q-avatar size="50px">
          <img src="src/assets/logotoolbar.png" />
        </q-avatar>

        <q-toolbar-title class="text-black text-gliker">SIGAV</q-toolbar-title>

        <q-btn-group flat dense class="row justify-end">
          <q-btn-dropdown
            icon="account_circle"
            text-color="black"
            align="between"
          >
            <q-list>
              <q-item v-if="user.isAdmin" to="/Usuarios" clickable v-close-popup>
                <q-item-section>
                  <q-item-label icon="account_circle" class="text-bold"
                    >Administracion</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item to="/user" clickable v-close-popup>
                <q-item-section>
                  <q-item-label icon="account_circle" class="text-bold"
                    >Usuario</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label class="text-bold">Cerrar Sesión</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/acerca_de" clickable v-close-popup>
                <q-item-section>
                  <q-item-label class="text-bold">Acerca De</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
      class="text-black "
    >
      <drawer-component />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import DrawerComponent from 'src/components/DrawerComponent.vue';
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';

import { useRouter } from 'vue-router';

const user = ref({ role: 'invitado', isAdmin: false, isViewerOnly: false });
const router = useRouter();
const leftDrawerOpen = ref(false);

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
      user.value.isViewerOnly = response.data.role === 'invitado';
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

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/');
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

onMounted(fetchUserData);
</script>
