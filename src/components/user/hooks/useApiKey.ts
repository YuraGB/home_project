import { useMutationApi } from '@/hooks/apiCalls/mutation';
import { toast } from '@/hooks/use-toast';
import { generateApiKey } from '@/server/controllers/user/userService';
import { User } from 'next-auth';

export const useApiKey = () => {
  const {
    data: apiKey,
    error,
    isPending,
    mutate: createApiKey,
  } = useMutationApi<string, User>(generateApiKey);

  const handleClick = (apiKey: string) => {
    // Копіюємо в буфер
    navigator.clipboard
      .writeText(apiKey)
      .then(() => {
        toast({
          title: 'API Key copied to clipboard',
          description: 'You can now paste it wherever you need.',
          variant: 'default',
        });
      })
      .catch((err) => {
        console.error('Не вдалося скопіювати: ', err);
      });
  };

  return {
    apiKey,
    error,
    isPending,
    createApiKey,
    handleClick,
  };
};
