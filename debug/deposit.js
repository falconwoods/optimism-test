const hre = require('hardhat')
const {ethers} = hre
const util = require('../deploy/util')

const func = async ()=>{
    const [account1] = await ethers.getSigners()
    console.log(account1.address)

    let cfg = util.readDeployCfg()
    console.log(cfg)
    
    // approve
    let L1USDP = (await ethers.getContractAt('L1USDP', cfg.L1USDP)).connect(account1)
    let ret = await L1USDP.approve(cfg.L1USDPDeposit, ethers.BigNumber.from('1000000000000000000'),
      {
        gasPrice: ethers.BigNumber.from('0'),
        gasLimit: 8999999,
      })
    console.log('approve', cfg.L1USDPDeposit, ret.hash)

    // deposit
    let L1USDPDeposit = (await ethers.getContractAt('L1USDPDeposit', cfg.L1USDPDeposit)).connect(account1)
    ret = await L1USDPDeposit.deposit(account1.address, ethers.BigNumber.from('1000000000000000000'),
      {
        gasPrice: ethers.BigNumber.from('0'),
        gasLimit: 8999999,
      })
      console.log('deposit', account1.address, ret.hash)
}

func(hre)
