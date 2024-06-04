<template>
  <div>
    <q-input
          filled
          v-model="form.departamento"
          label="Departamento"
          class="form-item"
          @click="openFirstDialog"
          :rules="departamentoRules"
        />

        <q-dialog v-model="firstDialog" persistent>
          <q-card style="width: 300px">
            <q-card-section class="text-bold">Selecciona la Facultad:</q-card-section>
            <q-select
              filled
              v-model="selectedFaculty"
              :options="faculty"
              label="Facultades"
              @input="selectFaculty"
            />
            <q-card-actions align="right">
              <q-btn flat label="Cancel" @click="closeFirstDialog" />
              <q-btn
                flat
                label="OK"
                @click="() => selectFaculty(selectedFaculty)"
              />
            </q-card-actions>
         
          </q-card>
        </q-dialog>

        <!-- Diálogo para seleccionar departamento -->
        <q-dialog v-model="secondDialog" persistent>
          <q-card style="width: 300px">
            <q-card-section class="text-bold">Selecciona un Departamento:</q-card-section>
            <q-select
              filled
              v-model="selectedDepartment"
              :options="selectedDepartmentOptions"
              label="Departamentos"
              @input="selectDepartment"
            />
            <q-card-actions align="right">
              <q-btn flat label="Cancel" @click="closeSecondDialog" />
              <q-btn
                flat
                label="OK"
                @click="() => selectDepartment(selectedDepartment)"
              />
            </q-card-actions>
           
          </q-card>
        </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref,defineEmits } from 'vue';

interface DepartmentsByFaculty {
  [key: string]: string[];
}
// Definición de datos reactivos
const firstDialog = ref(false);
const secondDialog = ref(false);
const selectedFaculty = ref('');
const selectedDepartment = ref('');
const selectedDepartmentOptions = ref(['']);
const faculty = [
  '-Ciencias Sociales',
  '-Ciencias Aplicadas',
  '-Ciencias Agropecuarias',
  '-Ciencias Económicas',
  '-Electromecánica',
  '-Construcciones',
  '-Lengua y Comunicación',
  '-Informática y Ciencias Exactas',
  '-Ciencias Pedagógicas',
  '-Cultura Física',
  '-CUM',
];
const departmentsByFaculty: DepartmentsByFaculty = {
  '-Ciencias Sociales': ['Derecho', 'Estudios Socioculturales', 'Psicología - Sociología'],
  '-Ciencias Aplicadas': ['Alimentos', 'Educación Biología', 'Educación Geografía', 'Ingeniería Química', 'Ingeniería Industrial', 'Química', 'CEECE', 'CEGEA'],
  '-Ciencias Agropecuarias': ['Agronomía', 'Educación Agropecuaria', 'Morfofisiología', 'Medicina Veterinaria', 'CEDEPA'],
  '-Ciencias Económicas': ['Contabilidad', 'Economía', 'Educación Economía', 'Turismo', 'CEMTUR', 'CEDET'],
  '-Electromecánica': ['Educación Electromecánica', 'Ingeniería Eléctrica', 'Ingeniería Mecánica', 'CEEFREP'],
  '-Construcciones': ['Arquitectura', 'Educación Construcción', 'Ingeniería Civil', 'CECODEC'],
  '-Lengua y Comunicación': ['Español', 'Lenguas Extranjeras', 'Periodismo y Comunicación Social', 'Centro de Idiomas'],
  '-Informática y Ciencias Exactas': ['Educación Laboral e Informática', 'Ciencias de la Información', 'Ingeniería Informática', 'Física', 'Matemática'],
  '-Ciencias Pedagógicas': ['Educación Artística', 'Educación Especial', 'Educación Pedagogía - Psicología', 'Formación Pedagógica General', 'Educación Preescolar', 'Educación Primaria'],
  '-Cultura Física': ['Cultura Física', 'Ciencias Aplicadas al Deporte', 'Didáctica del Deporte', 'Educación Física y Recreación', 'CEAFIDE'],
  '-CUM': ['Céspedes', 'Esmeralda', 'Florida', 'Guáimaro', 'Jimaguayú', 'Minas', 'Najasa', 'Nuevitas', 'Santa Cruz del Sur', 'Sibanicú', 'Sierra de Cubitas', 'Vertientes']
};
const emit = defineEmits(['departmentSelected']);
// Métodos
const openFirstDialog = () => {
  firstDialog.value = true;
};
const closeFirstDialog = () => {
  firstDialog.value = false;
};
const selectFaculty = (faculty: string) => {
  closeFirstDialog();
  selectedFaculty.value = faculty;
  openSecondDialogWithDepartments(faculty);
};
const openSecondDialogWithDepartments = (faculty: string) => {
  if (departmentsByFaculty[faculty]) {
    secondDialog.value = true;
    selectedDepartment.value = '';
    selectedDepartmentOptions.value = departmentsByFaculty[faculty];
  }
};
const closeSecondDialog = () => {
  secondDialog.value = false;
};
const selectDepartment = (department: string) => {
  closeSecondDialog();
  emit('departmentSelected', department); // Notifica al componente padre sobre la selección
};

// Propiedades computadas y otros hooks opcionales van aquí
</script>
