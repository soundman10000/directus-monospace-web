import { createDirectus, rest } from '@directus/sdk';

let directusClientInstance: ReturnType<typeof createDirectus> | null = null;

export const useDirectusClientInstance = () => {
  const config = useRuntimeConfig();
  
  if (directusClientInstance) return directusClientInstance;

  directusClientInstance = createDirectus(config.public.directusUrl).with(rest());
  return directusClientInstance;
};
