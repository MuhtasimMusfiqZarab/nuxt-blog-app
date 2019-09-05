<template>
  <!-- This uses dynamic postID form individual posts & update that one -->
  <div class="admin-post-page">
    <section class="update-form">
      <!-- load post into the form which can be edited -->
      <!-- AdminPostForm is accepting value from the fetched data  -->
      <!-- this component emiting submit event (contains post entered by the user==> editedPost) -->
      <AdminPostForm :post="loadedPosts" @submit="onSubmitted" />
    </section>
  </div>
</template>



<script>
// using from With default value inside to update that (load post into the form inside data property)
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from "axios";
export default {
  components: {
    AdminPostForm
  },
  // fetch post into the form
  asyncData(context) {
    //callback is not needed as we are using promise
    return axios
      .get(
        //param is postId because folder is named _postId
        "https://nuxt-blog-e3c31.firebaseio.com/post/" +
          context.params.postId +
          ".json"
      )
      .then(res => {
        console.log(res.data);
        //merging with component data (so returning object)
        return {
          loadedPost: res.data
        };
      })
      .catch(e => context.error(e));
    //id is fetched from route params (context.params.id === route.params.id)
  },
  methods: {
    onSubmitted(editedPost) {
      //updating the data
      // axios.put()
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