const hre = require('hardhat')
const {ethers} = hre
const util = require('../deploy/util')

const func = async ()=>{
    const [account1] = await ethers.getSigners()
    let cfg = util.readDeployCfg()
    
    // balance
    let L2USDP = (await ethers.getContractAt('L2USDP', cfg.L2USDP)).connect(account1)
    let ret = await L2USDP.balanceOf(account1.address);
    console.log('balance', account1.address, ret.toString())   
}

func(hre)
