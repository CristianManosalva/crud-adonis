'use strict'

const User = use('App/Models/User')

class UserController {
  async login({ auth, request }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)

    return { message: 'Logged in sucessfully' }
  }

  async index({ request, response }) {
    let users = await User.query()
      .setVisible(['username', 'email'])
      .fetch()
    return response.json(users)
  }

  async store({ request, response }) {
    try {
      const userInfo = request.only(['username', 'email', 'password'])
      const user = new User()
      user.username = userInfo.username
      user.email = userInfo.email
      user.password = userInfo.password
      await user.save()
      response.json({
        message: 'user created'
      })
    } catch (error) {
      console.log('Error in UserController\n', error)
      response.json({
        status: 500,
        message: 'internal server error'
      })
    }
  }

  show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return { message: 'You need be logged' }
    }
    return auth.user
  }
}

module.exports = UserController
