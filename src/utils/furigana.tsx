import React from 'react';

/**
 * 텍스트 안의 한자(발음) 또는 괄호 (후리가나/가타가나)를 감지하여
 * 괄호 발음 부분을 스타일링된 span으로 렌더링합니다.
 * 예: "温(あたた)めますか？" -> "温" + <span className="furigana-bracket">(あたた)</span> + "めますか？"
 */
export const renderFuriganaText = (text: string): React.ReactNode => {
  // 정규식: (히라가나 또는 가타가나) 매칭
  // [\u3040-\u309F\u30A0-\u30FF]+ 
  const regex = /([（\(][\u3040-\u309F\u30A0-\u30FFー]+[）\)])/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span
          key={index}
          style={{
            fontSize: '0.78em',
            color: '#a5b4fc',
            fontWeight: 500,
            marginLeft: '1px',
            marginRight: '2px',
            userSelect: 'all',
          }}
        >
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

/**
 * HTML <ruby>한자<rt>발음</rt></ruby> 태그를 "한자(발음)" 형식으로 변환합니다.
 */
export const convertRubyToBracket = (rubyHtml: string): string => {
  return rubyHtml.replace(/<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/g, '$1($2)');
};
