import { useAccount, useReadContract } from "wagmi";
import { erc20Abi } from "viem";

export const useErc20Allowance = ({
  tokenAddress,
  allowedAddress,
  enabled,
}) => {
  const { address } = useAccount();
  const isEnabled = !!address && !!allowedAddress && !!enabled;

  const {
    data: allowance,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch: refetchAllowance,
  } = useReadContract({
    address: isEnabled ? tokenAddress : undefined,
    args: isEnabled ? [address, allowedAddress] : undefined,
    abi: erc20Abi,
    functionName: "allowance",
    query: { enabled: isEnabled },
  });

  return {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    allowance,
    refetch: refetchAllowance,
    error,
  };
};
