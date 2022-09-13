require("dotenv").config()
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")

// const JSON_RPC_URL = process.env.JSON_RPC_URL

module.exports = {
    solidity: "0.8.10",
    networks: {
        hardhat: {
            chainId: 31337,
            forking: {
                url: process.env.JSON_RPC_URL,
            },
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            // 1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
}
