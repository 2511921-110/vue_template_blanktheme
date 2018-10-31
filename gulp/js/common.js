export default {
  methods: {
    description(data,length) {
      const text = data.content.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/\&nbsp\;/g,'')
      return text.length > length ? text.slice(0,length)+'…' : text
      // return data.content.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/\&nbsp\;/g,'').slice(0,length)+'…'
    },
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
    postDate(data,flag) {
      const dateArray = data.date.split('-');
      const y = dateArray[0];
      const m = dateArray[1];
      const d = dateArray[2].split("T")[0];
      return flag ? y+m+d : y + "/" + m + "/" + d;
    },
  },
  props: {
    post: {
      type: [Array,Object],
      require: true
    },
    length: {
      type: Number,
      require: false,
      default: 100
    },
    imagesize: {
      type: String,
      default: "full"
    },
    moretext: {
      type: [String,Boolean],
      default: "詳しく見る"
    },
    show_description: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number
    },
    homeurl: {
      type: String,
      default: HOMEURL
    },
    themeurl: {
      type: String,
      default: THEME_URL
    }
  },
}