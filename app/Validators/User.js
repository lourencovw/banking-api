'use strict'

class User {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      cpf: 'required|string|min:14|max:14|cpf|unique:users,cpf',
      password: 'required|string'
    }
  }

  async fails(errorMessages) {
		return this.ctx.response.status(400).json({error: errorMessages});
	}
}

module.exports = User
