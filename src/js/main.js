import $ from 'jquery'

window.$ = window.jQuery = $

const postBoxClicked = () => window.location.href = '/post.html'

$(document).on('click', '.post-box', postBoxClicked)
