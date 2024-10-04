<template>
  <div class="modal fade show" tabindex="-1" role="dialog" style="display: block;" @click.self="close">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Transferência</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submit">
            <div class="form-group">
              <label class="labelField" for="originAccount">Conta Origem</label>
              <input type="text" class="form-control" id="originAccount" v-model="localTransfer.originAccount" required>
            </div>
            <div class="form-group">
              <label class="labelField" for="destinyAccount">Conta Destino</label>
              <input type="text" class="form-control" id="destinyAccount" v-model="localTransfer.destinyAccount" required>
            </div>
            <div class="form-group">
              <label class="labelField" for="transferValue">Valor</label>
              <input 
                type="text" 
                class="form-control" 
                id="transferValue" 
                v-model="localTransfer.transferValue" 
                @input="formatTransferValue" 
                required 
              />
            </div>
            <div class="form-group">
              <label class="labelField" for="transferDate">Data da Transferência</label>
              <input 
                type="date" 
                class="form-control" 
                id="transferDate" 
                v-model="formattedTransferDate" 
                @change="updateTransferDate" 
                required 
              />
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transfer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localTransfer: {
        ...this.transfer,
        transferDate: this.transfer.transferDate || new Date().toISOString(),
      },
    };
  },
  computed: {
    formattedTransferDate() {
      const date = new Date(this.localTransfer.transferDate);
      return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async submit() {
      const transferData = {
        originAccount: this.localTransfer.originAccount,
        destinyAccount: this.localTransfer.destinyAccount,
        transferValue: parseFloat(this.localTransfer.transferValue.replace(',', '.')),
        transferDate: this.localTransfer.transferDate
      };

      try {
        const response = await this.$http.put(`http://localhost:8080/api/v1/transfers/${this.localTransfer.id}`, transferData);
        console.log("Transferência alterada:", response.data);
        this.localTransfer = {};
        this.message = "Transferência alterada com sucesso!";
        this.messageType = 'alert alert-success';
      } catch (error) {
        this.message = 'Erro ao alterar transferência: ' + error.message;
        this.messageType = 'alert alert-danger';
      }
      setTimeout(() => {
        this.message = '';
      }, 4000);
      window.location.reload()
    },
    formatTransferValue(event) {
      const value = event.target.value.replace(/[^0-9.,]/g, '');
      this.localTransfer.transferValue = value;
    },
    updateTransferDate(event) {
      const selectedDate = new Date(event.target.value);
      if (!isNaN(selectedDate.getTime())) {
        this.localTransfer.transferDate = selectedDate.toISOString().replace('Z', '');
      } else {
        this.localTransfer.transferDate = '';
      }
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
.labelField {
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
}
</style>
