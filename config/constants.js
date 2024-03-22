let constants = {
STATUS_CODES: {
    SUCCESS: 200,
    VALIDATION: 422,
    UNAUTHORIZED: 401,
    NOT_FOUND:404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    REQUEST_TIMEOUT: 408,
  }
};
module.exports = Object.freeze(constants);
