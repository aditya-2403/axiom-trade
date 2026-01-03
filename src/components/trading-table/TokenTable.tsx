"use client";

import { memo, useCallback, useEffect } from "react";
import { useTokenData } from "@/hooks/useTokenData";
import { useWebSocket } from "@/hooks/useWebSocket";
import TableHeader from "./TableHeader";
import TokenRow from "./TokenRow";
import TableSkeleton from "./TableSkeleton";
import TokenModal from "../token-details/TokenModal";
import ErrorBoundary from "../shared/ErrorBoundary";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleModal } from "@/store/slices/uiSlice";
import { selectToken } from "@/store/slices/tokenSlice";

const TokenTable = memo(function TokenTable() {
  const dispatch = useDispatch();
  const { selectedToken } = useSelector((state: RootState) => state.tokens);
  const { isModalOpen } = useSelector((state: RootState) => state.ui);

  const {
    tokens,
    sortBy,
    sortDirection,
    loading,
    error,
    handleSort,
    formatNumber,
    refetch,
  } = useTokenData();

  useWebSocket(); // Start WebSocket updates

  const handleTokenClick = useCallback(
    (token: any) => {
      dispatch(selectToken(token));
      dispatch(toggleModal());
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading && tokens.length === 0) {
    return (
      <div className="relative">
        <TableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <AlertCircle className="w-12 h-12 text-negative mb-4" />
          <h3 className="text-lg font-medium text-gray-100 mb-2">
            Failed to load tokens
          </h3>
          <p className="text-gray-400 text-center mb-6 max-w-md">
            {error || "An unexpected error occurred while fetching token data."}
          </p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </ErrorBoundary>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-axiom-border flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-100 mb-2">
          No tokens found
        </h3>
        <p className="text-gray-400 text-center mb-6">
          Try changing your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-axiom-card rounded-xl border border-axiom-border overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <TableHeader
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <div className="divide-y divide-axiom-border/30">
              {tokens.map((token) => (
                <ErrorBoundary key={token.id}>
                  <TokenRow token={token} onTokenClick={handleTokenClick} />
                </ErrorBoundary>
              ))}
            </div>
          </div>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-axiom-border flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing{" "}
            <span className="text-gray-300 font-medium">{tokens.length}</span>{" "}
            tokens
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRetry}
              className="text-sm text-gray-400 hover:text-gray-300 flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <div className="text-sm text-gray-400">Updates every 3s</div>
          </div>
        </div>
      </div>

      {/* Token Details Modal */}
      {selectedToken && (
        <TokenModal
          token={selectedToken}
          isOpen={isModalOpen}
          onOpenChange={() => dispatch(toggleModal())}
        />
      )}
    </>
  );
});

TokenTable.displayName = "TokenTable";

export default TokenTable;
