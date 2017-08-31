import $ from 'jquery'
import CommentService from './commentService'
import UI from './ui'
import Comments from './comments'

window.$ = window.jQuery = $

const save = (name, val) => window.localStorage.setItem(name, val)
const load = name => window.localStorage.getItem(name)
const loadLikes = id => parseInt(load(`likes-${id}`) || 0)
const saveLikes = (id, val) => save(`likes-${id}`, val)
const goToPost = () => (window.location.href = '/post.html')
const goBackButtonClicked = () => window.history.back()
const goTopButtonClicked = () => $('body').animate({scrollTop: 0}, 200)
const likePostClicked = ev => {
  saveLikes(ev.target.dataset.post, loadLikes(ev.target.dataset.post) + 1)
  loadPostLikes()
}
const getPostIds = () => {
  const objs = $('.like').map((i, e) => e.dataset.post)
  let array = []
  for (const o of objs) {
    array.push(o)
  }
  return array
}
const setPostLikes = (id, n = 0) => $(`.like[data-post=${id}]`).prev().text(n)
const loadPostLikes = () => getPostIds().map((id, i) => setPostLikes(id, loadLikes(id)))

loadPostLikes()

$(document).on('click', '.post-title', goToPost)
$(document).on('click', '.post-img', goToPost)
$(document).on('click', '.go-back-button', goBackButtonClicked)
$(document).on('click', '.go-top', goTopButtonClicked)
$(document).on('click', '.like', likePostClicked)

const commentService = new CommentService()
const ui = new UI('.comments')
const comments = new Comments(ui, commentService)

comments.init()
