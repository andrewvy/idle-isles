export default class CircularBuffer {
  constructor (maxElements) {
    this.maxElements = maxElements
    this.elements = []
  }

  push (element) {
    if (this.elements.length > this.maxElements) {
      this.elements.shift()
    }

    this.elements.push(element)

    return this
  }

  map (cb) {
    return this.elements.map(cb)
  }

  toArray () {
    return this.elements
  }
}
