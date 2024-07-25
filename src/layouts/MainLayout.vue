<template>
  <q-layout view="hHh LpR f">
    <q-header elevated>
      <q-toolbar class="text-color">
        <q-btn
          dense
          flat
          round
          icon="menu"
          color="white"
          class="fondo-transparente"
          @click="toggleLeftDrawer"
        />
        <q-avatar size="50px">
          <img src="src/assets/logotoolbar.png" />
        </q-avatar>

        <q-toolbar-title class="text-white text-gliker">SIGAV</q-toolbar-title>

        <q-btn
          dense
          flat
          round
          size="20px"
          icon="account_circle"
          color="white"
          class="fondo-transparente"
        >
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 text-bold q-mb-md">{{ usuario.email }}</div>
                <div>
                  <q-separator inset class="q-mx-lg" />
                  <q-list>
                    <q-item
                      v-if="user.isAdmin"
                      to="/Usuarios"
                      clickable
                      v-close-popup
                    >
                      <q-item-section>
                        <q-item-label icon="account_circle" class="text-bold"
                          >Administración de Usuarios</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item to="/acerca_de" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label class="text-bold">Acerca De SIGAV</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <q-icon name="account_circle" size="72px" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ formattedRole }}
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  @click="logout"
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
      class="text-black"
    >
      <drawer-component />
      <q-footer class="row justify-center text-bold"> Versión 1.0 </q-footer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import DrawerComponent from 'src/components/DrawerComponent.vue';
import { ref, onMounted, computed } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const user = ref({ role: 'invitado', isAdmin: false, isViewerOnly: false });
const router = useRouter();
const leftDrawerOpen = ref(false);
interface UserData {
  email: string;
  role: string;
}

const usuario = ref<UserData>({
  email: '',
  role: '',
});

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
    usuario.value = response.data;
    // Verificar si la petición fue exitosa
    if (response.status === 200) {
      user.value.role = response.data.role;
      user.value.isAdmin = response.data.role === 'admin';
      user.value.isViewerOnly = response.data.role === 'invitado';
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

const formattedRole = computed(() => {
  switch (usuario.value.role.toLowerCase()) {
    case 'admin':
      return 'Admin';
    case 'especialista':
      return 'Especialista';
    case 'invitado':
      return 'Invitado';
    default:
      return 'Usuario';
  }
});

onMounted(fetchUserData);
</script>
