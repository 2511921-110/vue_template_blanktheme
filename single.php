<?php get_header(); ?>

<main class="type_page">
  <time v-if="data" :data-time="data.date" v-text="postFormat(data,'YYYY/MM/DD')"></time>
  <p v-if="data.category_name" v-text="data.category_name"></p>
  <figure v-if="getImgUrl(data,'full')">
    <img :src="getImgUrl(data,'full')" :alt="data.title.rendered">
  </figure>
  <h3 v-if="data.title" v-text="data.title.rendered"></h3>
  <div v-if="data.content" v-html="data.content.rendered"></div>
  <div class="tag" v-if="data.tag_name">
    <span v-for="tag in data.tag_name" v-text="tag.name"></span>
  </div>
</main>

<?php get_footer(); ?>