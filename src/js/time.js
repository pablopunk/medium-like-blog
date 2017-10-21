import moment from 'moment'
moment.locale('en')

const sec = 1000
const min = 60 * sec
const hour = 60 * min
const day = 24 * hour
const week = 7 * day

export default class {
  constructor (elements) {
    this.elements = elements
  }

  init (elements) {
    this.convertDates()
  }

  convertDates () {
    this.elements.map((i, e) =>
      (e.innerText = this.convertDate(e.innerText)))
  }

  convertDate (date) {
    const fullDate = moment(date, 'LLLL')
    const diff = moment().diff(fullDate)

    if (diff < min) {
      let ago = moment(diff).format('s')
      return `${ago} second${ago > 1 ? 's' : ''} ago`
    }
    if (diff < hour) {
      let ago = moment(diff).format('m')
      return `${ago} minute${ago > 1 ? 's' : ''} ago`
    }
    if (diff < day) {
      let ago = moment(diff).format('h')
      return `${ago} hour${ago > 1 ? 's' : ''} ago`
    }
    if (diff < week) {
      return `last ${moment(fullDate).format('dddd')}`
    }
    return moment(fullDate).format('LLLL')
  }
}
