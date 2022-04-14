<template>
  <div id="app">
    <div>
      <comment
        @doSend="doSend($event)"
        @doChidSend="doChidSend(arguments)"
        :commentList="commentList"
        :commentNum="commentNum"
        :label="label"
        :avatar="avatar"
        :placeholder="placeholder"
        :minRows="minRows"
        :maxRows="maxRows"
        :isUseEmoj="true"
      ></comment>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import {mapState} from 'vuex'
export default {
  components: {
    Comment
  },
  data() {
    return {
      commentId: 10,
      label: 'SVIP',
      placeholder: '说点什么吧',
      minRows: 4,
      maxRows: 4,
      avatar: require('@/assets/img/icon/avtar.png'),
    }
  },
  computed: {
    ...mapState({
      // 从vuex里面取评论列表
      commentList: state => state.commentList,
      // 从vuex里面当前用户信息
      userInfo: state => state.userInfo,
      // 评论数量
      commentNum: state => state.commentNum
    })
  },
  mounted() {
    this.$store.commit('__getCommentNum')
  },
  methods: {
    doSend(content) {
      console.log('一级评论发送内容' + content)
      let data = {
        // 随机id 防止重复
        id: this.commentId++,
        // 一级评论
        isFirstLevel: 0,
        content: content,
        createDate: new Date().toLocaleDateString(),
        commentUser: this.userInfo
      }
      this.$store.dispatch('addCommentLevelOne', data)
    },
    doChidSend(e) {
      console.log(e)
      let data = {
        dataList: {
          // id: parseInt(Math.random()*100000000),
          id: this.commentId++,
          // 二级评论
          isFirstLevel: 1,
          // 暂时写死恢复评论的人
          commentUser: {
            userId: 10010,
            nickName: 'mqq',
            avatar: 'https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/mqq.jpg'
          },
          // 回复谁
          targetUser: {
            userId: e[1].userId,
            nickName: e[1].nickName,
            avatar: e[1].avatar,
          },
          content: e[0],
          createDate: new Date().toLocaleDateString()
        },
        // 要恢复的id
        toCommentId: e[2]
      }
      this.$store.dispatch('addCommentLevelTwo', data)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
