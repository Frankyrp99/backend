<template>
  <div class="q-gutter-md row justify-evenly align-center">
    <q-card
      v-for="(datos, fecha) in datos"
      :key="fecha"
      class="row justify-evenly align-center"
    >
      <div style="width: 500px">
        <q-card-section>
          <div class="row justify-between align-center">
          
            <div class="text-bold text-h6">{{ fecha }}</div>
            <div class="text-bold text-h6">Total de Avales: {{ datos.total }}</div>
          </div>
          <q-separator />
          <div autogrow class="text-bold">
            Departamentos:
            <ul>
              <li v-for="(count, departamento) in datos.departamentos" :key="departamento">
                {{ departamento }}: {{ count }}
              </li>
            </ul>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>


<script setup lang="ts">
import {  onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

const datos = ref({});



onMounted(async () => {
  try {
    const response = await api.get('/api/reporte-total-avaless-por-fecha/');
    datos.value = response.data;
    console.log('Datos cargados:', datos.value);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
});


</script>


