<template>
  <div class="home">
    <h1>Customer Editor</h1>
    <div class="alert alert-danger" role="alert" v-if="hasErrors">
      An error has occurred:
      <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
    </div>
    <form @submit.prevent>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="customer.name"
            placeholder="Add an name"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="phone">Phone</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="customer.phone"
            placeholder="Add an phone"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="customer.email"
            placeholder="Add an email"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="cpf">CPF</label>
          <input
            type="text"
            class="form-control"
            id="cpf"
            v-model="customer.cpf"
            placeholder="Add an CPF"
          />
        </div>
      </div>
      <div class="buttons">
        <button type="submit" class="btn btn-primary" @click="saveItem">
          {{ id ? "Save" : "Add" }}
        </button>
        <button
          type="submit"
          class="btn btn-danger"
          v-if="id"
          @click="removeItem"
        >
          Remove
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "/api/v1/customers";

export default {
  name: "CustomerForm",
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data: () => ({
    customer: {
      name: "",
      phone: "",
      email: "",
      cpf: ""
    },
    errors: []
  }),
  methods: {
    async fetchData() {
      try {
        const results = await axios.get(`${API_URL}/${this.id}`);
        this.customer = results.data.data;
      } catch (err) {
        this.errors.push(err);
      }
    },
    async saveItem() {
      try {
        this.errors = [];
        if (this.id) {
          await axios.put(`${API_URL}/${this.id}`, this.customer);
        } else {
          await axios.post(`${API_URL}/`, this.customer);
        }

        this.$router.push({
          name: "Customers"
        });
      } catch (err) {
        this.errors.push(err.response.data.error);
      }
    },
    async removeItem() {
      try {
        await axios.delete(`${API_URL}/${this.id}`);
        this.$router.push({
          name: "Customers"
        });
      } catch (err) {
        this.errors.push(err.response.data.error);
      }
    }
  },
  created() {
    if (this.id) {
      this.fetchData();
    }
  }
};
</script>

<style>
button {
  margin: auto 1rem;
}
</style>
