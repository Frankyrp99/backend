<template>
  <q-page>
    <div class="flex justify-center items-center" style="height: 130vh">
      <q-form @submit="onSubmit" class="q-gutter-md" id="form">
        <h4>Aval de Publicación</h4>
        <q-input
          filled
          v-model="form.nombre"
          label="Nombre"
          :rules="nombreRules"
        />
        <q-input
          filled
          v-model="form.apellidos"
          label="Apellidos"
          :rules="apellidosRules"
        />
        <q-input
          filled
          v-model="form.titulo_recurso"
          label="Título del Recurso"
          :rules="titulo_recursoRules"
        />
        <q-input
          filled
          v-model="form.departamento"
          label="Departamento de Trabajo"
          :rules="departamentoRules"
        />
        <q-input
          filled
          v-model="form.lugar_pub"
          label="Lugar de Publicación"
          :rules="lugarpubRules"
        />
        <q-select
          filled
          v-model="form.tipo_recurso"
          :options="tiposRecurso"
          label="Tipo de Recurso"
          :rules="tipo_recursoRules"
        />
        <q-select
          filled
          v-model="form.tipo_publicacion"
          :options="tiposPublicacion"
          label="Tipo de Publicación"
          :rules="tipoPubRules"
        />
        <q-input
          v-if="form.tipo_publicacion === 'revistaImpresa'"
          filled
          v-model="form.issn"
          label="ISSN"
          :rules="issnRules"
        />
        <q-input
          v-if="form.tipo_publicacion === 'revistaDigital'"
          filled
          v-model="form.e_issn"
          label="E-ISSN"
          :rules="eissnRules"
        />
        <q-input
          v-if="
            form.tipo_publicacion === 'libroImpreso' ||
            form.tipo_publicacion === 'libroDigital'
          "
          filled
          v-model="form.isbn"
          label="ISBN"
          :rules="isbnRules"
        />
        <q-checkbox v-model="form.cdrom_dvd" label="CDROM/DVD" />
        <q-checkbox v-model="form.base_de_datos" label="Base de Datos" />
        <q-input filled v-model="form.url" label="URL" />
        <q-input filled v-model="form.tomo" label="Tomo" :rules="tomoRules" />
        <q-input
          filled
          v-model="form.folio"
          label="Folio"
          :rules="folioRules"
        />
        <div>
          <q-btn flat rounded label="Guardar" type="submit" color="primary" />
          <q-btn flat rounded label="Exportar a PDF" @click="exportToPDF" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default {
  data() {
    return {
      form: {
        nombre: '',
        apellidos: '',
        titulo_recurso: '',
        departamento: '',
        lugar_pub: '',
        tomo: '',
        folio: '',
        tipo_publicacion: '',
        issn: '',
        e_issn: '',
        isbn: '',
        cdrom_dvd: false,
        base_de_datos: false,
        url: '',
        tipo_recurso: '',
      },
      tiposPublicacion: [
        'revistaImpresa',
        'revistaDigital',
        'libroImpreso',
        'libroDigital',
      ],
      tiposRecurso: ['articulo', 'libro', 'capitulo', 'epigrafe'],
      nombreRules: [(v) => !!v || 'El Nombre es requerido'],
      apellidosRules: [(v) => !!v || 'Los Apellidos son requeridos'],
      titulo_recursoRules: [(v) => !!v || 'El Titulo es requerido'],
      departamentoRules: [
        (v) => !!v || 'El Departamentode Trabajo es requerido',
      ],
      lugarpubRules: [(v) => !!v || 'El Lugar de la Publicación es requerido'],
      tipo_recursoRules: [(v) => !!v || 'El Tipo de Recurso es requerido'],
      tipoPubRules: [(v) => !!v || 'El Tipo de Publicación es requerido'],
      issnRules: [(v) => !!v || 'El ISSN es requerido'],
      eissnRules: [(v) => !!v || 'El E-ISSN es requerido'],
      isbnRules: [(v) => !!v || 'El ISBN es requerido'],
      tomoRules: [(v) => !!v || 'El Tomo es requerido'],
      folioRules: [(v) => !!v || 'El Folio es requerido'],
    };
  },
  watch: {
    'form.url': function (newVal) {
      let modifiedUrl = newVal;
      if (!newVal.startsWith('http://') && !newVal.startsWith('https://')) {
        modifiedUrl = 'https://' + newVal;
      }
      if (modifiedUrl !== newVal) {
        this.form.url = modifiedUrl;
      }
    },
  },
  methods: {
    onSubmit() {
      if (
        !this.form.nombre ||
        !this.form.apellidos ||
        !this.form.titulo_recurso
      ) {
        this.errorMessage = 'Por favor, completa todos los campos requeridos.';
        return;
      }

      axios
        .post('http://127.0.0.1:8000/api/profesores/', this.form)
        .then((response) => {
          // Manejo exitoso
          console.log('Formulario enviado con éxito:', response.data);
          this.$router.push({ name: 'HomePage' });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            this.errorMessage =
              error.response.data.detail ||
              'Hubo un error al enviar el formulario.';
          } else {
            this.errorMessage =
              'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.';
          }
          console.error('Error al enviar el formulario:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        });
    },
    exportToPDF() {
      const formElement = document.getElementById('form'); // Asegúrate de que tu formulario tenga un ID
      html2canvas(formElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save(`${this.form.titulo_recurso}.pdf`);
      });
    },
  },
};
</script>
