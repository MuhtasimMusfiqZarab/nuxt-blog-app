<template>
  <!-- This uses dynamic postID form individual posts & update that one -->
  <div class="admin-post-page">
    <section class="update-form">
      <!-- load post into the form which can be edited -->
      <!-- AdminPostForm is accepting value from the fetched data  -->
      <!-- this component emiting submit event (contains post entered by the user==> editedPost) -->
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
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
  asyncData(context) {
    //callback is not needed as we are using promise
    return context.app.$axios
      .$get(
        //param is postId because folder is named _postId
        "/post/" + context.params.postId + ".json"
      )
      .then(data => {
        //merging with component data (so returning object)
        return {
          // adding postId to the field(coz folder name is postId)
          loadedPost: { ...data, id: context.params.postId }
        };
      })
      .catch(e => context.error(e));
    //id is fetched from route params (context.params.id === route.params.id)
  },
  methods: {
    //edited post is passed on auto in emited submit event
    onSubmitted(editedPost) {
      this.$store
        .dispatch("editPost", editedPost)
        .then(() => this.$router.push("/admin"));
    }
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