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
            <input type="text" v-model="transferValue" class="form-control" id="transferValue" required />
            <label class="labelField" for="transferDate">Data da transferência</label>
            <input type="text" v-model="transferDate" class="form-control" id="transferDate" required />
          </div>
          <div class="button-group">
            <button id="submitBtn" type="submit" class="btn btn-primary">Agendar</button>
            <button id="backBtn" type="button" class="btn btn-secondary" @click="goToList()">Voltar</button>
          </div>
        </form>
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
    };
  },
  methods: {
    async submitForm() {
      const transferData = {
        originAccount: this.originAccount,
        destinyAccount: this.destinyAccount,
        transferValue: this.transferValue,
        transferDate: this.transferDate,
      };

      try {
        const response = await this.$http.post('http://localhost:8080/api/v1/transfers', transferData);
        console.log("Transferência agendada:", response.data);
        this.originAccount = '';
        this.destinyAccount = '';
        this.transferValue = '';
        this.transferDate = '';
      } catch (error) {
        console.error('Erro ao agendar transferência:', error);
      }
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

#submitBtn, #backBtn {
  width: 120px;
  height: 40px;
  margin: 5px;
}
</style>
