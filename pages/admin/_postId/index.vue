<template>
  <!-- This uses dynamic postID form individual posts & update that one -->
  <div class="admin-post-page">
    <section class="update-form">
      <!-- load post into the form which can be edited -->
      <!-- AdminPostForm is accepting value from the fetched data  -->
      <AdminPostForm :post="loadedPosts" />
    </section>
  </div>
</template>



<script>
// using from With default value inside to update that (load post into the form inside data property)
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  components: {
    AdminPostForm
  },
  // fetch post into the form
  data() {
    return {
      loadedPosts: {
        author: "Muhtasim Musfiq",
        title: "New Title",
        content: "This is the newest news",
        thumbnail:
          "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
      }
    };
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>