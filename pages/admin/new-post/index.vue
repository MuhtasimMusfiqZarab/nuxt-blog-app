<template>
  <!-- Populating new post here -->
  <div class="admin-new-post-page">
    <section class="new-post-from">
      <!-- we are using the form here -->
      <!-- submit event caries the new data with it.. and gives onSubmitted method to use it inside its argument -->
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
// importing adminPost from component
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  methods: {
    // must use try catch block inside of async,await
    onSubmitted(postData) {
      //need to call coz nuxtInitServer executes only once (thus need to change vuex data later like this one)
      this.$store.dispatch("addPost", postData);
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>