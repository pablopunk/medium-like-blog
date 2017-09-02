import $ from 'jquery'

const defaultError = e => { throw new Error(e) }

export default class {
  constructor (url) {
    this.url = url
  }

  // items list
  list (cb, fail = defaultError) {
    return $.ajax({ url: this.url, success: cb, error: fail })
  }

  // save a new item or update an existing one
  save (item, cb, fail = defaultError) {
    if (item.id) {
      this.update(item, cb, fail)
    } else {
      this.create(item, cb, fail)
    }
  }

  // get item with id
  get (id, cb, fail = defaultError) {
    return $.ajax({ url: `${this.url}/${id}`, success: cb, error: fail })
  }

  // create a new item
  create (item, cb, fail = defaultError) {
    return $.ajax({ url: this.url, method: 'post', data: item, success: cb, error: fail })
  }

  // update an existing item
  update (item, cb, fail = defaultError) {
    return $.ajax({
      url: `${this.url}/${item.id}`,
      data: item,
      method: 'put',
      success: cb,
      error: fail
    })
  }

  // delete a item
  delete (id, cb, fail = defaultError) {
    return $.ajax({
      url: `${this.url}/${id}`,
      method: 'delete',
      success: cb,
      error: fail
    })
  }
}

