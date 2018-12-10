<template>
    <div class="test">
        <input type="text" v-model="title">
        <h1>{{ title }}</h1>
        <p v-if="showName">{{ user.firstName }}</p>
        <p v-else v-text="user.lastName"></p>
        <ul>
            <li v-bind:key="item.title" v-for="item in items">{{item.title}}</li>
        </ul>
        <button type="button" v-on:click='greet("hiya")'>Press me </button>
        <input type="text" v-on:keyup="pressKey" v-on:keyup.enter="enterHit">
        <hr>
        <label>First Name: </label><input type="text" v-model="user.firstName">
        <br>
        <label>Last Name: </label><input type="text" v-model="user.lastName">
        <h3>{{fullName}}</h3> 
    </div>
</template>

<script>
export default {
  name: "test",
  props: {
    msg: {
      type: String,
      default: "this is a message"
    }
  },
  data() {
    return {
      title: "Hello World",
      user: {
        firstName: "John",
        lastName: "Doe"
      },
      showName: false,
      items: [{ title: "Item 1" }, { title: "Item 2" }, { title: "Item 3" }]
    };
  },
  methods: {
    greet: function(greeting) {
      alert(greeting);
    },
    pressKey: function(e) {},
    enterHit: function() {}
  },
  computed: {
    fullName: function() {
      return this.user.firstName + " " + this.user.lastName;
    }
  }
};
</script>
