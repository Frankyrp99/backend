<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Estamos teniendo problemas con el servidor
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
onMounted(async () => {
  try {
    const response = await api.get('/api/reporte-total-avaless-por-fecha/');
    datos.value = response.data; // Asigna los datos recibidos
    console.log('Datos cargados:', datos.value);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
});
