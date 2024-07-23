"use client";
import { useState, useEffect, useCallback } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { parseEther } from "viem";
import { contract } from "../../constants/contractAdd";
import { useErc20Allowance } from "@/lib/hooks/use-erc20-allowance";
import { useErc20Approve } from "@/lib/hooks/use-erc20-approve";

const Test = () => {
  const [manualTokenAddress, setManualTokenAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [needsApproval, setNeedsApproval] = useState(false);

  const { allowance: fetchedAllowance, refetch: refetchAllowance } =
    useErc20Allowance({
      tokenAddress: manualTokenAddress,
      allowedAddress: contract,
      enabled: !!manualTokenAddress,
    });

  console.log("fetched allowance: ", fetchedAllowance);

  const {
    approve,
    isLoading: isApprovalPending,
    isSuccess: isApprovalSuccess,
    isError: isApprovalError,
    error: approvalError,
  } = useErc20Approve({
    tokenAddress: manualTokenAddress,
    contract,
    amount: parseEther(amount),
  });

  useEffect(() => {
    if (isApprovalSuccess) {
      setNeedsApproval(false);
      refetchAllowance();
    }
  }, [isApprovalSuccess, refetchAllowance]);

  const fetchAllowance = useCallback(async () => {
    await refetchAllowance();
  }, [refetchAllowance]);

  useEffect(() => {
    if (manualTokenAddress) {
      fetchAllowance();
    }
  }, [manualTokenAddress, fetchAllowance]);

  const handleApproveClick = () => {
    if (needsApproval) {
      approve();
    }
  };

  const handleApproval = () => {
    setNeedsApproval(true);
  };

  return (
    <div className="add relative">
      <div className="add_inner">
        <div className="flex flex-col items-start mb-4 space-y-2">
          <Input
            type="text"
            placeholder="token"
            value={manualTokenAddress}
            onChange={(e) => setManualTokenAddress(e.target.value)}
          />
          <Input
            type="text"
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button variant="outline" onClick={handleApproval}>
            Check Approval
          </Button>
          {needsApproval && (
            <Button
              variant="outline"
              onClick={handleApproveClick}
              disabled={isApprovalPending}
            >
              {isApprovalPending ? "Approving..." : "Approve"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
