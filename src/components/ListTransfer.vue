<template>
  <div class="container mt-4">
    <button id="newRegisterBtn" class="btn btn-secondary" @click="goToRegister()">
      Novo agendamento
    </button>
    <table class="table table-striped table-bordered custom-table">
      <thead>
        <tr>
          <th scope="col">Conta Origem</th>
          <th scope="col">Conta Destino</th>
          <th scope="col">Valor</th>
          <th scope="col">Taxa</th>
          <th scope="col">Data da transferência</th>
          <th scope="col">Agendado em</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transfer in transfers" :key="transfer.id">
          <td>{{ transfer.originAccount }}</td>
          <td>{{ transfer.destinyAccount }}</td>
          <td>{{ formatCurrency(transfer.transferValue) }}</td>
          <td>{{ transfer.transferTax }}</td>
          <td>{{ formatDate(transfer.transferDate) }}</td>
          <td>{{ formatDate(transfer.scheduleDate) }}</td>
          <td>
            <button id="editBtn" class="btn btn-warning btn-sm" @click="openEditModal(transfer)">Editar</button>
            <button id="deleteBtn" class="btn btn-danger btn-sm" @click="deleteTransfer(transfer.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="transfers.length === 0" class="alert alert-info" role="alert">
      Nenhum registro encontrado.
    </div>
    <edit-transfer-modal v-if="isModalVisible" :transfer="selectedTransfer" :visible="isModalVisible"
      @close="closeEditModal" @updated="fetchTransfers" />
  </div>
</template>

<script>
import EditTransferModal from './EditTransferModal.vue';

export default {
  components: {
    EditTransferModal,
  },
  data() {
    return {
      transfers: [],
      selectedTransfer: null,
      isModalVisible: false,
    };
  },
  mounted() {
    this.fetchTransfers();
  },
  methods: {
    async fetchTransfers() {
      try {
        const response = await this.$http.get('http://localhost:8080/api/v1/transfers');
        this.transfers = response.data;
      } catch (error) {
        console.error('Erro ao buscar transferências:', error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    },
    formatCurrency(value) {
      if (value != null) {
        return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
      }
      return 'R$ 0,00';
    },
    openEditModal(transfer) {
      this.selectedTransfer = { ...transfer };
      this.isModalVisible = true;
    },
    closeEditModal() {
      this.selectedTransfer = null;
      this.isModalVisible = false;
    },
    async deleteTransfer(id) {
      try {
        await this.$http.delete(`http://localhost:8080/api/v1/transfers/${id}`);
        this.transfers = this.transfers.filter(transfer => transfer.id !== id);
        console.log('Transferência excluída:', id);
      } catch (error) {
        console.error('Erro ao excluir transferência:', error);
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style>
#newRegisterBtn {
  display: flex;
  justify-content: start;
  margin-bottom: 30px;
  margin-top: 60px;
}

#editBtn {
  margin-right: 5px;
}

#deleteBtn {
  margin-left: 5px;
}

.custom-table {
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-table th,
.custom-table td {
  border: 1px solid #dee2e6;
  padding: 12px;
}

.custom-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.custom-table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
