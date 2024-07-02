<template>
  <q-page>

      <div class="column justify-center items-center q-pa-md">
        <div>
          <img
            src="/src/assets/logo-bg.png"
            alt="Descripción de la imagen"
            class="centered-image"
            width="400"
          />
        </div>
        <div class="text-bold text-h5">
          Django 4.2.7
          Quasar 2.4.1
          Python 3.11
        </div>
        <div class="text-bold text-h5">Versión: 1.1</div>
      </div>
  
  </q-page>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ajusta la altura del contenedor al 100% de la altura de la ventana */
}

.centered-image {
  max-width: 100%; /* Asegura que la imagen no exceda el ancho del contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
}
</style>
