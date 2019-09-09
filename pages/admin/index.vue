<template>
  <div class="admin-page">
    <section class="new-post">
      <!-- router is the injected vue router -->
      <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <!-- passing idAdmin like this makes is true -->
      <PostList :posts="loadedPosts" isAdmin />
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["check-auth", "auth"], // order is important for execution
  computed: {
    //getting prefetched data from vuex
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>