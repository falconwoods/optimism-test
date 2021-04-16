const util = require('./util')


const func = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const initialSupply = 1000000
  const name = 'L1USDP'

  const [account1] = await ethers.getSigners()

  let ret = await deploy('L1USDP', {
    from: deployer,
    args: [initialSupply, name],
    gasPrice: hre.ethers.BigNumber.from('0'),
    gasLimit: 8999999,
    log: true
  })

  let cfg = util.readDeployCfg()
  cfg.L1USDP = ret.receipt.contractAddress
  util.writeDeployCfg(cfg)

  let L1USDP = await hre.ethers.getContractAt('L1USDP', cfg.L1USDP)
  const signer = L1USDP.connect(account1)
  const ret1 = await signer.mint(account1.address, hre.ethers.BigNumber.from('1000000000000000000000'),
  {
    gasPrice: hre.ethers.BigNumber.from('0'),
    gasLimit: 8999999,
  })

  console.log()
}

func.tags = ['L1USDP']
module.exports = func
