import type { ElementType, ReactNode } from "react";

/**
 * Semantic section wrapper. Animation itself is handled globally by
 * <RevealEngine />, so this stays a server component with zero JS cost.
 */
export default function Reveal({
  children, as: Tag = "section", className = "", id,
}: { children: ReactNode; as?: ElementType; className?: string; id?: string }) {
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
