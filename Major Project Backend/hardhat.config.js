require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.1",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/up3jQUJgt3di2Z0FPaexBq2FQXILunaL",
      accounts: [
        "e98b69ae5b36a8686d30c730826125e87ef9e47a70538a6cff96c8c55cbf4653",
      ],
    },
  },
};
