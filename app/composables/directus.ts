import { createClient } from '@@/generated/monospace';

let directusClientInstance: ReturnType<typeof createClient> | null = null;

export const useDirectusClientInstance = () => {
  const config = useRuntimeConfig();
  
  if (directusClientInstance) return directusClientInstance;

  directusClientInstance = createClient({
    url: config.public.directusUrl,
    project: 'monopyrean',
  });
  return directusClientInstance;
};
