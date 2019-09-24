
const manifestJSON = require('./public/manifest.json')

module.exports = {
    pwa: {
        themeColor: manifestJSON.theme_color,
        workboxOptions: {
            runtimeCaching: [
                {
                    urlPattern: new RegExp('^https://genesis.bitdb.network/'),
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'genesis'
                    }
                },
                {
                    urlPattern: new RegExp(`^https://mom.planaria.network/`),
                    handler: "staleWhileRevalidate",
                    options: {
                        cacheName: 'mom'
                    }
                },
                {
                    urlPattern: new RegExp(`^https://bob.planaria.network/`),
                    handler: "staleWhileRevalidate",
                    options: {
                        cacheName: 'bob'
                    }
                }]
        }
    }
}