# **Implementing a simple flash loan**

**_Code has been tested only on Remix_**

## **Using Remix:**

<br/>

For implementing a simple flash loan, Flashloan.sol in remix should be enough. There are hardhat modules here, as in the future this is planned to be implemented through hardhat.

Modify the execute operation in the Flashloan.sol accordingly

<br/>

## **Full Walkthrough of the Code is in the FLASHLOAN.md**

## **Steps to follow for taking a Flash Loan:**

1. Go to [Remix](https://remix.ethereum.org/), an online IDE for solidity
2. Create a **new file** and **paste the code in Flashloan.sol**
3. Use the **injected Web 3 provider** and connect to metamask
4. **Deploy** the contract with the address of Addresses Provider in the your respective testnet. Refer to the [Testnet Addresses](https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses)
5. **Set your respective token** for which the flash loan is to be taken.
6. Get some testnet tokens
    > (For getting testnet tokens, the easiest way is to simply go to [app.aave.com](https://app.aave.com/) and taking the required amount)
7. **Check the premium fees** using the FlashloanPremiumFees function.
8. **Deposit the premium fees** in the contract.
    > **_Errors at this step, currently resolving, if you simply want to understand flash loans this may not be necessary at the moment)_**
9. **Check the flag** to see it's at false. If not, use the reset flag to reset the flag to 0.
10. **Select an amount of 1** for the flash loan(use a low amount at the moment, if you wish to scale the solution kindly open an issue and I'll be sure to update the code accordingly)
11. **Execute the Flash Loan** by calling the flash loan function. If the flash loan executed successfully the flag will be set to true.

<br />

**Note: At the moment I made no attempts to scale the contract to try to fix the error encountered during token depositing. However, if you happen to be interested in this, raise an issue and I'll update the code accordingly.**

<br />

## **Errors Encountered:**

-   Refer to the [Aave Troubleshooting Errors](https://docs.aave.com/developers/v/2.0/guides/troubleshooting-errors)

<br/>

## **References:**

-   [Aave Subgraph](https://thegraph.com/hosted-service/subgraph/aave/protocol-v2?version=current)
-   [Aave Documentation for Flash Loans](https://docs.aave.com/developers/guides/flash-loans)
-   [FlashLoan Tutorial by EatTheBlocks](https://www.youtube.com/watch?v=03jO9vbrXvY&list=PLbbtODcOYIoEMz-XatfkcFMsEwMmYShwk)
-   [Alchemy tutorial](https://www.alchemy.com/overviews/creating-a-flash-loan-using-aave)
-   [Griefing attack](https://ethereum.stackexchange.com/a/92457/19365)
-   Refer to the [ABI](https://docs.aave.com/developers/deployed-contracts/v3-mainnet/optimism) for working with the contracts
-   Check out [Triangular Arbritage](https://medium.com/coinmonks/triangular-arbitrage-with-crypto-dexs-part-one-add36b136bf1)
