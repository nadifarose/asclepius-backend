const clientError = require("../exceptions/clientError");
 
class inputError extends clientError {
    constructor(message) {
        super(message);
        this.name = 'InputError';
    }
}
 
module.exports = inputError;