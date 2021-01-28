'use strict'

class Login {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|string'
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(400).json({error: errorMessages});
	}
}

module.exports = Login
