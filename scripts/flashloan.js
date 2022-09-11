const { ethers, deployments } = require("hardhat")
const { deploy, log } = deployments

async function main() {
    const signers = await ethers.getSigners()
    const deployer = signers[0]

    // This was just for testing the forking
    // PoolAddressesProvider on Optimism Mainnet is on 0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb
    // const PoolAddressesProvider = await ethers.getContractAt(
    //     "IPoolAddressesProvider",
    //     "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
    //     deployer
    // )

    // // // For testing if forking does work
    // const Pool = await ethers.getContractAt(
    //     "IPool",
    //     await PoolAddressesProvider.getPool(),
    //     deployer
    // )

    // console.log(`Fork Successful!`)

    console.log(`Deploying Flashloan Contract...`)

    // const args = [PoolAddressesProvider, Pool]

    const flashloan = await deploy("Flashloan", {
        from: deployer,
        log: true,
        args: args,
    })

    console.log(`Deployed flashloan at ${flashloan.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
