import { useContext } from 'react';

import ToastContext from 'contexts/toaster';

export default function useToastContext() {
  return useContext(ToastContext);
}
