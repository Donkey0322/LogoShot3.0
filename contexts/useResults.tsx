import { createContext, memo, useContext, useMemo, useState } from 'react';

import type { ReactNode } from 'react';

type Results = { appl_no: string; tmark_name: string; tmark_image_url: string }[];

export type ResultsType = Results | undefined;

interface ContextType {
  results: ResultsType;
  setResults: (value: ResultsType) => void;
}

const ResultsContext = createContext<ContextType>({
  results: undefined,
  setResults: () => {},
});

export type UseResultsProps = {
  children?: ReactNode;
};

export const ResultsProvider = memo(function ResultsProvider({ children }: UseResultsProps) {
  const [results, setResults] = useState<ResultsType>(undefined);
  const value = useMemo(() => ({ results, setResults }), [results, setResults]);

  return <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>;
});

export const useResults = () => useContext(ResultsContext);
