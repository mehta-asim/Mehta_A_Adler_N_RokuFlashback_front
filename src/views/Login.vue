<template>
  <section class="container">
    <div class="show-status">
      <p v-if="signup">{{ flash }}</p>
      <p v-if="errors">{{ flash }}</p>
    </div>
    <section class="log-in">
      <label for="inlineFormInputName">Name</label>
      <input
        v-model="username"
        type="text"
        id="inlineFormInputName"
        placeholder="username"
        required
      />

      <label for="inlineFormPassword">Password</label>
      <input
        v-model="password"
        type="password"
        id="inlineFormPassword"
        placeholder="password"
        required
      />
    </section>

    <button v-if="signup" type="submit" class="sign-up" @click="trySignup">
      SIGN UP
    </button>

    <button type="submit" @click="tryLogin">LOGIN</button>
    <p>Forgot Password?</p>
  </section>
</template>  

<script>
export default {
  name: "TheLogin",

  data() {
    return {
      username: "",
      password: "",
      flash: "",
      signup: false,
      errors: false,
      url: "",
    };
  },

  methods: {
    tryLogin() {
      this.url = "/users/getone";
      this.login();
    },

    trySignup() {
      this.url = "/users/signup";
      this.login();
    },

    goToUsers(time, vm, user) {
      let nav = document.querySelector(".navigation");
      nav.style.display = "flex";

      setTimeout(function () {
        vm.$emit("setauth", true);
        vm.$emit("setallow", user.permissions);
        if (user.permissions <= 1) {
          let body = document.querySelector("body");
          body.classList.add("kids");
          body.classList.remove("default");
          vm.$router.push({ name: "UserHome", params: user });
        } else {
          vm.$router.push({ name: "UserSelect" });
        }
      }, time);
    },

    login() {
      let formData = {
        username: this.username,
        password: this.password,
      };

      fetch(this.url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.table("data:", data);

          switch (data.action) {
            case "add":
              this.signup = true;
              this.errors = false;
              this.username = "";
              this.password = "";
              this.flash = `Hmmm... your username doesn't seem to exist. Do you want to sign up? Or you can try again.`;
              break;

            case "added":
              this.errors = false;
              this.flash = `Added ${this.username} to Roku Flashback! Enjoy! ... redirecting ...`;
              this.goToUsers(2500, this);
              break;

            case "retry":
              document
                .querySelector(`input[type=${data.field}]`)
                .classList.add("error");
              this.signup = false;
              this.errors = true;
              this.flash = `Your login info is not correct. Please retry.`;
              break;

            default:
              this.goToUsers(0, this, data.user);
          }
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/login.scss";
</style>

