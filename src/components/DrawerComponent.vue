<template>
  <div>
    <q-item to="home" clickable v-close-popup>
      <q-item-section>
        <q-item-label class="text-bold">Home</q-item-label>
      </q-item-section>
    </q-item>
    <q-expansion-item
      v-for="category in categories"
      :key="category.title"
      :label="category.title"
      class="text-bold"
    >
      <q-list>
        <q-item
          v-for="item in category.items"
          :key="item.label"
          :to="item.route"
          clickable
          v-close-popup
          class="text-bold"
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
interface NavigationItem {
  label: string;
  route: string;
}

interface Category {
  title: string;
  items: NavigationItem[];
}

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
      { label: 'Avales por Profesor', route: '/Report_Autor' },
    ],
  },
];
</script>
