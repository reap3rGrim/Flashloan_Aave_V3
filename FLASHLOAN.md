# **Flashloan**

**_This page is meant to help you understand the concept of Flash Loans in the Web 3 space._**

Code associated with this: https://github.com/reap3rGrim/Flashloan_Aave_V3/blob/main/contracts/Flashloan.sol

<br>

## **General Overview**

By default, taking any loan requires collateral. Without using any technical terms, to ensure the trustless nature of Web 3 and for reasons we won't dwell into, in the Web 3 space you can only borrow less than the amount of collateral you put up.

<br>
But, there's a catch. A big one to be frank!
This is not entirely how it works but I'll put my thoughts here and explain how and why, you will be able to borrow arbitrary amount of assets.

<br>
So without diving too much into knowledge that might be overwhelming at the moment and to quote the Aave documentation here:

<br>

> **_Flash Loans allow you to borrow any available amount of assets without putting up any collateral, as long as the liquidity is returned to the protocol within one block transaction._**

<br>
But yea, sounds good theoretically, what about the code right?

<br>

## **Technical Overview**

We're gonna look at the documentation again, but this time for how to execute a Flash Loan.

**Documentation**: https://docs.aave.com/developers/guides/flash-loans

So to begin with, the Aave Protocol gives **two ways of executing a flash loan**

-   **flashLoan()**: This is useful when you want to take a Flash Loan for **multiple assets**
-   **flashLoanSimple()**: This is the function you should call when you want to take a Flash Loan for a **single asset.**

For the sake of simplicity and understanding, we'll be working with only the function flashLoanSimple at this stage.

## **General Execution Flow**

So here are the **steps of execution**:

-   Call the **flashLoanSimple** function
-   Take the flashLoan and then **execute the necessary operations**

Easy right, but let's look at the documentation again

> **_Your contract that receives the flash loaned amounts must conform to the IFlashLoanSimpleReceiver.sol or IFlashLoanReceiver.sol interface by implementing the relevant executeOperation() function._**

Now, let's look at the technical execution flow

## **Technical Execution Flow**

As we're just trying to gain understanding, I think it's advisable to work with IFlashLoanSimpleReceiver.sol, which is the case for this tutorial

Now the easiest way to conform to the contract is to inherit it from the IFlashLoanSimpleReceiver.sol from the Aave V3 protocol.

For those unfamiliar with inheritance, you can refer to the docs but I'll try to be brief here.

## **Understanding the code**

So to inherit a contract, you need to use the format

```
contract ContractName is ContractNameToBeInherited {

// Solidity code

}
```

This will inherit the contract. After that you will need to add the constructor arguments accordingly. _I would love to explain it here, but at this stage, we'll divert too much from the main aim of this document._

Looking at **IFlashLoanSimpleReceiver** it is an interface with 3 functions

> _The practical consequence of this is simply that you'll need to have all functions defined in the contract that you are inheriting. If you don't want that, you can simply put abstract keyword in your contract and work accordingly_

<br>
Now, we'll need to define the following functions:

-   **ADDRESSES_PROVIDER()**: This is a function that **returns the AddressesProvider contract** of the Aave V3 Protocol
-   **POOL()**: This is a function that **returns the Pool contract** of the Aave V3 Protocol
-   **executeOperation()**: This **contains the code to be executed** on a flashloan

So, now we need to find a way to have the Pool Contract and the Addresses Provider Contract in our code.
This is an efficient way I've found

```
IPoolAddressesProvider public immutable i_AddressProvider;
IPool public immutable i_pool;

constructor(address AddressProviderAddress) {
i_AddressProvider = IPoolAddressesProvider(AddressProviderAddress);
i_pool = IPool(i_AddressProvider.getPool());
}
```

Now we have the contracts, and we just have to specify the address of the AddressesProvider Contract and this snippet will find the contract and will also find the Pool Contract and initialize them to the variables.

So, once we have the contracts, it's easy to define the functions that will return these when called

```
function ADDRESSES_PROVIDER() public view returns (IPoolAddressesProvider) {
return i_AddressProvider;
}

function POOL() public view returns (IPool) {
return i_pool;
}
```

**Calling the FlashLoanSimple and modifying executeOperation**

Now we'll declare the executeOperation(). In this example, I simply change the variable value of a variable flag to true which I can just use to check that the Flash Loan has been executed successfully

```
function executeOperation(
address asset,
uint256 amount,
uint256 premium,
address initiator,
bytes calldata params
) external returns (bool) {
uint256 amountToReturn = amount + premium;
token.approve(address(i_pool), amountToReturn);
flag = true;
return flag;
}
```

**Note**: The flash loan also has a parameter premium. This is a premium fee for calling a flash loan which can be found for the contract by calling the function FlashloanPremiumFees() of the Aave Pool. And your contract needs to have the amount you borrowed(as that is to be returned) along with the premium fees. I have put a function in the code to simplify the process of finding Premium Fees.

## **Very Important Note**:

> Many people get confused here into believing that you'll call the executeOperation(). Your contract should call the flashLoanSimple and Aave will call this function. So you really just have to put what you want to execute in this part.

Now to finish with a function that calls the flashloan.

```
function flashloan(uint256 amount) public {
i_pool.flashLoanSimple(address(this), address(token), amount, "0x", 0);
}
```

The arguments here needed are

-   The address of receiver
-   The address of token for which you're calling the Flash Loan
-   The amount of tokens
-   The params and referral code(Not really significant at the moment)
    And that's it now we can call a flash loan (About time right ? )

**The final code: [Flashloan.sol](https://github.com/reap3rGrim/Flashloan_Aave_V3/blob/main/contracts/Flashloan.sol)**

I've also added a setToken, AddTokensForPremium and multiple other self explanatory functions in the final code to make it easier to call a Flash Loan.

**Note**: The above code works at small sizes and has an issue with setTokens at the moment. I made no efforts in trying to resolve it as it does a good job if you want to understand the workflow. And it should work if you set the amount to something low like 1.
