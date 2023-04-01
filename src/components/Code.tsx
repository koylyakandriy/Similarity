"use client";
import React, { FC, useEffect, useState } from "react";
import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { useTheme } from "next-themes";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animated?: boolean;
}

const Code: FC<CodeProps> = ({
  code,
  show,
  language,
  animated,
  animationDelay = 150,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;

          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay);
    }
  }, [animated, animationDelay, code, show]);

  const lines = text.split(/\r\n|\r|\n/).length;
  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} theme={theme} language={language} code={text}>
      {({ className, tokens, getTokenProps, getLineProps }) => (
        <pre
          className={`${className} transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar`}
          style={{ maxHeight: show ? lines * 24 : 0, opacity: show ? 1 : 0 }}
        >
          {tokens.map((line, i) => {
            const { _, ...rest } = getLineProps({ line, key: i });
            return (
              <div style={{ position: "relative" }} {...rest} key={`line-${i}`}>
                {line.map((token, index) => {
                  const { _, ...props } = getTokenProps({ token, index });
                  return <span {...props} key={index} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
