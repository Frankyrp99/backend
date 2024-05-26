<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card bg-color">
      <q-card-section>
        <div class="text-h6">{{ response.titulo_recurso }}</div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Nombre</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.nombre }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Apellidos</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.apellidos }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Titulo del Recurso</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.titulo_recurso }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Lugar donde se Publicó</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.lugar_pub }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Tipo de Recurso</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.tipo_recurso }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Tipo de Publicación</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.tipo_publicacion }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>URL</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.url }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Tomo</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.tomo }}
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Folio</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ response.folio }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
       <q-card-section>
        <q-btn flat rounded label="Exportar a PDF" @click="exportToPDF" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const route = useRoute();
const id = route.params.id; // Asegúrate de que 'id' no sea undefined

// Crea una variable reactiva para almacenar los datos de la respuesta
const response = ref({});

const fetchData = async () => {
 try {
    const result = await axios.get(
      `http://127.0.0.1:8000/api/profesores/${id}/`
    );
    // Asigna los datos de la respuesta a la variable reactiva
    response.value = result.data;
 } catch (error) {
    console.error('Error al obtener los detalles:', error);
 }
};

onMounted(fetchData);

const exportToPDF = () => {
 const pdf = new jsPDF();
 const element = document.querySelector('.my-card'); // Asegúrate de que este selector coincida con el elemento que deseas capturar
 html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${response.value.titulo_recurso}.pdf`);
 });
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
