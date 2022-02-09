// https://eth-ropsten.alchemyapi.io/v2/JXJvKRmTojUytR8kpWW-PuozECq2cDUL

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/JXJvKRmTojUytR8kpWW-PuozECq2cDUL",
      accounts: [
        "e98b69ae5b36a8686d30c730826125e87ef9e47a70538a6cff96c8c55cbf4653",
      ],
    },
  },
};
