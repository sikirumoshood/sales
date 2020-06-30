const successResponse = (message, data, res) => res.status(200).json({
  status: 'Success',
  message,
  data
});

export {
  successResponse
};
