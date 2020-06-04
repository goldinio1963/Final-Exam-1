function errorHandler(error, req, res) {
    switch(error){
        case 406:
            return res.status(406).end();
            break;
        case 409:
            return res.status(409).end();
            break;
        case 403:
            return res.status(403).end();
            break;
        case 404:
            return res.status(404).end();
            break;
        case 500:
            return res.status(500).end();
            break;
    }
}

module.exports = errorHandler;