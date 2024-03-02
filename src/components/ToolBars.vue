<template>
  <q-header elevated class="bg-color">
    <q-toolbar class="q-pa-sm q-gutter-sm row justify-end">
      <q-btn-group flat dense class="row justify-end" >
        <q-btn   icon="space_dashboard " class="text-black q-gutter-sm" to="/" />
        <q-btn-dropdown color="bg-color" icon="add_circle_outline " text-color="black"  >
          <q-list>


            <q-item to="recursos" clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label >Aval de Publicación</q-item-label>
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
        <q-btn-dropdown color="bg-color" icon="account_circle" text-color="black" align="between">
          <q-list>
            <q-item

              to="user"
              clickable
              v-close-popup
              @click="onItemClick"
            >
              <q-item-section>
                <q-item-label icon="account_circle">Usuario</q-item-label>
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
