const preventDefault = (func) => (
  (e) => {
    e.preventDefault()
    func()
  }
)

export {
  preventDefault,
}
