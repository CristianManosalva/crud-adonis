'use strict'

const User = use('App/Models/User')

class AuthController {
  async login({ request, auth, response }) {
    try {
      const email = request.input('email')
      const password = request.input('password')
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        response.json({ user: user, access_token: accessToken })
      }
    } catch (error) {
      console.log('Error authController.login\n', error)
      response.json({ message: 'usuario o contraseña incorrecta' })
    }
  }
}

module.exports = AuthController
