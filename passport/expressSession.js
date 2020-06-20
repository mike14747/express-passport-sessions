const session = (
    require('express-session')(
        {
            key: 'eps',
            secret: process.env.SESSION_SECRET,
            store: require('./sessionStore'),
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 2592000000, // 2592000000 is 30 days
                sameSite: true,
            },
        },
    )
);

module.exports = session;
