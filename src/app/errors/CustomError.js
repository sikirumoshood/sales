class CustomError extends Error {
  constructor(msg, data) {
    super(msg);
    this.data = data;
  }
}
export default CustomError;
