<template>
  <div>
    <q-expansion-item
      v-for="category in categories"
      :key="category.title"
      :label="category.title"
    >
      <q-list>
        <q-item
          v-for="item in category.items"
          :key="item.label"
          :to="item.route"
          clickable
          v-close-popup
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
      { label: 'Listar Avales de Publicación', route: '/lista_avales' },
    ],
  },
  {
    title: 'Avales de Tutorias',
    items: [
      { label: 'Crear Aval de Tutoria', route: '/crear_aval_tutoria' },
      { label: 'Listar Avales de Tutoria', route: '/lista_avales_tutoria' },
    ],
  },
  {
    title: 'Avales de Bibliografía',
    items: [
      {
        label: 'Crear Aval de Bibliografía',
        route: '/crear_aval_bibliografia',
      },
      {
        label: 'Listar Avales de Bibliografía',
        route: '/lista_avales_bibliografia',
      },
    ],
  },
  {
    title: 'Reportes',
    items: [
      {
        label: 'Artículos por Departamento',
        route: '/reportes_por_departamento',
      },
      { label: 'Artículos por Año', route: '/reportes_por_anio' },
      { label: 'Artículos por Profesor', route: '/reportes_por_profesor' },
    ],
  },
];
</script>
