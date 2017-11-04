var Web3 = require("web3");
var fs = require("fs");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(web3.eth.accounts);
code = fs.readFileSync(".\\HelloWorld.sol").toString();
solc = require("solc");
compiledCode = solc.compile(code);
console.log(code);
console.log(compiledCode.contracts[":HelloWorld"].bytecode);
console.log(compiledCode.contracts[":HelloWorld"].interface);
abiDefinition = JSON.parse(compiledCode.contracts[":HelloWorld"].interface);
VotingContract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[":HelloWorld"].bytecode;
deployedContract = VotingContract.new(null, {
  data: byteCode,
  from: web3.eth.accounts[0],
  gas: 3141592
});
console.log(deployedContract.address);

contractInstance = VotingContract.at(deployedContract.address);
console.log(contractInstance.return6.call());
