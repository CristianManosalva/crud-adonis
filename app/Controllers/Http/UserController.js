'use strict'

const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')

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

  async attachRole({ request, response }) {
    try {
      const attchInfo = request.only(['user_id', 'role_id'])
      const user = await User.findBy('id', attchInfo.user_id)
      console.log(
        '\n-------------------------\n',
        user,
        '\n-------------------------\n'
      )
      const role = await Role.findBy('id', attchInfo.role_id)
      await user.roles().attach([role.id])
      response.status(202).json({ message: 'role attached successfully' })
    } catch (error) {
      console.log('Error in UserController attach\n', error)
      response.json({
        status: 500,
        message: 'internal server error'
      })
    }
  }
}

module.exports = UserController
