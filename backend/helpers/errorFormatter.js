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

export const joiFormatValidationErrors = (errorsArray) => {
    return errorsArray.reduce((acc, error) => {
        const field = error.path.join('.'); // Convert path array to string
        console.log(error.path,"error.path");
        console.log(error.path.join('.'),"error.path");
        if (!acc[field]) {
            acc[field] = [];
        }
        acc[field].push(error.message);
        return acc;
    }, {});
};
