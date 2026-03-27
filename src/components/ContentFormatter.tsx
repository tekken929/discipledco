interface ContentFormatterProps {
  content: string;
  className?: string;
}

export function ContentFormatter({ content, className = '' }: ContentFormatterProps) {
  return (
    <div className={className}>
      <div className="whitespace-pre-wrap leading-relaxed">
        {content}
      </div>
    </div>
  );
}
