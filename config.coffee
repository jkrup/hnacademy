
module.exports =
    projectName: process.env.PROJECT_NAME || require('path').basename(__dirname)
    env: process.env.NODE_ENV || 'development'

    mongoUrl: process.env.MONGO_URL ? "mongodb://localhost/hnacatmp"

    http:
        port: process.env.PORT || 3000
        host: process.env.BIND_IP || '0.0.0.0'

    logFormat: ':date-padded :remote-addr-padded :method-padded :url -> :status (:res[content-length] bytes in :response-time ms) ":referrer" ":user-agent"'
    trustProxy: JSON.parse(process.env.TRUST_PROXY || "1") # Trust first proxy (nginx)

    uploadcarePublicKey: process.env.UPLOADCARE_PK ? '6b06fff8eba850ac558b99043a26b00b1cc2db05694031a1f82dd4d738b08a8c'
    uploadcareSecretKey: process.env.UPLOADCARE_SK ? '5a9a8b8444950fec110239911b61c05056a422538538e33268c8c86858a4f92e'
    uploadcareScript: process.env.UPLOADCARE_SCRIPT ? "//ucarecdn.com/widget/0.16.0/uploadcare/uploadcare-0.16.0.min.js"
