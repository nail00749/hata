import { useEffect, useState } from 'react';

export const useMount = (open: boolean) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open && !mounted) {
      setMounted(true);
    } else if (!open && mounted) {
      setTimeout(() => {
        setMounted(open);
      }, 500);
    }
  }, [open]);

  return { mounted };
};
