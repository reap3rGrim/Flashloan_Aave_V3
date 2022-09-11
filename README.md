# **Implementing a simple flash loan**

**_Code may not be completely functional_**

## **Using Remix:**

<br/>

For implementing a simple flash loan, Flashloan.sol in remix should be enough

However for doing anything practical, we need to execute operations. In such a scenario we must comply with the Aave documentation which clearly states

> **_Your contract that receives the flash loaned amounts must conform to the IFlashLoanSimpleReceiver.sol or IFlashLoanReceiver.sol interface by implementing the relevant executeOperation() function._**

Modify the contracts accordingly

<br/>

## **Errors Encountered:**

-   Whenever you get the error that the contract should be marked as abstract, this means you need to call functions from the inherited contract

<br/>

## **References:**

-   [Aave Documentation for Flash Loans](https://docs.aave.com/developers/guides/flash-loans)
-   [FlashLoan Tutorial by EatTheBlocks](https://www.youtube.com/watch?v=03jO9vbrXvY&list=PLbbtODcOYIoEMz-XatfkcFMsEwMmYShwk)
-   [Alchemy tutorial](https://www.alchemy.com/overviews/creating-a-flash-loan-using-aave)
-   [Griefing attack](https://ethereum.stackexchange.com/a/92457/19365)

Check out [Triangular Arbritage](https://medium.com/coinmonks/triangular-arbitrage-with-crypto-dexs-part-one-add36b136bf1)
