<template>
  <div>
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card style="width: 300px">
        <q-card-section class="text-bold">Selecciona el Tipo de Recurso:</q-card-section>
        <q-select
          dense
          v-model="selectedResourceType"
          :options="resourceTypes"
          label="Tipos de Recursos"
          @input="handleSelection"
        />
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="handleCancel" />
          <q-btn flat label="Aceptar" @click="handleAccept" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref,  } from 'vue';

const props = defineProps({
  modelValue: String,
  resourceTypes: Array,
  openDialogAutomatically: Boolean,
});

const emit = defineEmits(['update:modelValue', 'dialogClosed']);

const isDialogOpen = computed({
  get: () => props.openDialogAutomatically,
  set: (value) => value? emit('Dialogopen') : emit('dialogClosed')
});

const selectedResourceType = ref('');

const handleSelection = (resourceType: string) => {
  selectedResourceType.value = resourceType;
  emit('dialogClosed');
};

const handleAccept = () => {
  if (selectedResourceType.value) {
    emit('update:modelValue', selectedResourceType.value);

  }
  emit('dialogClosed');
};

const handleCancel = () => {
  emit('dialogClosed');
};
</script>
