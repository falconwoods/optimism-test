const util = require('./util')

const func = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  let cfg = util.readDeployCfg()

  let ret = await deploy('L1USDPDeposit', {
    from: deployer,
    args: [cfg.L1USDP, cfg.L2USDP, cfg.L1Messenger],
    gasPrice: hre.ethers.BigNumber.from('0'),
    gasLimit: 8999999,
    log: true
  })

  console.log("address:", ret.receipt.contractAddress)
    const address = ret.receipt.contractAddress
    if(!address || address.length == 0)
      throw 'deployed L1USDPDeposit address is empty'

  cfg.L1USDPDeposit = ret.receipt.contractAddress
  util.writeDeployCfg(cfg)

  console.log()
}

func.tags = ['L1USDPDeposit']
// func.dependencies = ['L2Deploy']
module.exports = func
