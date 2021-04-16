const { ethers, network } = require('hardhat')
const util = require('./util')

const func = async (hre) => { 
    const { deployments, getNamedAccounts } = hre
    const [account1] = await ethers.getSigners()
    let cfg = util.readDeployCfg()

    let L2USDP = await ethers.getContractAt('L2USDP', cfg.L2USDP)
    const signer = L2USDP.connect(account1)
    const ret = await signer.init(cfg.L2Messenger, cfg.L1USDPDeposit, {
      gasPrice: hre.ethers.BigNumber.from('0'),
      gasLimit: 8999999,
    })
    console.log('L2USDP Init:', ret.hash)
    console.log()
  }
  
  func.tags = ['L2USDPInit']
  // func.runAtTheEnd = true
  module.exports = func
  