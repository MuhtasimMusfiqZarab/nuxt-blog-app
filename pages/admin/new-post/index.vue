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
    async onSubmitted(postData) {
      try {
        //(url, data object)
        const result = await axios.post(
          "https://nuxt-blog-e3c31.firebaseio.com/post.json",
          postData
        );
        console.log(result);
      } catch (err) {
        throw new Error(err);
      }
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