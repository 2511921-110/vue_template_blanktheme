<?php get_header(); ?>

<main class="type_page" v-if="data">
  <time v-if="data.date" :data-time="data.date" v-text="postFormat(data,'YYYY/MM/DD')"></time>
  <h3 v-if="data.title" v-text="data.title.rendered"></h3>
  <div v-if="data.content" v-html="data.content.rendered"></div>
</main>

<?php get_footer(); ?>