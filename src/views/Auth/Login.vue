<template>
  <div class="login">
    <v-card
      elevation="10"
      style="max-width: 400px"
      class="mx-auto rounded-lg mt-10"
      color="primary darken-2"
      dark
    >
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            label="Email"
            v-model="email"
            solo
            :rules="req"
            v-on:keyup.enter="formSubmit"
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
        <v-btn variant="tonal" :disabled="!valid" v-on:click="formSubmit"
          >Login</v-btn
        >

        <div>
          <v-btn to="/register">Register</v-btn>
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
  name: "login",
  data: () => ({
    ispass: false,
    alert: {
      alertStatu: false,
      alertType: "success",
      alertMessage: "",
    },
    valid: false,
    email: "",
    password: "",
    loading: false,
    req: [(v) => !!v || "zorunlu alan "],
  }),
  methods: {
    formSubmit() {
      this.loading = true;

      var fd = new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);

      axios
        .post(process.env.VUE_APP_ROOT_API + "login", fd)
        .then((res) => {
          if (res.data) {
            if (res.data.status) {
              localStorage.setItem("api_token", res.data.api_token);
              this.alert = {
                alertStatu: true,
                alertType: "success",
                alertMessage: "Success!",
              };
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              this.loading = false;

              this.alert = {
                alertStatu: true,
                alertType: "error",
                alertMessage: "Error Information, Please Try Again.",
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
