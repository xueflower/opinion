<template>
  <div class="hello">
    <textarea :id= "Id" :content="content" v-model="content"></textarea>
    <div class="btn-cont">
      <span @click="subArticalFn" class="active">确定</span>
      <span @click="returnBack">取消</span>
    </div>
  </div>
</template>

<script>
import './../../zh_CN.js'
import axios from 'axios'
export default {
    data () {
      const Id = Date.now()
      return {
        Id: Id,
        Editor: null,
        articalSet:this.$store.state.articalSet,
        content:'',
        DefaultConfig: {
          // GLOBAL
          height: 500,
          autoresize_bottom_margin: 50,
          autoresize_max_height: 500,
          // autoresize_min_height: '30.5rem',
          autoresize_on_init: true,
          theme: 'modern',
          menubar: false,
          branding:false,
          toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste | undo redo | fullscreen `,
          plugins: `
            paste
            importcss
            autoresize
            image
            code
            table
            advlist
            link
            media
            lists
            textcolor
            colorpicker
            hr
            preview
          `,


          // CONFIG

          forced_root_block: 'p',
          force_p_newlines: true,
          importcss_append: true,

         // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
          content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,

          insert_button_items: 'image link | inserttable',

          // CONFIG: Paste
          paste_retain_style_properties: 'all',
          paste_word_valid_elements: '*[*]',        // word需要它
          paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
          paste_webkit_styles: 'all',
          paste_merge_formats: true,
          nonbreaking_force_tab: false,
          paste_auto_cleanup_on_paste: false,

          // CONFIG: Font
          fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',

          // CONFIG: StyleSelect
          style_formats: [
            {
              title: '首行缩进',
              block: 'p',
              styles: { 'text-indent': '2em' }
            },
            {
              title: '行高',
              items: [
                {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
                {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
                {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
                {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
                {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
              ]
            }
          ],

          // FontSelect
          font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,

          // Tab
          tabfocus_elements: ':prev,:next',
          object_resizing: true,

          // Image
          imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
          images_upload_handler: function(blobInfo, success, failure) {
                var form = new FormData();
                form.append('ext', blobInfo.filename());
                form.append('url', blobInfo.blobUri());
                form.append('file', blobInfo.base64());
                // axios.post('http://192.168.7.6/wr/branches/dev/frontend/web/index.php/content/upload', form).
                axios.post('http://192.168.7.27/wr/branches/dev/frontend/web/index.php/content/upload', form).
                    then(res=> {
                      console.log(res);
                      success(res.data.data);

                    }).catch(res => {
                      console.log(res);
                      failure('上传失败')
                    });
            },
            //content/uploadsp
            file_picker_callback: function(callback, value, meta) {
                var that = this;
                //生成临时路径
                console.log(meta);
                function getObjectURL(file) {
                  var url = '';
                  if(window.createObjectURL != undefined) {
                    url = window.createObjectURL(file);
                  } else if(window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                  } else if(window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                  }
                  return url;
                }

                // var form = document.createElement('form');
                //
                // form.setAttribute('action','http://192.168.7.6/wr/branches/dev/frontend/web/index.php/content/uploadsp')
                //
                // form.setAttribute('method','post')
                // form.setAttribute('enctype','multipart/form-data');

                var input = document.createElement('input');

                input.setAttribute('type','file');

                input.onchange = function(e) {
                    console.log(e);
                    var file = this.files[0];
                    var url = getObjectURL(file);

                    console.log(file);
                    console.log(url);

                    var form = new FormData();

                    form.append('url',url);
                    form.append('ext', file.name);
                    form.append('file', '');

                    // axios.post('http://192.168.7.6/wr/branches/dev/frontend/web/index.php/content/uploadsp', form).
                    axios.post('http://192.168.7.27/wr/branches/dev/frontend/web/index.php/content/uploadsp', form).
                        then(res=> {
                          console.log(res);
                          if(res.data.error==0){
                            callback(res.data.data);
                          }
                        }).catch(err => {
                          console.log(err);
                          that.$layer.alert('上传失败!')
                        });
                };
                input.click();
            }
        }
      }
    },
    props: {
      value: {
        default: '',
        type: String
      },
      config: {
        type: Object,
        default: () => {
          return {
            theme: 'modern',
            height: 300
          }
        }
      }
    },

    mounted () {
      this.init();

    },
    beforeDestroy () {
      // 销毁tinymce
      this.$emit('on-destroy')
      window.tinymce.remove(`#${this.Id}`)
    },
    computed:{
      subUrl(){
        if(this.$store.state.editArticalId!=null){
          //修改文章的路径
          return this.$store.state.staticUrl+this.$store.state.editArticalUrl
        }else{
          return this.$store.state.staticUrl+this.$store.state.addArticalUrl
        }
      },
      articalId(){
        return this.$store.state.editArticalId
      },
      articalRequire(){
        return this.$store.state.articalRequire
      }
    },
    methods: {
       init () {
        const self = this
        this.Editor = window.tinymce.init({
          // 默认配置
          ...this.DefaultConfig,
          // prop内传入的的config
          ...this.config,
          // 挂载的DOM对象
          selector: `#${this.Id}`,
          setup: (editor) => {
            // 抛出 'on-ready' 事件钩子
            editor.on(
              'init', () => {
                self.loading = false
                self.$emit('on-ready')
                editor.setContent(self.value)
              }
            )
            // 抛出 'input' 事件钩子，同步value数据
            editor.on(
              'input change undo redo', () => {
                self.$emit('input', editor.getContent())
              }
            )
          }
        }).then(resolve=>{
          if(this.articalId!=null){
            tinyMCE.activeEditor.setContent(self.articalSet.content1)
          }
        })
      },
      subArticalFn(){
        var that = this;
        var content = tinyMCE.activeEditor.getContent() || tinyMCE.editors[0].getContent();
        // this.articalSet.content1 = content;
        var form = new FormData();

        form.append('title', this.articalSet.title);
        form.append('authority', this.articalSet.authority);
        form.append('zhaiyao',this.articalSet.zhaiyao);
        form.append('author', this.articalSet.author);
        form.append('type', this.articalSet.type);
        form.append('fenlei',this.articalSet.fenlei);
        form.append('content1', content);
        form.append('url', this.articalSet.url);
        form.append('pubdate',this.articalSet.pubdate);
        form.append('source_name',this.articalSet.source_name);
        form.append('set_neg', this.articalSet.set_neg);
        form.append('set_other', this.articalSet.set_other);
        form.append('set_alarm',this.articalSet.set_alarm);

        if(this.articalId!=null){
          form.append('id',this.articalId);
        }
        console.log(this.subUrl);
        axios.post(this.subUrl, form).
            then(res=> {
              console.log(res);
              if(res.data.error==0){
                  that.$layer.alert('成功！');
                  that.$store.commit('reGetMut')
                  that.$router.push('/home')
              }else if(res.data.error==2){
                that.$layer.alert('登录失效，请重新登录！');
                that.$router.push('/')
              }
            }).catch(res => {
              console.log(res);
              that.$layer.alert('失败！');
            });
      },
      returnBack(){
        history.go(-1);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn-cont{
  width:100%;
  height: 2rem;
  text-align: center;
  margin-top:2rem;
}
.btn-cont span{
  display:inline-block;
  width:4rem;
  height: 2rem;
  border-radius: 0.3rem;
  color:#333;
  font-size:1.1rem;
  line-height: 2rem;
  text-align: center;
  background:#ccc;
}
.btn-cont span:hover{
  cursor:pointer;
}
.btn-cont span.active{
  color:#fff;
  background:#FF7C1C;
}
</style>
