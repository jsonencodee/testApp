<template>
  <div class="login">
    <v-card
      elevation="10"
      style="max-width: 400px"
      class="mx-auto rounded-lg mt-10"
      color="primary darken-2"
      dark
    >
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            label="Name"
            v-model="name"
            solo
            :rules="req"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
            solo
            :rules="req"
          ></v-text-field>
          <v-text-field
            label="Password"
            solo
            :rules="req"
            :type="ispass ? 'text' : 'password'"
            v-model="password"
            :append-icon="ispass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="ispass = !ispass"
            v-on:keyup.enter="formSubmit"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn v-on:click="formSubmit" :disabled="!valid" variant="tonal"
          >Register</v-btn
        >

        <div class="ml-2">
          <v-btn to="/login" variant="tonal">Login</v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <v-alert
          v-model="alert.alertStatu"
          :type="alert.alertType"
          class="mt-3"
          >{{ alert.alertMessage }}</v-alert
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data: () => ({
    ispass: false,
    alert: {
      alertStatu: false,
      alertType: "success",
      alertMessage: "",
    },
    valid: false,
    name: "",
    email: "",
    password: "",
    loading: false,
    req: [(v) => !!v || "zorunlu alan "],
  }),
  methods: {
    formSubmit() {
      this.loading = true;

      var fd = new FormData();
      fd.append("name", this.name);
      fd.append("email", this.email);
      fd.append("password", this.password);

      axios
        .post(process.env.VUE_APP_ROOT_API + "register", fd)
        .then((res) => {
          if (res.data) {
            if (res.data.status) {
              localStorage.setItem("api_token", res.data.api_token);
              this.alert = {
                alertStatu: true,
                alertType: "success",
                alertMessage: "Success Register!",
              };
              setTimeout(() => {
                this.$router.push({
                  name: "login",
                });
              }, 1000);
            } else {
              this.loading = false;

              this.alert = {
                alertStatu: true,
                alertType: "error",
                alertMessage: "Register failed",
              };
            }
          }
        })
        .catch((err) => {
          if (err.response.data) {
            if (!err.response.data.status) {
              this.alert = {
                alertStatu: true,
                alertType: "error",
                alertMessage: err.response.data.message,
              };
              this.loading = false;
            }
          }
        });
    },
  },
  created() {},
};
</script>
