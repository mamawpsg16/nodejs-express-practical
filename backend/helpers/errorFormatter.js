// Helper function to format errors
export const formatValidationErrors = (errorsArray) => {
    return errorsArray.reduce((acc, error) => {
        if (!acc[error.path]) {
            acc[error.path] = [];
        }
        acc[error.path].push(error.msg);
        return acc;
    }, {});
};