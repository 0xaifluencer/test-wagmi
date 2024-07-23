import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ContractFunctionRevertedError, erc20Abi } from "viem";

export const useErc20Approve = ({ tokenAddress, contract, amount }) => {
  const {
    writeContract,
    isLoading,
    isSuccess: isWriteContractSuccess,
    isError,
    error,
    data: txHash,
  } = useWriteContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "approve",
    args: [contract, amount],
  });

  console.log(tokenAddress);
  console.log(contract);
  console.log(amount);

  const waitForTransactionReceiptResponse = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
    },
  });

  const isSuccess =
    waitForTransactionReceiptResponse.isSuccess &&
    isWriteContractSuccess &&
    waitForTransactionReceiptResponse.receipt?.status === "success";

  console.log(isLoading);
  console.log(isSuccess);
  console.log(isError);
  console.log(error);

  return {
    approve: writeContract,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
