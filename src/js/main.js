import $ from 'jquery'

window.$ = window.jQuery = $

const postBoxClicked = () => (window.location.href = '/post.html')
const goBackButtonClicked = () => window.history.back()
const goTopButtonClicked = () => $('body').animate({scrollTop: 0}, 200)

$(document).on('click', '.post-box', postBoxClicked)
$(document).on('click', '.go-back-button', goBackButtonClicked)
$(document).on('click', '.go-top', goTopButtonClicked)
