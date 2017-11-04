var Web3 = require("web3");
var fs = require("fs");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(web3.eth.accounts);
code = fs.readFileSync(".\\Voting.sol").toString();
solc = require("solc");
compiledCode = solc.compile(code);
console.log(code);
console.log(compiledCode.contracts[":Voting"].bytecode);
console.log(compiledCode.contracts[":Voting"].interface);
abiDefinition = JSON.parse(compiledCode.contracts[":Voting"].interface);
VotingContract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[":Voting"].bytecode;
deployedContract = VotingContract.new(["Rama", "Nick", "Jose"], {
  data: byteCode,
  from: web3.eth.accounts[0],
  gas: 3141592
});
console.log(deployedContract.address);

contractInstance = VotingContract.at(deployedContract.address);
console.log(contractInstance.totalVotesFor.call("Rama"));
