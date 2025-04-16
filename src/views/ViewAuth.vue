<template>
  <div class="auth">
    <div class="tabs is-centered is-boxed">
      <ul>
        <li @click.prevent="login = true" :class="{ 'is-active': login }"><a>Login</a></li>
        <li @click.prevent="login = false" :class="{ 'is-active': !login }"><a>Registrar-se</a></li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
          <form @submit.prevent="OnSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model="info.email" class="input" type="email" autofocus>
              </div>
            </div>

            <div class="field">
              <label class="label">Senha</label>
              <div class="control">
                <input v-model="info.senha" class="input" type="password">
              </div>
            </div>

            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button @click="info.email = ''; info.senha = ''" class="button is-danger is-light" type="button">Cancelar</button>
              </div>
              <div class="control">
                <button @click="onSubmit" class="button is-link">{{ formTitle }}</button>
              </div>
            </div>
          </form>      
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, reactive, ref } from 'vue';
  import { useStoreAuth } from '@/stores/storeAuth';

  const login = ref(true)

  const storeAuth = useStoreAuth()

  const formTitle = computed(() => {
    return login.value ? 'Login' : 'Registrar-se'
  })

  const info = reactive({
    email: '',
    senha: ''
  })

  const OnSubmit = () => {
    if (!(info.email || info.senha)) {
      alert('Preencha todos os campos antes de enviar!  ')
    }
    else {
      if (login.value) {
        storeAuth.logar(info)
      } else {
        storeAuth.registrar(info)
      }
    }
  }
</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>