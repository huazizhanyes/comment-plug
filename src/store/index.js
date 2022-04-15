import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 评论数量
    commentNum: 0,
    // 当前用户信息
    userInfo:{
      userId: 10086,
      nickName: 'huazizhanye',
      avatar: 'https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/avatat.jpg'
    },
    commentList: [
      {
        id: 1,
        isFirstLevel: 0,
        commentUser: {
          userId: 10086,
          nickName: 'huazizhanye',
          avatar: 'https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/avatat.jpg'
        },
        content: 'my name is huazizhanye',
        createDate: new Date().toLocaleDateString(),
        childrenList: [
          {
            id: 2,
            isFirstLevel: 1,
            commentUser: {
              userId: 10010,
              nickName: 'mqq',
              avatar: 'https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/mqq.jpg'
            },
            targetUser: {
              userId: 10086,
              nickName: 'huazizhanye',
              avatar: 'https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/avatat.jpg'
            },
            content: 'hello huazizhanye',
            createDate: new Date().toLocaleDateString()
          },
          {
            id: 3,
            commentUser: {
              userId: 10086,
              nickName: 'huazizhanye',
              avatar: 'https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/avatat.jpg'
            },
            targetUser: {
              userId: 10010,
              nickName: 'mqq',
              avatar: 'https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/mqq.jpg'
            },
            content: 'hello mqq~',
            createDate: new Date().toLocaleDateString(),
          }
        ]
      },
    ]
  },
  actions: {
    // 添加一级评论
    addCommentLevelOne({commit}, data) {
      commit('__addCommentLevelOne', data)
      commit('__getCommentNum')
    },
    // 添加二级评论
    addCommentLevelTwo({commit}, data) {
      commit('__addCommentLevelTwo', data)
    }
  },
  mutations: {
    // 添加一级评论
    __addCommentLevelOne(state,data) {
      console.log(data)
      state.commentList.unshift(data)
    },
    // 添加二级评论
    __addCommentLevelTwo(state,data) {
      console.log(state,data)
      if(state.commentList.findIndex(x => x.id === data.toCommentId) !== -1) {
          state.commentList.forEach(items => {
            if(items.id == data.toCommentId) {
              if (items.childrenList) {
                items.childrenList.push(data.dataList)
              } else {
                items.childrenList = []
                items.childrenList.push(data.dataList)
              }
            }
        })
      }
    },
    // 统计评论数量
    __getCommentNum(state) {
      state.commentNum = state.commentList.length
    }
  },
})
