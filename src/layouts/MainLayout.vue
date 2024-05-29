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
        <q-avatar>
          <img src="src/assets/logo.png" />
        </q-avatar>

        <q-toolbar-title class="text-black text-bold">SIGAV</q-toolbar-title>

        <q-btn-group flat dense class="row justify-end">
          <q-btn-dropdown
            color="bg-color"
            icon="account_circle"
            text-color="black"
            align="between"
          >
            <q-list>
              <q-item to="user" clickable v-close-popup>
                <q-item-section>
                  <q-item-label icon="account_circle">Usuario</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
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
      class="bg-color text-black"
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
import axios from 'axios';
import { useRouter } from 'vue-router';

const user = ref({ role: 'invitado' });
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
    // Realiza la petición a /api/users sin especificar la URL completa
    const response = await axios.get('/api/users', config);
    user.value.role = response.data.role;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
};

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/');
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value =!leftDrawerOpen.value;
};

onMounted(fetchUserData);
</script>
