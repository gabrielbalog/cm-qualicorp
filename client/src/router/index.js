import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/customers",
    name: "Customers",
    component: () =>
      import(/* webpackChunkName: "customers" */ "../views/Customers.vue")
  },
  {
    path: "/customer/",
    name: "CustomerForm",
    component: () =>
      import(/* webpackChunkName: "customers" */ "../views/CustomerForm.vue")
  },
  {
    path: "/customer/:id",
    name: "CustomerEditor",
    props: true,
    component: () =>
      import(/* webpackChunkName: "customers" */ "../views/CustomerForm.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
