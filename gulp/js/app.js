//import 'bootstrap'
import Vue from 'vue'
import axios from 'axios'
import './functions'


import Slick from 'vue-slick'
import VueInstagram from 'vue-instagram'
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'moment'

// original component
import loader from './loader.vue'
import posts from './posts.vue'

import Lightbox from 'vue-pure-lightbox'

Vue.use(Lightbox)



/*******************
  load
*******************/
if(document.getElementById('preLoader')){
  window.onload = () =>{
    document.getElementById('preLoader').classList.add('preloader__remove')
  }
}

/*******************
  square
*******************/

let square = () => {
  const square = document.querySelectorAll('.square')
  Array.from(square).forEach((v,i)=>{
    v.style.height = v.clientWidth+'px'
  })
}


/*******************
  picture
*******************/

// ボックスの横幅から、黄金比での縦サイズを求めて四捨五入
let pictureHorizon = () => {
  const picture = document.querySelectorAll('.picture-h')
   Array.from(picture).forEach((v,i)=>{
    v.style.height = Math.round(v.clientWidth / 1.618)+'px'
  })
}
let pictureVertical = () => {
  const picture = document.querySelectorAll('.picture-v')
   Array.from(picture).forEach((v,i)=>{
    v.style.height = Math.round(v.clientWidth * 1.618)+'px'
  })
}
let poster = () => {
  const picture = document.querySelectorAll('.poster')
   Array.from(picture).forEach((v,i)=>{
    v.style.height = Math.round(v.clientWidth * 1.415)+'px'
  })
}
let pictureCunstom = (el,num=1) => {
  const picture = document.querySelectorAll(el)
  Array.from(picture).forEach((v,i)=>{
    v.style.minHeight = Math.round(v.clientWidth / num)+'px'
  })
}
square()
// pictureHorizon()
//使い方　（第一引数に使いたいclassを設定し、第二引数に縦サイズのアスペクト比を入力）
//pictureCunstom('.picture-h',1.4)
//pictureCunstom('.section-square__figure',1.618)
//pictureCunstom('.youtube',1.39)
//pictureCunstom('.class__inner',1.432 )
//pictureCunstom('.class',1.335 )

/*******************
  query
*******************/
let query = ''
// カテゴリー用
if(typeof cat_id !== 'undefined') query += '&categories='+cat_id
// タグ用
if(typeof tag_id !== 'undefined') query += '&tags='+tag_id
// 検索結果用
if(typeof search !== 'undefined') query += '&search='+search

/*******************
  Fixed header
*******************/
if(document.getElementsByClassName('header__inner')[0]){
  window.onscroll = () => {
    const el = document.querySelector('.header__inner')
    const readyClass = 'header__state_ready'
    const fixedClass = 'header__state_fixed'
    if(document.documentElement.scrollTop > 110 || document.body.scrollTop > 110){
      el.classList.add(readyClass)
    }else{
      el.classList.remove(readyClass)
    }
    if(document.documentElement.scrollTop > 111 || document.body.scrollTop > 111){
      el.classList.add(fixedClass)
    }else{
      el.classList.remove(fixedClass)
    }
  }
}


/*******************
  Nav
*******************/
if(document.getElementsByClassName('header__nav_icon')[0]){
  const nav_el = document.querySelector('.header__nav_icon')
  const nav_state_class = 'header__nav_state_on'
  const nav_target_class = '.header__nav'
  const nav_close_class = '.header__nav_close'

  nav_el.addEventListener('click',()=>{
    if(document.querySelector('.'+ nav_state_class) == null){
      document.querySelector(nav_target_class).classList.add(nav_state_class)
    }else{
      document.querySelector(nav_target_class).classList.remove(nav_state_class)
    }
  },false)

  document.querySelector(nav_close_class).addEventListener('click',()=>{
    document.querySelector(nav_target_class).classList.remove(nav_state_class)
  },false)
}



/*******************
  Instagram
*******************/

if (document.getElementById('Instagram')) {
  const instagramInstance = new Vue({
    el: "#Instagram",
    components: {
      VueInstagram
    },
  })
}



/*******************
  posts
*******************/

if (document.getElementById('Posts')) {
  const postsInstance = new Vue({
    el: "#Posts",
    data() {
      return {
        posts: [],
      }
    },
    components: {
      list
    },
    mounted(){
      axios(BASEURL+'posts')
      .then( (res) =>{
        this.posts = res.data
      })
    },
  })
}

/*******************
  slider
*******************/

if (document.getElementById('Slider')) {
  const sliderInstance = new Vue({
    el: "#Slider",
    components: {
      Slick
    },
    data() {
      return {
        slickOptions: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '0px',
          autoplay: true,
          fade: true,
		    },
      }
    },
    mounted(){
    },
    methods: {
      next() {
        this.$refs.slick.next()
      },
      prev() {
        this.$refs.slick.prev()
      },
      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.slick.reSlick()
        })
      },
    },
  })
}


/*******************
  map
*******************/


if (document.getElementById('Map')) {
  const mapInstance = new Vue({
    el: "#Map",
    data() {
      return {
        lat: 34.6704542,
        lng: 135.5013464,
        zoom: 16,
        icon: THEME_URL + "/assets/mappin.png",
        geometry:{
          hue:'#111',       // 色
          gamma:0.1,        // ガンマ 0.01 ~ 10
          lightness:-70,    // 明度  -100 ~ 100
          saturation:-100,   // 彩度 -100 ~ 100
        },
        labels:{
          hue:'#ae9e74',       // 色
          gamma:1,        // ガンマ
          lightness:0,    // 明度
          saturation: -50, // 彩度
        }
      }
    },
    mounted(){
      let map
      let marker
      let center = {
        lat: Number(this.lat), // 緯度
        lng: Number(this.lng) // 経度
      }
      map = new google.maps.Map(document.getElementById('Map'), { // #sampleに地図を埋め込む
        center: center, // 地図の中心を指定
        zoom: this.zoom, // 地図のズームを指定
        disableDefaultUI: true,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [
              { hue: this.geometry.hue },
              { gamma: this.geometry.gamma },
              { lightness: this.geometry.lightness },
              { saturation: this.geometry.saturation },
            ],
          },
          {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
              { hue: this.labels.hue },
              { gamma: this.labels.gamma },
              { lightness: this.labels.lightness },
              { saturation: this.labels.saturation },
            ],
          },
        ]
      })
      marker = new google.maps.Marker({ // マーカーの追加
        position: center, // マーカーを立てる位置を指定
        map: map, // マーカーを立てる地図を指定
        icon: this.icon // マーカーのアイコン指定
      })
    },
  })
}

/*******************
  Single
*******************/

if (document.getElementById('singlePage')) {
  const singlePageInstance = new Vue({
    el: "#singlePage",
    components: {
      loader
    },
    data() {
      return {
        post: [],
      };
    },
    methods: {
      getImgUrl(data,imagesize){
        const imageSize = imagesize
        if(data._embedded && 
           data._embedded['wp:featuredmedia'] &&
           data._embedded['wp:featuredmedia'][0].media_details &&
           data._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize]){
          return data._embedded['wp:featuredmedia'][0].media_details.sizes[imagesize].source_url
        }else{
          return false
        }
      },
      postDate(flag) {
        const dateArray = this.post.date.split('-');
        const y = dateArray[0];
        const m = dateArray[1];
        const d = dateArray[2].split("T")[0];
        return flag ? y+m+d : y + "/" + m + "/" + d;
      }
    },
    mounted(){
      axios.get(BASEURL + 'posts/'+post_id+'?_embed')
      .then( (res) => {
        this.post = res.data
      })
    }
  })
}



if (document.getElementById('lightbox')) {
  const lightboxInstance = new Vue({}).$mount('#lightbox')
}


/*******************
  固定ページ上(全固定ページからRest APIへアクセス)
*******************/
if (document.getElementsByClassName('type_page')[0]) {
  const type_pageInstance = new Vue({
    el: ".type_page",
    data() {
      return {
        data: [],
      }
    },
    components:{
      //Lightbox
    },
    methods: {
      postDate(data,flag) {
        const dateArray = data.date.split('-');
        const y = dateArray[0];
        const m = dateArray[1];
        const d = dateArray[2].split("T")[0];
        return flag ? y+m+d : y + "年" + m + "月" + d + "日";
      },
      postFormat(data,dateflag){
        const dateFormat = moment(data.date).format(dateflag)
        return dateFormat;
      },
      getImgUrl(data,imagesize){
        if(data._embedded && 
           data._embedded['wp:featuredmedia'] &&
           data._embedded['wp:featuredmedia'][0].media_details &&
           data._embedded['wp:featuredmedia'][0].media_details.sizes[imagesize]){
          return data._embedded['wp:featuredmedia'][0].media_details.sizes[imagesize].source_url
        }else{
          return false
        }
      },
    },
    mounted(){
      //console.log(BASEURL + 'pages/' + page_id)
      axios.get(BASEURL + rest + id+'?_embed')
      .then( (res) => {
        //console.log(res.data)
        //this.datas = res.data[0]
        this.data = res.data
        this.$nextTick(()=>{
          // pictureCunstom('.casts__figure','min-height',0.832 )
        })
        // const dateFormat = moment('2018-10-06T05:00:29').format('YYYY.MM.DD')
        // console.log(dateFormat)
      })
    }
  })
}



/*******************
  Blog archive
*******************/

if(document.getElementsByClassName('blogs')){
  Array.from(document.getElementsByClassName('blogs')).map((x,i)=>{
    const blogsInstance = new Vue({
      el: ".blogs",
      data() {
        return {
          dataOrigin: [],
          datas: [],
          pager: 1,
          total: 1,
          pageTotal: 0,
          totalPosts: 0,
        };
      },
      methods: {
        Pager(n){
          this.pager = n
        },
        getPosts(page){
          const promise = new Promise((resolve, reject) => {
            axios.get(BASEURL + 'posts?_embed&page='+page)
            .then( (res) => {
              this.$nextTick(()=>{
                resolve(res.data)
              })
            })
          })
          return promise
        },
        description(data,length) {
          const text = data.content.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/\&nbsp\;/g,'')
          return text.length > length ? text.slice(0,length)+'…' : text
        },
        getImgUrl(data,imagesize){
          if(data._embedded && 
             data._embedded['wp:featuredmedia'] &&
             data._embedded['wp:featuredmedia'][0].media_details &&
             data._embedded['wp:featuredmedia'][0].media_details.sizes[imagesize]){
            return data._embedded['wp:featuredmedia'][0].media_details.sizes[imagesize].source_url
          }else{
            return false
          }
        },
        postDate(data,flag) {
          const dateArray = data.date.split('-');
          const y = dateArray[0];
          const m = dateArray[1];
          const d = dateArray[2].split("T")[0];
          return flag ? y+m+d : y + "年" + m + "月" + d + "日";
        },
      },
      mounted(){
        axios.get(BASEURL + 'posts?_embed&page=1')
        .then( (res) => {
          this.pageTotal  = res['headers']['x-wp-totalpages']
          this.dataOrigin = res.data
          this.datas = this.dataOrigin.slice(0,perPage)
          this.total = Math.ceil(res['headers']['x-wp-total'] / perPage)
          this.$nextTick(()=>{
            (async () => {
              for (var i = 2; i <= (this.pageTotal); i++) {
                const result = await this.getPosts(i)
                result.map((x)=>this.dataOrigin.push(x))
              }
            })()
          })
        })
      },
      watch: {
        pager() {
          let before = 0
          let after = 0
          before = this.pager==1 ? this.pager-1 : (this.pager-1)*perPage
          if(this.pager*perPage > this.dataOrigin.length){
            after = this.dataOrigin.length
          }else{
            after  = this.pager==1 ? this.pager*perPage : this.pager*perPage
          }
          this.datas = this.dataOrigin.slice(before,after)
        }
      }
    })
  })
}



/*******************
  archives
*******************/

if(document.getElementsByClassName('archives')[0]){
  Array.from(document.getElementsByClassName('archives')).map((x,i)=>{
    const archivesInstance = new Vue({
      el: ".archives",
      data() {
        return {
          dataOrigin: [],
          datas: [],
          dataBase: [],
          pager: 1,
          total: 1,
          category:[],
          searchCategory: [],
          flag: true,
          totalPost: 0,
          searchFlag: false,

          perPage: 0,
          post_type: "",
          taxonomy: "",
          query: "",
        }
      },
      methods: {
        Pager(n){
          this.$el.getElementsByClassName('content-pager__page')[this.pager-1].classList.remove('content-pager__page_active')
          this.pager = n
          this.$el.getElementsByClassName('content-pager__page')[this.pager-1].classList.add('content-pager__page_active')
        },
        getPosts(page){
          const promise = new Promise((resolve, reject) => {
            axios.get(BASEURL + this.post_type +'?_embed&page='+page+this.query)
            .then( (res) => {
              this.$nextTick(()=>{
                resolve(res.data)
              })
            })
          })
          return promise
        },
        description(data,length) {
          const text = data.content.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/\&nbsp\;/g,'')
          return text.length > length ? text.slice(0,length)+'…' : text
        },
        getImgUrl(data,imagesize){
          if(data._embedded && 
             data._embedded['wp:featuredmedia'] &&
             data._embedded['wp:featuredmedia'][0].media_details &&
             data._embedded['wp:featuredmedia'][0].media_details.sizes[imagesize]){
            return data._embedded['wp:featuredmedia'][0].media_details.sizes[imagesize].source_url
          }else{
            return false
          }
        },
        postDate(data,flag) {
          const dateArray = data.date.split('-');
          const y = dateArray[0];
          const m = dateArray[1];
          const d = dateArray[2].split("T")[0];
          return flag ? y+m+d : y + "年" + m + "月" + d + "日";
        },
      },
      mounted(){
        if(typeof this.$el.dataset.perpage !== 'undefined') this.perPage = this.$el.dataset.perpage
        // if(typeof this.$el.dataset.taxonomy !== 'undefined') this.taxonomy = this.$el.dataset.taxonomy
        if(typeof this.$el.dataset.post_type !== 'undefined') this.post_type = this.$el.dataset.post_type
        // if(typeof this.$el.dataset.query !== 'undefined') this.query = this.$el.dataset.query

        // if(this.taxonomy){
        //   axios.get(BASEURL + this.taxonomy + '?per_page=100')
        //   .then( (res) => {
        //     this.category = res.data.filter((x)=>{return x.name != "未分類"})
        //   })
        // }


        axios.get(BASEURL + this.post_type +'?_embed&page=1'+this.query)
        .then( (res) => {
          this.dataOrigin = res.data
          this.datas = this.dataOrigin.slice(0,this.perPage)
          this.total = Math.ceil(res['headers']['x-wp-total'] / this.perPage)
          this.totalPost = res['headers']['x-wp-total']
          this.$nextTick(()=>{
            (async () => {
              for (var i = 2; i <= (res['headers']['x-wp-totalpages']); i++) {
                const result = await this.getPosts(i)
                result.map((x)=>this.dataOrigin.push(x))
              }
              this.searchFlag = true
              if(!res.data.length) this.flag = false
              this.dataBase = this.dataOrigin
            })()
          })
        })

      },
      watch: {
        pager() {
          let before = 0
          let after = 0
          before = this.pager==1 ? this.pager-1 : (this.pager-1)*this.perPage
          if(this.pager*this.perPage > this.dataBase.length){
            after = this.dataBase.length
          }else{
            after  = this.pager==1 ? this.pager*this.perPage : this.pager*this.perPage
          }
          this.datas = this.dataBase.slice(before,after)
        },
        searchCategory() {
          if(this.dataBase.length > this.perPage){
            this.$el.getElementsByClassName('content-pager__page_active')[0].classList.remove('content-pager__page_active')
            this.pager = 1
            this.$el.getElementsByClassName('content-pager__page')[0].classList.add('content-pager__page_active')
          }
          if(this.searchCategory.length==0){
            this.dataBase = this.dataOrigin
            this.datas = this.dataBase.slice(0,this.perPage)
            this.total = Math.ceil(this.dataBase.length / this.perPage)
          }else{
            let tax = this.taxonomy
            this.dataBase = this.dataOrigin.filter((x)=>{
              let array1 = x[tax].concat(this.searchCategory)
              let array2 = Array.from(new Set(array1))
              return array1.length != array2.length
            })
            this.total = Math.ceil(this.dataBase.length / this.perPage)
            this.datas = this.dataBase.slice(0,this.perPage)
          }
          this.flag = this.datas.length ? true : false
        }
      }
    })
  })
}