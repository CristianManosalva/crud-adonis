'use strict'

class UserController {
  async login({ auth, request }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)

    return { message: 'Logged in sucessfully' }
  }

  show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return { message: 'You need be logged' }
    }
    return auth.user
  }
}

module.exports = UserController
