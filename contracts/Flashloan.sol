pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";

contract Flashloan is IFlashLoanSimpleReceiver {
    bool public flag;
    IPoolAddressesProvider private immutable i_addressProvider;
    IPool private immutable i_pool;

    constructor(address addressProvider) public {
        i_addressProvider = IPoolAddressesProvider(addressProvider);
        i_pool = IPool(i_addressProvider.getPool());
        flag = false;
    }

    function ADDRESSES_PROVIDER() external view override returns (IPoolAddressesProvider) {
        return i_addressProvider;
    }

    function POOL() external view returns (IPool) {
        return i_pool;
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) public returns (bool) {
        uint16 referralCode = 0;
        i_pool.flashLoanSimple(address(this), asset, amount, params, referralCode);
        flag = true;
        return flag;
    }

    function resetFlag() public {
        flag = false;
    }
}
