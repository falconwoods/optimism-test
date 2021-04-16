## DESC

this project is aimed to test send token between two layers.

L1USDP is deployed in Layer1 as the Token in Layer1.

L1USDPDeposit is deployed in Layer1 as the proxy to send L1USDP to Layer2.

L2USDP is deployed in Layer2 to receive the L1USDP in Layer2.

## Init
```
yarn
```

## Optimism Docker
```
git@github.com:ethereum-optimism/optimism.git

commit fae4e29bd90d06ba68f7373dc98140c6a58ebc94
```

## Deployment
run the local docker and run the following command to deploy contracts in two layers.
```
./deploy.sh
```
the results looks like:
```
./deploy.sh
Compiling 15 files with 0.6.12
Compilation finished successfully
deploying "L1USDP" (tx: 0x59fde888bb0c9ebcac085237ce8dd9aa3b7a7ea8faa67ac40d992f8b6649a799)...: deployed at 0x36C02dA8a0983159322a80FFE9F24b1acfF8B570 with 2441224 gas

Nothing to compile
deploying "L2USDP" (tx: 0x6bf476e38a9f41c91ff2f59d328d36970e29c50a4f37acca7b5c35c86fd40cfe)...: deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 with 3504620 gas
address: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

Nothing to compile
deploying "L1USDPDeposit" (tx: 0x86a4f30085c5a16209ec57ab9f832bd7a8d4be72a4a1b1e1ba38e65c85e2f78b)...: deployed at 0x4c5859f0F772848b2D91F1D83E2Fe57935348029 with 486284 gas
address: 0x4c5859f0F772848b2D91F1D83E2Fe57935348029

Nothing to compile
L2USDP Init: 0x60875205b8243ff116ce4f2ae4f53c4917c16ba65f4e4c65a5d56f9ba63c7759
```

## Test
run following commands to call L1USDPDeposit.deposit() to send token to layer2.
and then check the balance of L2USDP in layer2.
if the balance is zero it means that the test failed.
```
./test.sh
```
the results looks like:
```
./test.sh
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
{
  L1Messenger: '0x68B1D87F95878fE05B998F19b66F4baba5De1aed',
  L2Messenger: '0x4200000000000000000000000000000000000007',
  L1USDP: '0x36C02dA8a0983159322a80FFE9F24b1acfF8B570',
  L1USDPDeposit: '0x4c5859f0F772848b2D91F1D83E2Fe57935348029',
  L2USDP: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
}
approve 0x4c5859f0F772848b2D91F1D83E2Fe57935348029 0x2a13bec660b7dfb655d22e1946f9e29e4389f589211310caf03e232a0d5c037b
deposit 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0x8635d6daab98a84aeaea6c7d1360c05e94fd057b45bd935a35ec1b8eb6497865
balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0
```

Notice: balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 **0**
