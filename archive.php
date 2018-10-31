<?php get_header(); ?>

<main>

  <article class="archives wrap__content contact" data-perpage="10" data-post_type="posts">
    
    <div class="container">
      <div class="row">

        <div id="top" class="offset-sm-25 col-sm-85 col-120" v-if="datas">

          <section v-for="(data,index) in datas" class="posts">
            <div class="section-blog__inner">
              <figure v-if="getImgUrl(data,'thumbnail')" class="section-blog__figure">
                <img :src="getImgUrl(data,'thumbnail')" :alt="data.title.rendered" class="section-blog__img">
              </figure>
              <div class="section-blog__content">
                <time class="section-blog__time" data-time="postDate(data,true)" v-text="postDate(data,false)"></time>
                <h3 class="section-blog__title"><a :href="data.link" v-text="data.title.rendered"></a></h3>
                <div class="section-blog__excerpt" v-html="description(data,100)"></div>
              </div>
            </div>
          </section>

          <div class="content-pager">
            <a href="#top" v-if="pager > 1"><i class="fa fa-angle-left content-pager__arrow" aria-hidden="true" @click="Pager(pager-1)"></i></a>
            <a href="#top" class="content-pager__page" v-if="n-1 <= (dataBase.length/perPage)" v-for="n in total" @click="Pager(n)" :class="{'content-pager__page_active':n==1}" v-text="n"></a>
            <a href="#top" v-if="pager < total"><i class="fa fa-angle-right content-pager__arrow" aria-hidden="true" @click="Pager(pager+1)"></i></a>
          </div>

        </div>

      </div>
    </div>


  </article>

</main>

<?php get_footer();?>