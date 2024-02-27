class NotFoundError extends Error {
  constructor(recourceType, id) {
    super(`${recourceType} with id ${id} not found`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
