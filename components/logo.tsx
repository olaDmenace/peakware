import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/peakware-logo-trimmed.png"
      alt="Peakware Consulting"
      width={303}
      height={372}
      priority
      className={`w-auto ${className ?? "h-12"}`}
    />
  );
}
