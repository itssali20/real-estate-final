import { Fragment, type ElementType, type ReactNode } from "react";

type Props = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
};

/** Server-safe line splitter: each line masks + slides up (animated by useReveal). */
export default function SplitLines({ lines, as: Tag = "h2", className = "", lineClassName = "" }: Props) {
  return (
    <Tag data-split className={className}>
      {lines.map((l, i) => (
        <Fragment key={i}>
          <span className={`block overflow-hidden ${lineClassName}`}>
            <span className="split-line-inner">{l}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
