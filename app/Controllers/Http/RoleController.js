'use strict'

const Role = use('Adonis/Acl/Role')

class RoleController {
  async store({ request, response }) {
    try {
      const roleInfo = request.only(['name', 'slug', 'description'])
      const roleAdmin = new Role()
      roleAdmin.name = roleInfo.name
      roleAdmin.slug = roleInfo.slug
      roleAdmin.description = roleInfo.description
      await roleAdmin.save()
      response.status(202).json({ message: 'role creado con exito' })
    } catch (error) {
      console.log('error in store roleController \n', error)
      response.status(500).json({ message: 'internal server error' })
    }
  }

  async index({ request, response }) {
    try {
      let roles = await Role.query()
        .setVisible(['name', 'description'])
        .fetch()
      return response.status(500).json({ data: roles, message: 'roles listed' })
    } catch (error) {
      console.log('error in index roleController \n', error)
      response.status(500).json({ message: 'internal server error' })
    }
  }
}

module.exports = RoleController
