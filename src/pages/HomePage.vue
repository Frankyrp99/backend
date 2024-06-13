<template>
  <q-page>
    <div class="container">
      <img
        src="/src/assets/logo.png"
        alt="Descripción de la imagen"
        class="centered-image"
        width="400"
      />
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
