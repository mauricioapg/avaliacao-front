<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="submitForm">
          <h4 class="form-title">Dados da Transferência</h4>
          <div class="form-group">
            <label class="labelField" for="originAccount">Conta origem</label>
            <input type="text" v-model="originAccount" class="form-control" id="originAccount" required />
            <label class="labelField" for="destinyAccount">Conta destino</label>
            <input type="text" v-model="destinyAccount" class="form-control" id="destinyAccount" required />
            <label class="labelField" for="transferValue">Valor</label>
            <input 
              type="text" 
              v-model="transferValue" 
              @input="formatTransferValue" 
              class="form-control" 
              id="transferValue" 
              required 
            />
            <label class="labelField" for="transferDate">Data da transferência</label>
            <input type="date" v-model="transferDate" class="form-control" id="transferDate" required />
          </div>
          <div class="button-group">
            <button id="submitBtn" type="submit" class="btn btn-primary">Agendar</button>
            <button id="backBtn" type="button" class="btn btn-secondary" @click="goToList()">Voltar</button>
          </div>
        </form>
        <div v-if="message" class="mt-3">
          <div :class="['alert', messageType]">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originAccount: '',
      destinyAccount: '',
      transferValue: '',
      transferDate: '',
      message: '',
      messageType: ''
    };
  },
  methods: {
    async submitForm() {
      const transferData = {
        originAccount: this.originAccount,
        destinyAccount: this.destinyAccount,
        transferValue: parseFloat(this.transferValue.replace(',', '.')),
        transferDate: this.formatDate(this.transferDate),
      };

      try {
        const response = await this.$http.post('http://localhost:8080/api/v1/transfers', transferData);
        console.log("Transferência agendada:", response.data);
        this.originAccount = '';
        this.destinyAccount = '';
        this.transferValue = '';
        this.transferDate = '';
        this.message = "Transferência agendada com sucesso!";
        this.messageType = 'alert alert-success';
      } catch (error) {
        this.message = 'Erro ao agendar transferência: ' + error.message;
        this.messageType = 'alert alert-danger';
      }
      setTimeout(() => {
        this.message = '';
      }, 4000);
    },
    formatTransferValue(event) {
      const value = event.target.value.replace(/[^0-9.,]/g, '');
      this.transferValue = value.replace(',', '.');
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toISOString();
      return formattedDate.substring(0, 19);
    },
    goToList() {
      this.$router.push('/transfer');
    },
  },
};
</script>

<style>
form {
  margin-top: 60px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  margin-bottom: 30px;
}

.labelField {
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
}

.form-control {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
}

#submitBtn,
#backBtn {
  width: 120px;
  height: 40px;
  margin: 5px;
}

#transferDate {
  height: 42px;
}
</style>
