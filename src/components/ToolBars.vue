<template>
  <q-header elevated class="bg-color">
  <q-toolbar class="q-pa-sm q-gutter-sm row justify-between">
  <q-btn
    dense
    flat
    round
    icon="menu"
    @click="leftDrawerOpen = !leftDrawerOpen"
    color="black"
  />
  <q-btn-group flat dense class="row justify-end">
    <q-btn
      label="Perfil"
      dense
      flat
      round
      icon="person"
      color="black"
      to="user"
    />
    <q-btn
      label="Logout"
      dense
      flat
      round
      icon="logout"
      color="black"
      to="login"
    />
  </q-btn-group>
</q-toolbar>

  </q-header>
  <q-drawer
    class="bg-color"
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    content-class="bg-grey-1"
  >
    <q-list>
      <q-item clickable v-ripple to="/">
        <q-item-section>Home</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="profe">
        <q-item-section>Profesores</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="arti">
        <q-item-section>Revistas</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="libro">
        <q-item-section>Libros</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
<script>
export default {
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>
