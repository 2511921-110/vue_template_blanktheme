<template>
  <a :href="post.link" class="posts__links">
  	<span class="posts__hover" :style="'background-color:'+[ post.category_name[0].color ? post.category_name[0].color : '#000' ]"></span>
    <div class="posts__inner">
      
      <figure class="posts__image" v-if="getImgUrl(post,imagesize)">
        <img :src="getImgUrl(post,imagesize)" :alt="post.title.rendered">
      </figure>
      <figure class="posts__image" v-else>
        <img :src="themeurl+'/assets/posts_default.png'" :alt="post.title.rendered">
      </figure>

      <h2 class="posts__title title__normal" v-text="post.title.rendered"></h2>
      <time class="posts__date" :data-time="postDate(post,true)" v-text="postDate(post)"></time>
      <!-- <div class="posts__categories">
        <a class="posts__category" v-if="post.category_name" v-for="category in post.category_name" :href="homeurl+'/category/'+category.slug" :style="'background-color:'+[ category.color ? category.color : '#ce0613' ]">
        <span v-text="category.name"></span>
        </a>
      </div> -->
      <!-- <div class="posts__tags">
        <a class="posts__tagitem" v-if="post.tag_name" v-for="tag in post.tag_name" :href="homeurl+'/tag/'+tag.slug">
          <span v-text="tag.name"></span>
        </a>
      </div> -->
      <div class="posts__description" v-if="show_description && description(post,length)" v-html="description(post,length)"></div>
      <div class="posts__btn-wrap">
        <a :href="post.link" class="posts__btn" v-if="moretext !== false" v-text="moretext"></a>
      </div>
    </div>
  </a>
</template>

<script>
  import posts from './posts';
  export default posts;
</script>