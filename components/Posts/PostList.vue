<template>
  <!-- This is reused inside homepage and blogs page -->
  <div>
    <section class="post-lists">
      <!-- looping through individual post -->
      <!-- showing all featured posts here        -->
      <!-- key must be binded if we use v-for (efficient manage our list) -->
      <!-- binding :id is important for routing -->
      <PostPreview
        :id="post.id"
        v-for="post in posts"
        :key="post.id"
        :is-admin="isAdmin"
        :thumbnail="post.thumbnail"
        :title="post.title"
        :previewText="post.previewText"
      />
    </section>
  </div>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  name: "PostList",
  components: {
    PostPreview
  },
  // checking previledge for updating a post (admin or not)
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>


<style scoped>
.post-lists {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
