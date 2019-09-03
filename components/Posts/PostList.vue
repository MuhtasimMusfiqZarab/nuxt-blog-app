<template>
  <!-- This is reused inside homepage and blogs page -->
  <div>
    <section class="post-lists">
      <!-- showing all featured posts here        -->
      <PostPreview
        id="1"
        thumbnail="https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        title="Hello there!!"
        previewText="This is my first post!!"
      />
      <PostPreview
        id="2"
        thumbnail="https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        title="SOmething is up!!"
        previewText="This is my first post!!"
      />
      <PostPreview
        id="3"
        thumbnail="https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        title="Some News here !!"
        previewText="This is my first post!!"
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
