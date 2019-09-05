<template>
  <!-- creating from without action attribute -->
  <!-- summit would be triggered because App button has the type== submit  -->
  <!-- using .prevent because in default submit sends a http request, which we dont want -->
  <form @submit.prevent="onSave">
    <!-- Prewritten text -->
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

    <AppControlInput v-model="editedPost.title">Title</AppControlInput>

    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>

    <AppControlInput control-type="textarea" v-model="editedPost.content">Content</AppControlInput>
    <AppControlInput control-type="textarea" v-model="editedPost.previewText">Prewview Text</AppControlInput>

    <AppButton type="submit">Save</AppButton>

    <AppButton type="button" style="margin-left: 10px" btn-style="cancel" @click="onCancel">Cancel</AppButton>
  </form>
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
  props: {
    //getting default value for the form if passed as a prop (prop is whole data object)
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      //returning an object based on the existing one (if any post is send as a prop as a default value)
      // checking if the form is provided with a prop data, then use that value inside the form
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            content: "",
            previewText: ""
          }
    };
  },

  methods: {
    //saving the post here
    onSave() {
      // console.log(this.editedPost);
      this.$emit("submit", this.editedPost); //emiting submit event to all parent with form data
      // this.$router.push("/admin");
    },
    onCancel() {
      // navigate back
      this.$router.push("/admin");
    }
  }
};
</script>