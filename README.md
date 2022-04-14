# comment-plug
vue + vuex + elementUi 实现评论以及评论回复模块(可发送表情)
具体使用步骤
## 下载依赖
```
npm install
```

## 启动项目
```
npm run dev
```

## 评论列表--参数介绍
|  参数   | 介绍  | 类型  |
|  ----  | ----  | ---- |
| id  | 评论列表id(唯一) | Number |
| userId  | 用户登录后的唯一id | Number |
| nickName  | 用户名 | string |
| avatar  | 用户头像 | string |
| userInfo  | 当前用户信息 | Object |
| content  | 回复内容 | string |
| createDate  | 回复时间 | Object |
| commentList  | 评论列表 | Array |
| childrenList  | 评论回复列表 | Array |
| isFirstLevel  | 一级或二级评论 | Number |

### 评论列表--childrenList具体参数介绍
|  参数   | 介绍  | 类型  |
|  ----  | ----  | ---- |
| id  | 评论列表id(唯一) | Number |
| commentUser  | 当前回复的用户 | Object |
| targetUser  | 当前将要回复的用户 | Object |
| childrenList  | 评论回复列表 | Array |
| isFirstLevel  | 一级或二级评论 | Number |
| content  | 回复内容 | string |
| createDate  | 回复时间 | Object |

## 组件参数介绍
|  参数   | 介绍  | 默认  |
|  ----  | ----  | ---- |
| emojiWidth  | 表情框宽 | 560px |
| showAvatar  | 是否展示头像 | true |
| isUseEmoj  | 是否启用表情 | true |
| commentNum  | 评论数量 | 0 |

## 具体步骤移步博客查看
See [猿前端](http://blog.hzzy.xyz).
