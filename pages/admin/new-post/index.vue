<template>
  <!-- Populating new post here -->
  <div class="admin-new-post-page">
    <section class="new-post-from">
      <!-- we are using the form here -->
      <AdminPostForm />
    </section>
  </div>
</template>

<script>
// importing adminPost from component
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  components: {
    AdminPostForm
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