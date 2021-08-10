const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb');
const logger = createLogger({
    transports: [
        new transports.MongoDB({
            level: 'info',
            db: `mongodb+srv://anjan:indian@anjan.cqixs.mongodb.net/netlify?retryWrites=true&w=majority`,
            options: {
                useUnifiedTopology: true
            },
            collection: 'logs',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'error',
            db: `mongodb+srv://anjan:indian@anjan.cqixs.mongodb.net/netlify?retryWrites=true&w=majority`,
            options: {
                useUnifiedTopology: true
            },
            collection: 'logs',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;