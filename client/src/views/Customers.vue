<template>
  <div class="home">
    <h1>Customer List</h1>
    <div
      class="alert alert-danger"
      :class="alertClass"
      role="alert"
      v-if="hasErrors"
    >
      An error has occurred:
      <span v-for="(error, index) in errors" :key="index">{{
        error.message
      }}</span>
    </div>
    <table
      class="table table-bordered"
      v-if="!hasErrors && customers.length > 0"
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">CPF</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="customer._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.cpf }}</td>
          <td>{{ customer.phone }}</td>
          <td>
            <span class="button" @click="editItem(customer)">Edit</span>
            <span class="button" @click="removeItem(customer)">Remove</span>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="customers.length <= 0">Please add a customer</p>
    <router-link to="/customer"
      ><button type="submit" class="btn btn-primary">
        Add new
      </button></router-link
    >
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "/api/v1/customers";

export default {
  name: "Customers",
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  data: () => ({
    customers: [],
    errors: [],
    alertClass: "alert-primary"
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const results = await axios.get(API_URL);
        this.customers = results.data.data;
      } catch (err) {
        this.errors.push(err);
      }
    },
    removeItem(item) {
      try {
        axios.delete(`${API_URL}/${item._id}`);
        this.customers = this.customers.filter(i => i._id !== item._id);
      } catch (err) {
        this.errors.push(err);
      }
    },
    editItem(item) {
      this.$router.push({
        name: "CustomerEditor",
        params: { id: item._id }
      });
    }
  }
};
</script>

<style>
.button {
  cursor: pointer;
  margin: auto 0.5rem;
  color: #7676ff;
}
</style>
