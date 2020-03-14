import { useState } from "react";

export function useInit(fn: () => void): void {
  const [first, setFirst] = useState(true);
  if (first) {
    setFirst(false);
    fn();
  }
}

