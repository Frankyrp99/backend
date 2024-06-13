<template>
  <q-page class="row items-center justify-evenly">
    <div
      class="column items-center justify-around"
      style="margin-top: 20px; margin-bottom: 20px"
    >
      <div class="my-card q-pa-md items-start">
        <div class="row items-center justify-between">
          <div class="row items-center">
            <div>
              <q-avatar size="120px">
                <img src="src/assets/logo.png" />
              </q-avatar>
            </div>
            <div>
              <q-avatar size="200px">
                <img src="src/assets/logodgic.png" />
              </q-avatar>
            </div>
          </div>

          <div class="text-bold text-h4">Aval de Publicación</div>
        </div>
        <div class="text-bold datos-recurso text-h6">
          MsC. Adrian Eduardo Cancino Gutiérrez,Director de la Dirección de
          Gestión de Información Científica de la Universidad de Camagüey
          "Ignacio Agramonte Loynaz"
        </div>
        <div class="text-bold datos-recurso text-h6">Hago constar que:</div>
        <div class="text-bold datos-recurso text-h5">Datos del Aval:</div>
        <q-list v-if="response">
          <div class="row datos-recurso" style="align-items: normal">
            <div class="col-6 text-bold datos-recurso">Nombre</div>
            <div class="col-6 datos-recurso">{{ response.nombre }}</div>
            <div class="col-6 text-bold datos-recurso">Apellidos</div>
            <div class="col-6 datos-recurso">{{ response.apellidos }}</div>
            <div class="col-6 text-bold datos-recurso">Titulo del Recurso</div>
            <div class="col-6 datos-recurso">{{ response.titulo_recurso }}</div>
            <div class="col-6 text-bold datos-recurso">Departamento</div>
            <div class="col-6 datos-recurso">{{ response.departamento }}</div>

            <div class="col-6 text-bold datos-recurso">
              Lugar donde se Publicó
            </div>
            <div class="col-6 datos-recurso">{{ response.lugar_pub }}</div>
            <div class="col-6 text-bold datos-recurso">Tipo de Recurso</div>
            <div class="col-6 datos-recurso">{{ response.tipo_recurso }}</div>
            <div class="col-6 text-bold datos-recurso">Tipo de Publicación</div>
            <div class="col-6 datos-recurso">
              {{ response.tipo_publicacion }}
            </div>
            <div class="col-6 text-bold datos-recurso">URL</div>
            <div class="col-6 datos-recurso">{{ response.url }}</div> <div class="col-6 text-bold datos-recurso">Tomo</div>
            <div class="col-6 datos-recurso">{{ response.tomo }}</div>
            <div class="col-6 text-bold datos-recurso">Folio</div>
            <div class="col-6 datos-recurso">{{ response.folio }}</div>
            <div class="col-6 text-bold datos-recurso">Fecha</div>
            <div class="col-6 datos-recurso">{{ response.fecha }}</div>
          </div>
        </q-list>
        <div class="row items-center justify-between">
          <div class="text-bold datos-recurso text-h6">
            MsC. Adrian Eduardo Cancino Gutiérrez:
          </div>
          <div class="text-bold datos-recurso text-h6">______________</div>
        </div>
        <div class="text-bold datos-recurso text-h6">
          Dirección de Gestión de Información Científica. Universidad de
          Camagüey "Ignacio Agramonte Loynaz". Circunvalación Norte Km 5 1/2
          CP74650,Camagüey,Cuba. Telefono:(53)(322)-262332. E-mail:
          cgi@reduc.edu.cu
        </div>
      </div>
      <q-btn
        flat
        rounded
        label="Exportar a PDF"
        @click="exportToPDF"
        class="btn-export mt-4"
        style="margin-top: 20px; margin-bottom: 20px"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResponseItem {
  apellidos?: string;
  departamento?: string;
  fecha?: string;
  folio?: string;
  id?: number;
  nombre?: string;
  titulo_recurso?: string;
  tomo?: string;
  lugar_pub?: string;
  tipo_recurso?: string;
  tipo_publicacion?: string;
  url?: string;
}

const route = useRoute();
const id = route.params.id;

const response = ref<ResponseItem>({});
const $q = useQuasar();
const fetchData = async () => {
  try {
    const result = await api.get<ResponseItem>(
      `/api/profesores/${id}/`
    );
    response.value = result.data;
  } catch (error) {
    console.error('Error al obtener los detalles:', error);
  }
};

onMounted(fetchData);

const exportToPDF = () => {
  const pdf = new jsPDF();
  const element = document.querySelector('.my-card');
  if (!element) {
    console.error('No se encontró el elemento.my-card');
    return;
  }
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${response.value.titulo_recurso}.pdf`);
});
$q.notify({
    type: 'positive',
    message: '¡Aval Exportado Correctamente!',
    position: 'top-right',
  });
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 800px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.datos-recurso {
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 90%;
  margin: auto;
  margin-top: 20px;
}
</style>
