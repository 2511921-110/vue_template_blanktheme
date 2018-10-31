<?php get_header(); ?>

<?php if(is_front_page()): ?>
  <main class="archives">
<?php elseif(is_home()): ?>
  <main class="type_page">
<?php else: ?>
  <main>
<?php endif; ?>
	<time v-if="data.date" :data-time="data.date" v-text="postFormat(data,'YYYY/MM/DD')"></time>
  <p><?php $cat = get_the_category(); ?>
	<?php $cat = $cat[0]; ?>
	<?php echo get_cat_name($cat->term_id); ?></p>
  <h3 v-if="data.title" v-text="data.title.rendered"></h3>
  <div v-if="data.content" v-html="data.content.rendered"></div>
</main>

<?php get_footer(); ?>