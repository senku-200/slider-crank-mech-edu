declare module 'react-katex' {
  import * as React from 'react';

  export interface KatexBaseProps {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
  }

  export interface BlockMathProps extends KatexBaseProps {
    children?: React.ReactNode;
  }

  export interface InlineMathProps extends KatexBaseProps {
    children?: React.ReactNode;
  }

  export const BlockMath: React.FC<BlockMathProps>;
  export const InlineMath: React.FC<InlineMathProps>;
  const DefaultExport: React.FC<BlockMathProps>;
  export default DefaultExport;
}
