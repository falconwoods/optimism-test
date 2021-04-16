const fs = require('fs-extra')
const path = require('path')
const DeployCfgPath = path.resolve(__dirname, 'deploy-config.json')

exports.readDeployCfg = function () {
    let cfg = fs.readJsonSync(DeployCfgPath)
    return cfg
}

exports.writeDeployCfg = function (data) {
    fs.writeJsonSync(DeployCfgPath, data, { spaces: 4 })
}
