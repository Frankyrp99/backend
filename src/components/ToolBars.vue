<template>
  <q-header elevated class="bg-color">
    <q-toolbar class="q-pa-sm q-gutter-sm row justify-end">
      <q-btn-group flat dense class="row justify-end" >
        <q-btn-dropdown color="bg-color" icon="add" text-color="black" >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Profesor</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Aval de Publicación</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Aval de Tutorias</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Aval de Bibliografia</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown color="bg-color" icon="person" text-color="black" align="between">
          <q-list>
            <q-item
              icon="person"
              to="user"
              clickable
              v-close-popup
              @click="onItemClick"
            >
              <q-item-section>
                <q-item-label>Usuario</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="login" clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>
    </q-toolbar>
  </q-header>
</template>
<script></script>
