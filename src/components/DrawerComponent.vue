<template>
  <div>
    <q-item to="/home" clickable v-close-popup >
      <q-item-section>
        <q-item-label class="text-weight-bolder">Inicio</q-item-label>
      </q-item-section>
    </q-item>
    <q-expansion-item
      v-for="category in categorizedItems"
      :key="category.title"
      :label="category.title"
      expand-separator
      :content-inset-level="0.5"
      class="text-weight-bolder"
    >
      <q-list style="padding-bottom: 12px;">
        <q-item
          v-for="item in category.items"
          :key="item.label"
          :to="item.route"
          clickable
          v-close-popup
          class="text-weight-bolder"
        >
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { api } from 'src/boot/axios';

const user = ref({ role: 'invitado', isAdmin: false, isViewerOnly: false });
interface NavigationItem {
  label: string;
  route: string;
}

interface Category {
  title: string;
  items: NavigationItem[];
}

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
const categories: Category[] = [
  {
    title: 'Avales de Publicación',
    items: [
      { label: 'Crear Aval de Publicación', route: '/crear_aval_public' },
      { label: 'Listar Avales de Publicación', route: '/lista_avales_public' },
    ],
  },
  {
    title: 'Avales de Tutorías',
    items: [
      { label: 'Crear Aval de Tutoría', route: '/crear_aval_tuto' },
      { label: 'Listar Avales de Tutorías', route: '/lista_avales_tuto' },
    ],
  },
  {
    title: 'Avales de Bibliografías',
    items: [
      {
        label: 'Crear Aval de Bibliografía',
        route: '/crear_aval_biblio',
      },
      {
        label: 'Listar Avales de Bibliografías',
        route: '/lista_avales_biblio',
      },
    ],
  },
  {
    title: 'Reportes',
    items: [
      {
        label: 'Avales por Departamento',
        route: '/Report_depart',
      },
      { label: 'Avales por Año', route: '/Report_fecha' },
      { label: 'Avales por Autor', route: '/Report_Autor' },
    ],
  },
];
const filteredItems = (categoryItems) => {
  if (user.value.role === 'invitado') {
    // Filtra los ítems excluyendo aquellos relacionados con "Crear Aval"
    return categoryItems.filter((item) => !item.label.includes('Crear Aval'));
  }
  // Devuelve todos los ítems si el usuario no es un invitado
  return categoryItems;
};

// Aplica la función de filtrado a cada categoría
const categorizedItems = computed(() => {
  return categories.map((category) => ({
    ...category,
    items: filteredItems(category.items), // Ahora 'category.items' coincide con el parámetro esperado por filteredItems
  }));
});
onMounted(fetchUserData);
</script>
