const util = require('./util')
const { ethers, network } = require('hardhat')
const chai = require('chai')
const { solidity } = require('ethereum-waffle')
const chaiAsPromised = require('chai-as-promised')
const { expect } = chai

chai.use(chaiAsPromised)
chai.use(solidity)

describe(`L1USDPDeposit`, () => {

  it(`equal`, async () => {
    const [account1, account2] = await ethers.getSigners()
    let cfg = util.readDeployCfg()
    
    let L1USDP = (await hre.ethers.getContractAt('L1USDP', cfg.L1USDP)).connect(account1)
    
    // approve
    await L1USDP.approve(cfg.L1USDPDeposit, hre.ethers.BigNumber.from('1000000000000000000'),
      {
        gasPrice: hre.ethers.BigNumber.from('0'),
        gasLimit: 8999999,
      })

    // deposit
    let L2USDPDeposit = (await hre.ethers.getContractAt('L2USDPDeposit', cfg.L2USDPDeposit)).connect(account1)
    await L1USDP.deposit(account1.address, hre.ethers.BigNumber.from('1000000000000000000'),
      {
        gasPrice: hre.ethers.BigNumber.from('0'),
        gasLimit: 8999999,
      })

    
    
  })

})
