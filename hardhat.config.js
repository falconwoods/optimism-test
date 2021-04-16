require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')
require('hardhat-deploy')
require('@eth-optimism/plugins/hardhat/compiler')

module.exports = {
  networks: {
    hardhat: {
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk'
      }
    },
    optimism: {
      url: 'http://127.0.0.1:8545',
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk'
      },
      gasPrice: 0,
      ovm: true // this set the network as using the ovm and ensure contract will be compiled against that.
    },
    optimismEvm: {
      url: 'http://127.0.0.1:9545',
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk'
      },
      gasPrice: 0,
      ovm: false // this set the network as using the ovm and ensure contract will be compiled against that.
    }
  },
  solidity: '0.6.12',
  ovm: {
    solcVersion: '0.6.12'
  },
  namedAccounts: {
    deployer: 0
  }
}
