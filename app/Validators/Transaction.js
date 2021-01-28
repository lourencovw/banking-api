'use strict'

class Transaction {
  get rules () {
    return {
      document: 'required|string|min:18|max:18|cnpj|exists:stores,document',
      amount: 'required|number'
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(400).json({error: errorMessages});
	}
}

module.exports = Transaction
