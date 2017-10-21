import $ from 'jquery'

export default class {
  constructor (elements, storage, $) {
    this.elements = elements
    this.storage = storage
  }

  init () {
    this.updateLikesInView()
  }

  updateLikesInView () {
    this.elements.map((i, e) => this.setPostLikes(e, this.getLikes(e.dataset.post)))
  }

  setPostLikes (element, n = 0) {
    $(element).prev().text(n)
  }

  getLikes (id) {
    return parseInt(this.storage.getItem(`likes-${id}`) || 0)
  }

  saveLikes (id, n) {
    this.storage.setItem(`likes-${id}`, n)
  }

  clickedPost (ev) {
    const id = ev.target.dataset.post
    this.saveLikes(id, this.getLikes(id) + 1)
    this.updateLikesInView()
  }
}
