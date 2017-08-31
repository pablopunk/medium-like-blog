import $ from 'jquery'

export default class CommentsService {
  constructor (url = '/comments') {
    this.url = url
  }

  // comments list
  list (cb) {
    return $.get(this.url, cb)
  }

  // save a new comment or update an existing one
  save (comment, cb) {
    if (comment.id) {
      this.update(comment, cb)
    } else {
      this.create(comment, cb)
    }
  }

  // get comment with id
  get (id, cb) {
    return $.get(`${this.url}/${id}`, cb)
  }

  // create a new comment
  create (comment, cb) {
    return $.post(this.url, comment, cb)
  }

  // update an existing comment
  update (comment, cb) {
    return $.ajax({
      url: `${this.url}/${comment.id}`,
      data: comment,
      method: 'put'
    })
  }

  // delete a comment
  delete (id) {
    return $.ajax({
      url: `${this.url}/${id}`,
      method: 'delete'
    })
  }
}

