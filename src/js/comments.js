
export default class {
	constructor (ui, model) {
		this.ui = ui
		this.model = model
	}

	init () {
		this.model.list(d => this.update(d)).fail(this.ui.setError)
	}

	update (comments) {
		if (!comments.length) {
			this.ui.setEmpty()
			return
		}
		this.ui.setIdealHtml('')
		this.ui.setIdeal()
	}
}

