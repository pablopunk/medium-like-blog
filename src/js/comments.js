import $ from 'jquery'

const commentHtml = comment => `
  <div class="comment">
    <div class="comment-name">${comment.name}</div>
    <p class="comment-content">${comment.content}</p>
  </div>
`

const inputErrorHtml = error => `<div>${error}</div>`

const inputErrorsHtml = errors => `<div class="alert alert-danger">${errors.map(e => inputErrorHtml(e)).join('')}</div>`

const validateName = name => /^[a-z ,.'-]+$/i.test(name)
const validateEmail = email => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
const validateContent = content => (content.split(' ').length <= 120 && !!content)

export default class {
  constructor (ui, model) {
    this.ui = ui
    this.model = model
  }

  init () {
    if (!$('#comments').length) {
      return
    }
    // listen to window scroll efficiently
    let scrollTimer
    $(window).on('scroll', ev => {
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }
      scrollTimer = setTimeout(() => { $(window).trigger('myScroll') }, 200)
    })
    // load comments and unbind scroll event
    $(window).on('myScroll', ev => {
      if ($('body').scrollTop() > ($('#comments').offset().top - $('#comments').height())) {
        this.reloadComments()
        $(window).off('scroll')
      }
    })
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

  validate (values, handleErrors) {
    let errors = []
    for (let input in values) {
      let value = values[input]
      switch (input) {
        case 'name':
          if (!validateName(value)) {
            errors.push('Name is invalid')
          }
          break
        case 'email':
          if (!validateEmail(value)) {
            errors.push('Email is invalid')
          }
          break
        case 'content':
          if (!validateContent(value)) {
            errors.push('Content can\'t be more than 120 words or empty')
          }
          break
        default:
          errors.push(`Unkown input ${input}`)
          break
      }
    }
    if (errors.length) {
      handleErrors(errors)
      return false
    }
    return true
  }

  showValidationErrors (errors) {
    $('.new-comment-errors').html(inputErrorsHtml(errors))
  }

  clearValidationErrors () {
    $('.new-comment-errors').html('')
  }

  clearForm () {
    $('.new-comment-form')[0].reset()
  }

  enableNewCommentButton () {
    $('.new-comment-button').prop('disabled', false)
  }

  handleForm (form) {
    $('.new-comment-button').prop('disabled', true)
    const name = $(form).find('#name').val()
    const email = $(form).find('#email').val()
    const content = $(form).find('#content').val()
    const comment = { name, email, content }
    this.clearValidationErrors()
    if (this.validate(comment, this.showValidationErrors)) {
      this.model.save(comment, () => {
        this.reloadComments()
        this.clearForm()
        this.enableNewCommentButton()
      }, () => {
        this.showValidationErrors(['There was an error posting the comment'])
      })
    } else {
      this.enableNewCommentButton()
    }
  }

  newCommentClicked (ev) {
    ev.preventDefault()
    this.handleForm(ev.target)
    return false
  }
}

