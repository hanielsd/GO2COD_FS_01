const { NotFoundError } = require('../errors/commonError')

class AppService {
  constructor(model) {
    this.model = model
  }

  async create(data, req) {
    const doc = await this.model.create(data)
    return doc.toObject()
  }

  async findById(id, req = {}) {
    let doc = this.model.findById(id)

    if (!doc) throw new NotFoundError('Document not found')

    let { populate } = req.query || {}
    if (populate) populate = Array.isArray(populate) ? populate : [populate]

    if (populate && populate.length > 0)
      populate.forEach((key) => (doc = doc.populate(key)))

    doc = await doc.lean()

    return doc
  }

  async findByIdAndPopulate(id, populate = []) {
    let doc = this.model.findById(id)
    populate.forEach((key) => (doc = doc.populate(key)))
    doc = doc.lean()

    if (!doc) {
      throw new Error('Document not found')
    }
    return doc
  }

  async findOne(condition, req) {
    const doc = await this.model.findOne(condition).lean()
    return doc
  }

  async findAll(req) {
    let { populate, ...filter } = req.query || {}

    if (populate) populate = Array.isArray(populate) ? populate : [populate]

    let docs = this.model.find(filter)
    if (populate && populate.length > 0)
      populate.forEach((key) => (docs = docs.populate(key)))
    docs = await docs.lean()
    return docs
  }

  async updateById(id, data) {
    const doc = await this.model
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .lean()
    if (!doc) {
      throw new Error('Document not found')
    }
    return doc
  }

  async deleteById(id) {
    const doc = await this.model.findByIdAndDelete(id).lean()
    if (!doc) {
      throw new Error('Document not found')
    }
    return doc
  }

  async insertMany(data, req) {
    const docs = await this.model.insertMany(data)
    return docs.map((doc) => doc.toObject())
  }

  async updateMany(filter, update, req) {
    const result = await this.model.updateMany(filter, update)
    return result
  }
}

module.exports = AppService
