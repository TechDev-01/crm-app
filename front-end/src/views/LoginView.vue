<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al incio de sesión");
    }
    const data = response.json();
    console.log("Login exitoso", data);

    router.push('/api/home');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Contraseña"
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</template>

<style scoped>
    .login {
      background-color: aqua;
    }
</style>