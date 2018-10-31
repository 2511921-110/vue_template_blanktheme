<?php get_header(); ?>

  <main class="type_page">
    <time v-if="data" :data-time="data.date" v-text="postFormat(data,'YYYY/MM/DD')"></time>
    <p v-if="data.category_name" v-text="data.category_name"></p>
    <figure v-if="getImgUrl(data,'thumbnail')">
      <img :src="getImgUrl(data,'thumbnail')" :alt="data.title.rendered">
    </figure>
    <h3 v-if="data.title" v-text="data.title.rendered"></h3>
    <div v-if="data.content" v-html="data.content.rendered"></div>
    <div class="tag" v-if="data.tag_name">
      <a v-for="tag in data.tag_name" :href="'/'+tag.slug">
        <span v-text="tag.name"></span>
      </a>
    </div>
  </main>

<?php get_footer(); ?>