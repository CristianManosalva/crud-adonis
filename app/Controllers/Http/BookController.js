'use strict'

const Book = use('App/Models/Book')
const ResourceNotFoundException = use(
  'App/Exceptions/ResourceNotFoundException'
)

class BookController {
  async index({ request, response }) {
    try {
      let books = await Book.query()
        .with('user')
        .fetch()
      return response.json(books)
    } catch (error) {
      console.log(error)
      response.status(404).json({ message: 'Permiso denegado' })
    }
  }

  async store({ request, response }) {
    try {
      const title = request.input('title')
      const isbn = request.input('isbn')
      const publisher_name = request.input('publisher_name')
      const user_id = request.input('user_id')

      const book = new Book()
      book.title = title
      book.isbn = isbn
      book.publisher_name = publisher_name
      book.user_id = user_id

      await book.save()

      return response.json({ message: 'Book created', data: book })
    } catch (error) {
      console.log('we have one error \n', error)
      response.json({ message: 'error' })
    }
  }

  async update({ params, request, response }) {
    const title = request.input('title')
    const isbn = request.input('isbn')
    const publisher_name = request.input('publisher_name')
    const user_id = request.input('user_id')

    let book = await Book.find(params.id)

    if (!book) {
      //return response.status(404).json({ message: 'book not found' })
      throw new ResourceNotFoundException()
    }

    book.title = title
    book.isbn = isbn
    book.publisher_name = publisher_name
    book.user_id = user_id
    await book.save()

    response.json({ message: 'Book updated', data: book })
  }

  async destroy({ params, request, response }) {
    await Book.find(params.id).delete()
    return response.json({ message: 'Book deleted!' })
  }
}

module.exports = BookController
