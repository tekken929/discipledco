interface ContentFormatterProps {
  content: string;
  className?: string;
}

export function ContentFormatter({ content, className = '' }: ContentFormatterProps) {
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ');
        elements.push(
          <p key={`p-${key++}`} className="mb-4 leading-relaxed">
            {formatInlineText(paragraphText)}
          </p>
        );
        currentParagraph = [];
      }
    };

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('# ')) {
        flushParagraph();
        const titleText = trimmedLine.substring(2);
        elements.push(
          <h1 key={`h1-${key++}`} className="text-3xl font-bold mb-4 mt-6">
            {formatInlineText(titleText)}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        flushParagraph();
        const subtitleText = trimmedLine.substring(3);
        elements.push(
          <h2 key={`h2-${key++}`} className="text-2xl font-bold mb-3 mt-5">
            {formatInlineText(subtitleText)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushParagraph();
        const headingText = trimmedLine.substring(4);
        elements.push(
          <h3 key={`h3-${key++}`} className="text-xl font-bold mb-2 mt-4">
            {formatInlineText(headingText)}
          </h3>
        );
      } else if (trimmedLine === '') {
        flushParagraph();
      } else {
        currentParagraph.push(trimmedLine);
      }
    }

    flushParagraph();

    return elements;
  };

  const formatInlineText = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let remaining = text;
    let key = 0;

    const boldRegex = /\*\*(.+?)\*\*/;
    const italicRegex = /\*(.+?)\*/;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(boldRegex);
      const italicMatch = remaining.match(italicRegex);

      let nextMatch: RegExpMatchArray | null = null;
      let isBold = false;

      if (boldMatch && italicMatch) {
        if (boldMatch.index! < italicMatch.index!) {
          nextMatch = boldMatch;
          isBold = true;
        } else {
          nextMatch = italicMatch;
          isBold = false;
        }
        )
      } else if (boldMatch) {
        nextMatch = boldMatch;
        isBold = true;
      } else if (italicMatch) {
        nextMatch = italicMatch;
        isBold = false;
      }

      if (nextMatch && nextMatch.index !== undefined) {
        if (nextMatch.index > 0) {
          parts.push(remaining.substring(0, nextMatch.index));
        }

        if (isBold) {
          parts.push(
            <strong key={`b-${key++}`} className="font-bold">
              {nextMatch[1]}
            </strong>
          );
        } else {
          parts.push(
            <em key={`i-${key++}`} className="italic">
              {nextMatch[1]}
            </em>
          );
        }

        remaining = remaining.substring(nextMatch.index + nextMatch[0].length);
      } else {
        parts.push(remaining);
        break;
      }
    }

    return <>{parts}</>;
  };

  return <div className={className}>{formatContent(content)}</div>;
}
