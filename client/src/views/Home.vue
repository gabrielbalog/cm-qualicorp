<template>
  <div class="home">
    <h1>Customer Manager</h1>
    <div class="info">
      <p>
        This website was made to complete a challenge. The challenge requires a
        API with NodeJs and a frontend with VueJs. It was recommended to use
        Neo4j for the database but, at this moment, I use MongoDB because of my
        familiarity.
      </p>
      <p>
        The link of the project can be found
        <a href>here</a>.
      </p>
      <p>
        The postman documentation can be found
        <a href>here</a>.
      </p>
    </div>
    <h2>Features</h2>
    <div class="info">
      <p>This website provides the CRUD for customer.</p>
      <p>
        In the navbar you have the access to the list of customer, where you can
        add, edit and remove a client.
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home"
};
</script>

<style>
.home {
  margin-top: 2rem;
}
</style>
