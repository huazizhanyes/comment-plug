<template>
  <div class="hzzy-fa">
    <div class="hzzy-comm">
      <div class="comment-avatar" v-if="showAvatar">
        <avatar :avatar="avatar"></avatar>
      </div>
      <div class="comment" :style="{ width: commentWidth }">
        <textarea class="textarea_outhor" @focus="showButton(0)" maxlength="500" :placeholder="placeholder" v-model="textareaMap[0]"> </textarea>
        <div v-if="buttonMap[0]" class="hzzy-owo">
          <div v-if="isUseEmoj" :class="pBodyMap[0] ? 'OwO' : 'OwO OwO-open'" class="emoj publish" :style="{ width: emojiWidth }">
            <div class="OwO-logo" @click="pBodyStatus(0)">
              <span>Emoji</span>
            </div>
            <div class="OwO-body">
              <ul class="OwO-items OwO-items-show">
                <li class="OwO-item" v-for="(oitem, index) in OwOlist" :key="'oitem' + index" @click="choseEmoji(0, oitem.title)">
                  <img :src="require('@/assets/img/face/' + oitem.url)" alt="" />
                </li>
              </ul>
            </div>
          </div>
          <div class="publish publish-btn">
            <button class="btn" @click="doSend()">发送</button>
            <button @click="cancel(0)" class="btn btn-cancel">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="comm">
      <div class="su com-rep"></div>
      <div class="com-rep com-title">
        评论<span class="com-span">({{ commentNum }})</span>
      </div>
    </div>
    <div v-for="(item, index) in commentList" class="hzzy-child">
      <div class="reply"></div>
      <div class="content">
        <div class="comment-f">
          <avatar :avatar="item.commentUser.avatar ? item.commentUser.avatar : avatar"></avatar>
        </div>
        <div class="comment-f">
          <div>
            <div class="nickname author">
              {{ item.commentUser.nickName }}
            </div>
            <div class="date">
              {{ item.createDate }}
            </div>
          </div>
        </div>

        <div class="reply-content" v-html="analyzeEmoji(item.content)">
          {{ analyzeEmoji(item.content) }}
        </div>
        <div class="reply-content reply-fa">
          <div class="reply-font" @click="doReply(item.id)">
            <div><img src="@/assets/img/icon/reply.png" class="icon-reply" /><font class="icon-reply icon-hf">回复</font></div>
          </div>

          <div class="comment" :style="{ width: commentWidth }" v-if="replyMap[item.id]" :showAvatar="showAvatar">
            <textarea class="textarea_hf" @focus="showButton(item.id)" :placeholder="placeholder" v-model="textareaMap[item.id]"> </textarea>

            <div v-if="buttonMap[item.id]" class="hzzy-owo">
              <div v-if="isUseEmoj" :class="pBodyMap[item.id] ? 'OwO' : 'OwO OwO-open'" class="emoj publish" :style="{ width: emojiWidth }">
                <div class="OwO-logo" @click="pBodyStatus(item.id)">
                  <span>Emoji</span>
                </div>
                <div class="OwO-body">
                  <ul class="OwO-items OwO-items-show">
                    <li class="OwO-item" v-for="(oitem, index) in OwOlist" :key="'oitem' + index" @click="choseEmoji(item.id, oitem.title)">
                      <img :src="require('@/assets/img/face/' + oitem.url)" alt="" />
                    </li>
                  </ul>
                </div>
              </div>

              <div class="publish publish-btn">
                <button class="btn" @click="doChidSend(item.id, item.commentUser, item.id)">
                  发送
                </button>
                <button @click="cancel(item.id)" class="btn btn-cancel">
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="children" v-for="(ritem, jndex) in item.childrenList">
        <div class="reply"></div>
        <div class="content">
          <div class="comment-f">
            <avatar :avatar="ritem.commentUser.avatar ? ritem.commentUser.avatar : avatar"></avatar>
          </div>

          <div class="comment-f">
            <div>
              <div class="nickname author">
                {{ ritem.commentUser.nickName }}
              </div>
              <div class="date">
                {{ ritem.createDate }}
              </div>
            </div>
          </div>

          <div class="reply-content">
            <div class="cc cc-to">
              <a href="#">@{{ ritem.targetUser.nickName}}</a>
            </div>

            <div class="cc" v-html="analyzeEmoji(ritem.content)">
              {{ analyzeEmoji(ritem.content) }}
            </div>
          </div>

          <div class="reply-content reply-fa">
            <div class="reply-font" @click="doReply(ritem.id)">
              <div><img src="@/assets/img/icon/reply.png" class="icon-reply" /><font class="icon-reply icon-hf">回复</font></div>
            </div>

            <div class="comment" :style="{ width: commentWidth }" v-if="replyMap[ritem.id]" :showAvatar="showAvatar">
              <textarea class="textarea_hf" @focus="showButton(ritem.id)" :placeholder="placeholder" v-model="textareaMap[ritem.id]"> </textarea>

              <div v-if="buttonMap[ritem.id]" class="hzzy-owo">
                <div :class="pBodyMap[ritem.id] ? 'OwO' : 'OwO OwO-open'" class="emoj publish" :style="{ width: emojiWidth }">
                  <div class="OwO-logo" @click="pBodyStatus(ritem.id)">
                    <span>Emoji</span>
                  </div>
                  <div class="OwO-body">
                    <ul class="OwO-items OwO-items-show">
                      <li class="OwO-item" v-for="(oitem, index) in OwOlist" :key="'oitem' + index" @click="choseEmoji(ritem.id, oitem.title)">
                        <img :src="require('@/assets/img/face/' + oitem.url)" alt="" />
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="publish publish-btn">
                  <button class="btn" @click="doChidSend(ritem.id, ritem.commentUser, item.id)">
                    发送
                  </button>
                  <button @click="cancel(ritem.id)" class="btn btn-cancel">
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from './Avatar.vue'
import {emoji} from './emoji.js'
export default {
  props: {
    emojiWidth: {
      type: String,
      default: '560px'
    },
    showAvatar: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '在此输入评论内容...'
    },
    minRows: {
      type: Number,
      default: 4
    },
    maxRows: {
      type: Number,
      default: 8
    },
    commentNum: {
      type: Number,
      default: 0
    },
    authorId: {
      type: Number,
      default: 1
    },
    commentList: {
      type: Array,
      default: () => []
    },
    commentWidth: {
      type: String,
      default: '80%'
    },
    // 是否启用表情
    isUseEmoj: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      replyMap: [],
      buttonMap: [],
      pBodyMap: [],
      textareaMap: [],
      OwOlist: emoji
    }
  },
  components: {
    avatar
  },
  methods: {
    //事件处理器

    showButton(index) {
      this.$set(this.buttonMap, index, true)
    },
    cancel(index) {
      this.$set(this.buttonMap, index, false)
      if (index !== 0) {
        this.$set(this.replyMap, index, false)
      }
    },
    doSend() {
      // 一级评论发送事件
      this.$emit('doSend', this.textareaMap[0])
      this.$set(this.textareaMap, 0, '')
    },
    // 二级评论发送事件
    doChidSend(index, commentUserId, pid) {
      this.$emit('doChidSend', this.textareaMap[index], commentUserId, pid)
      this.$set(this.textareaMap, index, '')
    },

    //选择表情包
    choseEmoji: function(index, inner) {
      var con = ''
      if (!this.textareaMap[index]) {
        this.$set(this.textareaMap, index, '')
      }
      con = this.textareaMap[index] += '[' + inner + ']'
      this.$set(this.textareaMap, index, con)
    },
    analyzeEmoji: function(cont) {
      //编译表情替换成图片展示出来
      var pattern1 = /\[[\u4e00-\u9fa5]+\]/g
      var pattern2 = /\[[\u4e00-\u9fa5]+\]/
      var content = cont.match(pattern1)
      var str = cont
      if (content) {
        for (var i = 0; i < content.length; i++) {
          for (var j = 0; j < this.OwOlist.length; j++) {
            if ('[' + this.OwOlist[j].title + ']' == content[i]) {
              var src = this.OwOlist[j].url
              break
            }
          }
          var s = require('@/assets/img/face/' + src)
          var imoj = "<img src='" + s + "'/>"

          str = str.replace(pattern2, imoj)
        }
      }
      return str
    },
    doReply(index) {
      this.$set(this.replyMap, index, true)
      console.log(this.replyMap[index])
    },

    pBodyStatus(index) {
      this.$set(this.pBodyMap, index, !this.pBodyMap[index])
    }
  }
}
</script>
<style type="text/css" scoped>
.comment {
  display: inline-block;
  vertical-align: top;
}
.comment-avatar {
  display: inline-block;
  vertical-align: top;
}
.emoj {
  /*width: 560px;*/
}
.publish {
  margin-top: 10px;
  margin-right: 131px;
  display: inline-block;
  vertical-align: top;
}
.publish-btn {
  float: right;
}
.textarea_outhor{
  padding: 10px;
  box-sizing: border-box;
  color: #363d4c;
  border: 1px solid #999;
  border-radius: 10px;
  font-size: 16px;
  width: 99%;
  height: 80px;
}
.textarea_hf{
  padding: 10px;
  box-sizing: border-box;
  color: #363d4c;
  border: 1px solid #999;
  border-radius: 10px;
  font-size: 16px;
  width: 80%;
  height: 60px;
}
.btn {
  width: 70px; /* 宽度 */
  margin-top: 3px;
  height: 30px; /* 高度 */
  border-width: 0px; /* 边框宽度 */
  border-radius: 3px; /* 边框半径 */
  background: #3cb371; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: white; /* 字体颜色 */
  font-size: 13px; /* 字体大小 */
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
}
.btn-cancel {
  background: grey; /* 背景颜色 */
}

.tmsgBox {
  position: relative;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.tmsg-respond h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}
.tmsg-respond h3 small {
  font-size: smaller;
  cursor: pointer;
}
.tmsg-respond textarea {
  background: #f4f6f7;
  height: 100px;
  margin-bottom: 10px;
}

.OwO {
  position: relative;
  z-index: 1;
}
.OwO .OwO-logo {
  position: relative;
  border-radius: 4px;
  color: #444;
  display: inline-block;
  background: #fff;
  border: 1px solid #ddd;
  font-size: 13px;
  padding: 0 6px;
  cursor: pointer;
  height: 30px;
  box-sizing: border-box;
  z-index: 2;
  line-height: 30px;
}
.OwO .OwO-logo:hover {
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body {
  width: 50%;
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  z-index: 1;
  top: 29px;
  border-radius: 0 4px 4px 4px;
  display: none;
}
.OwO-open .OwO-body {
  display: block;
}
.OwO-open .OwO-logo {
  border-radius: 4px 4px 0 0;
  border-bottom: none;
}
.OwO-open .OwO-logo:hover {
  animation: none;
  -webkit-animation: none;
}
.OwO .OwO-items {
  max-height: 197px;
  overflow: scroll;
  font-size: 0;
  padding: 10px;
  z-index: 1;
}
.OwO .OwO-items .OwO-item {
  background: #f7f7f7;
  padding: 5px 3px;
  border-radius: 5px;
  display: inline-block;
  margin: 0 10px 12px 0;
  transition: 0.3s;
  line-height: 19px;
  font-size: 20px;
  cursor: pointer;
}
.OwO .OwO-items .OwO-item:hover {
  background: #eee;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body .OwO-bar {
  width: 5%;
  height: 30px;
  border-top: 1px solid #ddd;
  background: #fff;
  border-radius: 0 0 4px 4px;
  color: #444;
}
.OwO .OwO-body .OwO-bar .OwO-packages li {
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  margin-right: 3px;
  text-align: center;
}
.OwO .OwO-body .OwO-bar .OwO-packages li:first-of-type {
  border-radius: 0 0 0 3px;
}
/*用户输入表单*/
.tmsg-r-info {
  margin: 10px 0;
}
.tmsg-r-info textarea {
  height: 30px;
  border-radius: 4px;
  background: #f4f6f7;
}
.tmsg-r-info .info-submit {
  margin: 10px 0;
  text-align: center;
}
.tmsg-r-info .info-submit p,
.tmsg-commentshow h1 {
  /*background: #97dffd;*/
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  /*transition: all .3s ease-in-out;*/
  height: 30px;
  line-height: 30px;
  text-align: center;
}
/*.tmsg-r-info .info-submit p:hover{
    background: #47456d;
}*/
/*评论列表*/
.tmsg-comments .tmsg-comments-tip {
  display: block;
  border-left: 2px solid #363d4c;
  padding: 0 10px;
  margin: 40px 0;
  font-size: 20px;
}
.tmsg-commentlist {
  margin-bottom: 20px;
}
.tmsg-commentshow > .tmsg-commentlist {
  border-bottom: 1px solid #e5eaed;
}
.tmsg-c-item {
  border-top: 1px solid #e5eaed;
}
.tmsg-c-item article {
  margin: 20px 0;
}
.tmsg-c-item article header {
  margin-bottom: 10px;
}
.tmsg-c-item article header img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  float: left;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  margin-right: 15px;
  object-fit: cover;
}
.tmsg-c-item article header img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}
.tmsg-c-item article header .i-name {
  font-size: 14px;
  margin: 5px 8px 7px 0;
  color: #444;
  font-weight: bold;
  display: inline-block;
}
.tmsg-c-item article header .i-class {
  display: inline-block;
  margin-left: 10px;
  background: #dff0d8;
  color: #3c763d;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 400;
}
.tmsg-c-item article header .i-time {
  color: #aaa;
  font-size: 12px;
}
.tmsg-c-item article section {
  margin-left: 80px;
}
.tmsg-c-item article section p img {
  vertical-align: middle;
}
.tmsg-c-item article section .tmsg-replay {
  margin: 10px 0;
  font-size: 12px;
  color: #64609e;
  cursor: pointer;
}
.hzzy-owo {
  text-align: left;
}
.comm {
  padding: 20px;
}
.su {
  margin-top: 2px;
  width: 5px;
  height: 23px;
  background: #0bbfed; /*#1E90FF*/
}
.com-rep {
  display: inline-block;
  vertical-align: top;
}
.com-title {
  font-size: 20px;
  margin-left: 5px;
}
.com-span {
  font-size: 16px;
}
.hzzy-fa {
  text-align: left;
}
.hzzy-comm {
  padding: 40px;
}

.reply {
  border-top: solid 1px #d9d9d9;
}
.content {
  margin-top: 20px;
  margin-bottom: 20px;
}
.comment-f {
  display: inline-block;
  vertical-align: top;
}
.nickname {
  font-size: 14px;
}
.author {
  display: inline-block;
}
.icon {
  margin-left: 2px;
  background: #f6b80e;
  color: #eb3510;
  border-radius: 5px;
  padding: 1px 4px;
  font-size: 10px;
  font-weight: 600px;
}
.date {
  font-size: 12px;
  margin-top: 5px;
  color: grey;
}
.reply-content {
  word-wrap: break-word;
  width: 90%;
  font-size: 15px;
  line-height: 25px;
  margin-left: 56px;
}

.reply-fa {
  margin-top: 5px;
}
.reply-font {
  margin-bottom: 5px;
  color: grey;
  cursor: pointer;
}
.children {
  padding-left: 40px;
}
.cc {
  display: inline-block;
}
.cc-to a {
  text-decoration: none;
  color: #409eff;
  margin-right: 4px;
}
.icon-reply {
  display: inline-block;
  vertical-align: top;
}

.icon-hf {
  margin-top: 2px;
}
.hzzy-child {
  padding: 20px;
}
</style>
