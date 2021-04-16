
npx hardhat clean

npx hardhat deploy --network optimismEvm --tags L1USDP  --reset --write false
npx hardhat deploy --network optimism --tags L2USDP --reset --write false
npx hardhat deploy --network optimismEvm --tags L1USDPDeposit --reset --write false
npx hardhat deploy --network optimism --tags L2USDPInit --reset --write false

