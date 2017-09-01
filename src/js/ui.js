export default class {
  constructor (element) {
    this.element = element
    this.states = ['empty', 'loading', 'error', 'partial', 'ideal']
  }

  getClasses () {
    return this.states.reduce((previous, current) => `${previous} ${current}`)
  }

  setEmpty () {
    return this.element.removeClass(this.getClasses()).addClass('empty')
  }

  setLoading () {
    return this.element.removeClass(this.getClasses()).addClass('loading')
  }

  setPartial () {
    return this.element.removeClass(this.getClasses()).addClass('partial')
  }

  setError () {
    return this.element.removeClass(this.getClasses()).addClass('error')
  }

  setIdeal () {
    return this.element.removeClass(this.getClasses()).addClass('ideal')
  }

  setEmptyHtml (html) {
    return this.element.find('.ui-status.empty').html(html)
  }

  setLoadingHtml (html) {
    return this.element.find('.ui-status.loading').html(html)
  }

  setPartialHtml (html) {
    return this.element.find('.ui-status.partial').html(html)
  }

  setErrorHtml (html) {
    return this.element.find('.ui-status.error').html(html)
  }

  setIdealHtml (html) {
    return this.element.find('.ui-status.ideal').html(html)
  }
}

