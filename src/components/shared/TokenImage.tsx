"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { getTokenIcon } from "@/lib/crypto-icons";
import { memo, useEffect, useState } from "react";

interface TokenImageProps {
  symbol: string;
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  chain?: string;
  debug?: boolean;
}

const TokenImage = memo(function TokenImage({
  symbol,
  name,
  imageUrl,
  size = "md",
  chain,
  className,
  debug = false,
}: TokenImageProps) {
  const [imgError, setImgError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (imageUrl && !imgError) {
      setImageSrc(imageUrl);
      if (debug)
        console.log(`TokenImage: Using provided URL for ${symbol}:`, imageUrl);
    } else {
      const fallbackUrl = getTokenIcon(symbol, chain);
      setImageSrc(fallbackUrl);
      if (debug)
        console.log(`TokenImage: Using fallback for ${symbol}:`, fallbackUrl);
    }
  }, [imageUrl, symbol, chain, imgError, debug]);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const imageSize = {
    sm: 24,
    md: 40,
    lg: 48,
    xl: 64,
  }[size];

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20",
          "border border-gray-800",
          sizeClasses[size]
        )}
      >
        {imageSrc ? (
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={`${name} logo`}
              width={imageSize}
              height={imageSize}
              className="object-cover w-full h-full"
              onError={() => {
                console.error(`Failed to load image for ${symbol}:`, imageSrc);
                setImgError(true);
              }}
              onLoad={() => {
                if (debug)
                  console.log(`Successfully loaded image for ${symbol}`);
              }}
              unoptimized
              priority={size === "md" || size === "lg"}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-white font-bold text-sm">
              {symbol.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {chain && (
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-axiom-bg",
            getChainColor(chain)
          )}
        />
      )}
    </div>
  );
});

function getChainColor(chain: string): string {
  const chainColors: Record<string, string> = {
    Ethereum: "bg-purple-500",
    Solana: "bg-pink-500",
    Arbitrum: "bg-blue-500",
    Polygon: "bg-violet-500",
    Avalanche: "bg-red-500",
    Bitcoin: "bg-orange-500",
    Cardano: "bg-teal-500",
    Dogecoin: "bg-yellow-500",
    Binance: "bg-yellow-400",
    Base: "bg-blue-400",
    Optimism: "bg-red-400",
  };
  return chainColors[chain] || "bg-gray-500";
}

TokenImage.displayName = "TokenImage";

export default TokenImage;
