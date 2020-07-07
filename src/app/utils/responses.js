const successResponse = (message, data, res) => {
  console.log('########### INSIDE SUCCESS FUNCTION');
  return res.status(200).json({
    status: 'Success',
    message,
    data
  });
};

export {
  successResponse
};
