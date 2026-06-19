import Image from "next/image";

export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src="/images/peakware-mark.png"
        alt="Peakware Consulting"
        width={29}
        height={32}
        priority
        className="h-7 w-auto"
      />
      {withWordmark ? (
        <span className="font-display text-lg font-semibold tracking-tight text-cream">
          Peakware
        </span>
      ) : null}
    </span>
  );
}
