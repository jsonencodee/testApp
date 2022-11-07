<template>
  <div class="page">
    <h3 class="pt-0 pb-3">Dashboard</h3>
    <v-layout wrap>
      <v-col cols="12">
        <v-card>
          <v-card-title class="justify-space-between align-items-center">
            Welcome {{ userName }}
          </v-card-title>
          <v-card-title>
            <v-btn color="teal" @click="getData">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn color="red" class="ml-2" @click="logOut">
              <v-icon>mdi-power</v-icon>
            </v-btn>
          </v-card-title>
          <h5>User List - {{ totalDesserts }} Total.</h5>
          <v-table theme="dark">
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Email</th>
                <th class="text-left">Created at</th>
                <th class="text-left">Updated at</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.updated_at }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data: () => ({
    userName: "",
    desserts: [],
    totalDesserts: 0,
  }),
  methods: {
    logOut() {
      axios
        .post(process.env.VUE_APP_ROOT_API + "logout")
        .then((res) => {
          if (res.data) {
            if (res.data.status) {
              localStorage.removeItem("api_token");
              window.location.reload();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      this.desserts = [];

      axios
        .get(process.env.VUE_APP_ROOT_API + "users/0/100")
        .then((res) => {
          if (res.data) {
            if (res.data.status) {
              this.desserts = res.data.data;
              this.totalDesserts = res.data.total;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMe() {
      this.desserts = [];

      axios
        .get(process.env.VUE_APP_ROOT_API + "profile-me")
        .then((res) => {
          if (res.data) {
            if (res.data.status) {
              this.userName = res.data.data.name;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getData();
    this.getMe();
  },
};
</script>
