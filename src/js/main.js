import $ from 'jquery'
import rest from './rest'
import UI from './ui'
import Comments from './comments'
import Likes from './likes'
import Time from './time'

const commentService = new rest('/comments')
const ui = new UI($('.comments'))
const comments = new Comments(ui, commentService)
const likes = new Likes($('.like'), window.localStorage)
const time = new Time($('.date'))
comments.init()
likes.init()
time.init()

// view (will move to another file)
const goToPost = () => (window.location.href = '/post.html')
const goBackButtonClicked = () => window.history.back()
const goTopButtonClicked = () => $('body').animate({scrollTop: 0}, 200)

// listeners (will move to another file)
$(document).on('click', '.post-title', goToPost)
$(document).on('click', '.post-img', goToPost)
$(document).on('click', '.go-back-button', goBackButtonClicked)
$(document).on('click', '.go-top', goTopButtonClicked)
$(document).on('click', '.like', ev => likes.clickedPost(ev))
$(document).on('submit', '.new-comment-form', ev => comments.newCommentClicked(ev))
