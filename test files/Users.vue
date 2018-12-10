<template>
    <div class="users">
        <ul>
            <li v-for="person in people" v-bind:key="person.name">{{person.name}}</li>
        </ul>
        <h1>blah</h1>
        <button v-on:click="increment">Increment Me</button>
        <h2>{{count}}</h2>
        <form>
            <input type="text" v-model="text" />
            <button @click="alertMe">Alert Text</button>
        </form>
        <h4>{{text}}</h4>
        <h1>{{Date.now()}}</h1>
    </div>
</template>

<script>
export default {
  data() {
    return {
      people: [{ name: "bob" }, { name: "joe" }, { name: "frink" }],
      count: 0,
      text: ""
    };
  },
  methods: {
    increment: function() {
      this.count = this.count + 1;
    },
    alertMe: function(e) {
      e.preventDefault();
      console.log(e);
    }
  }
};
</script>

<style>
</style>
