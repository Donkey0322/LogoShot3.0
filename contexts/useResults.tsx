import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";

type Results = string[][];

export type ResultsType = Results | undefined;

interface ContextType {
  results: ResultsType;
  setResults: (value: ResultsType) => void;
}

const ResultsContext = createContext<ContextType>({
  results: undefined,
  setResults: (value: ResultsType) => {},
});

export type UseResultsProps = {
  children?: ReactNode;
};

export const ResultsProvider = memo(function ({ children }: UseResultsProps) {
  const [results, setResults] = useState<ResultsType>(undefined);
  const value = useMemo(() => ({ results, setResults }), [results, setResults]);
  useEffect(() => {
    console.log(results);
  }, [results]);
  return (
    <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
  );
});

export const useResults = () => useContext(ResultsContext);
