function getFirstMongooseError(error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message);

    return errors[0];   
}

exports.getErrorMessage = (error) => {
    switch (error.name) {
        case 'ValidationError':
            return getFirstMongooseError(error);
        case 'Error':
            return error.message;
        default:
            return error.message;
    }
}