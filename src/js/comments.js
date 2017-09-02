import $ from 'jquery'

const commentHtml = comment => `
  <div class="comment">
    <div class="comment-name">${comment.name}</div>
    <p class="comment-content">${comment.content}</p>
  </div>
`

export default class {
  constructor (ui, model) {
    this.ui = ui
    this.model = model
  }

  init () {
    this.reloadComments()
  }

  reloadComments () {
    this.model.list(d => this.update(d), () => this.ui.setError())
  }

  update (comments) {
    if (!comments.length) {
      this.ui.setEmpty()
      return
    }
    let html = ''
    comments.map(c => html += commentHtml(c))
    this.ui.setIdealHtml(html)
    this.ui.setIdeal()
  }

  handleForm (form) {
    const name = $(form).find('#name').val()
    const email = $(form).find('#email').val()
    const content = $(form).find('#content').val()
    this.model.save({name, email, content}, () => this.reloadComments())
  }

  newCommentClicked (ev) {
    ev.preventDefault()
    this.handleForm(ev.target)
    return false
  }
}

