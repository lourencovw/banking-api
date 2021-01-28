'use strict'

class Store {
  get rules () {
    return {
      document: 'required|string|min:18|max:18|cnpj|unique:stores,document'
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(400).json({error: errorMessages});
	}
}

module.exports = Store
