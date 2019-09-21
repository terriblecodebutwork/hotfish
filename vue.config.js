
const manifestJSON = require('./public/manifest.json')

module.exports = {
    pwa: {
        themeColor: manifestJSON.theme_color,
        workboxOptions: {
            runtimeCaching: [{
                urlPattern: new RegExp('https://genesis.bitdb.network/*'),
                handler: 'cacheFirst',
                options: {
                    cacheName: 'genesis',
                    expiration: {
                        maxEntries: 50
                    },
                    cacheableResponse: {
                        statuses: [0, 200]
                    }
                }
            },
            {
                urlPattern: new RegExp(`https://mom.planaria.network/*`),
                handler: "networkFirst",
                options: {
                    cacheName: 'mom'
                }
            }]
        }
    }
}