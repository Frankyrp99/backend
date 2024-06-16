<template>
  <div>
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
      { label: 'Crear Aval de Publicación', route: '/crear_aval_public'  },
      { label: 'Listar Avales de Publicación', route: '/lista_avales_public' },
    ],
  },
  {
    title: 'Avales de Tutorias',
    items: [
      { label: 'Crear Aval de Tutoria', route: '/crear_aval_tuto' },
      { label: 'Listar Avales de Tutorias', route: '/lista_avales_tuto' },
    ],
  },
  {
    title: 'Avales de Bibliografias',
    items: [
      {
        label: 'Crear Aval de Bibliografía',
        route: '/crear_aval_biblio',
      },
      {
        label: 'Listar Avales de Bibliografias',
        route: '/lista_avales_biblio',
      },
    ],
  },
  {
    title: 'Reportes',
    items: [
      {
        label: 'Artículos por Departamento',
        route: '/Report_depart',
      },
      { label: 'Artículos por Año', route: '/Report_fecha' },
      { label: 'Artículos por Profesor', route: '/reportes_por_profesor' },
    ],
  },
];

</script>
