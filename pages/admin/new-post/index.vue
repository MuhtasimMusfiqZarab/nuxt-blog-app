<template>
  <!-- Populating new post here -->
  <div class="admin-new-post-page">
    <section class="new-post-from">
      <!-- creating from without action attribute -->
      <!-- summit would be triggered because App button has the type== submit  -->
      <!-- using .prevent because in default submit sends a http request, which we dont want -->
      <form @submit.prevent="onSave">
        <!-- Prewritten text -->
        <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

        <AppControlInput v-model="editedPost.title">Title</AppControlInput>

        <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail Link</AppControlInput>

        <AppControlInput control-type="textarea" v-model="editedPost.content">Content</AppControlInput>

        <AppButton type="submit">Save</AppButton>

        <AppButton
          type="button"
          style="margin-left: 10px"
          btn-style="cancel"
          @click="onCancel"
        >Cancel</AppButton>
      </form>
    </section>
  </div>
</template>

<script>
// importing the custom ui components
import AppControlInput from "@/components/UI/AppControlInput";
import AppButton from "@/components/UI/AppButton";

export default {
  components: {
    AppControlInput,
    AppButton
  },
  data() {
    return {
      editedPost: {
        author: "",
        title: "",
        thumbnailLink: "",
        content: ""
      }
    };
  },
  methods: {
    //saving the post here
    onSave() {
      console.log(this.editedPost);
    },
    onCancel() {
      // navigate back
      this.$router.push("/admin");
    }
  }
};
</script>