<template>
    <div class="users2">
        <h1>Users</h1>
        <form>
            <label>Name: </label>
            <input v-model="newName" type="text"><br><br>
            <label>Email: </label>
            <input v-model="newEmail" type="text"><br><br>
            <label>Phone: </label>
            <input v-model="newPhone" type="text"><br><br>
            <button type="submit" v-on:click="addUser">Add User</button>
        </form>

        <h3>New Entry: </h3>
        <p>{{newName}}, {{newEmail}}, {{newPhone}}</p>

        <ul>
            <li v-bind:key=user.email v-for="user in users">
                First Name: {{user.firstName}}
                Email: {{user.email}}
                Phone: {{user.phone}}
            </li>
        </ul>

    </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          firstName: "Jim",
          email: "a@a.com",
          phone: "355-555-5555"
        },
        {
          firstName: "Bob",
          email: "b@a.com",
          phone: "455-555-5555"
        },
        {
          firstName: "Frank",
          email: "c@a.com",
          phone: "555-555-5555"
        }
      ],
      newName: "",
      newPhone: "",
      newEmail: ""
    };
  },
  methods: {
    addUser: function(e) {
      e.preventDefault();
      this.users.push({
        firstName: this.newName,
        email: this.newEmail,
        phone: this.newPhone
      });
    }
  },
  props: {
    header: {
      type: String
    }
  }
};
</script>

