<template>
  <div class="error-page">
    <h1>Oops, something went wrong!</h1>
    <!--anchor tag is used because if app clashes then nuxt link wont work anymore-->
    <p>
      Back to
      <a href="/">safety</a>!
    </p>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
