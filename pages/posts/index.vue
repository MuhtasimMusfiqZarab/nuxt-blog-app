<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  //middleware expects file names except for the extention
  middleware: "log",
  //loading async data from the store to be used
  computed: {
    // this.$store.dispatch("setPosts", this.loadedPosts);
    // return this.$store.getters.loadedPosts;
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.post-lists {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>


