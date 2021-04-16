const util = require('./util')

const func = async (hre) => {
    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
  
    const name = 'L2USDP'
    const symbol = 'L2USDP'
  
    let ret = await deploy('L2USDP', {
      from: deployer,
      args: [name, symbol],
      gasPrice: hre.ethers.BigNumber.from('0'),
      gasLimit: 8999999,
      log: true
    })

    console.log("address:", ret.receipt.contractAddress)
    const address = ret.receipt.contractAddress
    if(!address || address.length == 0)
      throw 'deployed L2USDP address is empty'

    let cfg = util.readDeployCfg()
    cfg.L2USDP = ret.receipt.contractAddress
    util.writeDeployCfg(cfg)

    console.log()
  }
  
  func.tags = ['L2USDP']
  module.exports = func
  