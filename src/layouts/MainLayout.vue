<template>
  <q-layout view="hHh LpR lfr" class="bg-color">
    <q-header elevated class="bg-color">
      <q-toolbar class="bg-color">
        <q-btn dense flat round icon="menu" class="text-black" @click="toggleLeftDrawer" />

        <q-toolbar-title class="bg-color text-black"> Articulos Científicos </q-toolbar-title>

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
      <q-expansion-item label="Avales de Publicación">
        <q-list>
          <q-item to="/crear_aval_public" clickable v-close-popup>
            <q-item-section>
              <q-item-label> Crear Aval de Publicación</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/lista_avales" clickable v-close-popup>
            <q-item-section>
              <q-item-label> Listar Avales de Publicación</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item label="Avales de Tutorias">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label> Crear Aval de Tutoria</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label> Listar Avales de Tutoria</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item label="Avales de Bibliografía">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label> Crear Aval de Bibliografía</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label> Listar Avales de Bibliografía</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item label="Reportes">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label> Articulos por Departamento</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label> Articulos por Año</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script setup lang="ts">
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
    const response = await axios.get(
      'http://127.0.0.1:8000/api/users/',
      config
    );
    user.value.role = response.data.role;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
};

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

onMounted(fetchUserData);
</script>
