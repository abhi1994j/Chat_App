
const genarateErrors = (message, error) => {
  return {
    success: false,
    message: message,
    error: error?.message || String(error)
  }
}

export { genarateErrors };
