<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <h1 class="h2 mb-4 font-weight-normal">
        請先登入
        </h1>
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input type="email"
              class="form-control"
              id="username"
              v-model="user.username"
              placeholder="name@example.com" required autofocus>
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password"
              class="form-control"
              id="password"
              v-model="user.password"
              placeholder="Password" required>
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3"
            @click="signin"
            type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted text-center">
      &copy; 2023~∞ - 六角學院
    </p>
  </div>
</template>

<script>

const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const url = `${VITE_APP_URL}/admin/signin`
      this.$http.post(url, this.user)
        .then(res => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          this.$router.push('/admin/products')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
