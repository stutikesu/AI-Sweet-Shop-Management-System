import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sweetsApi, Sweet, CreateSweetDto, SearchParams } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export const useSweets = () => {
  return useQuery({
    queryKey: ['sweets'],
    queryFn: sweetsApi.getAll,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useSearchSweets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SearchParams) => sweetsApi.search(params),
    onSuccess: (data) => {
      queryClient.setQueryData(['sweets'], data);
    },
  });
};

export const usePurchaseSweet = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => {
      if (!token) throw new Error('Authentication required');
      return sweetsApi.purchase(id, quantity, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
    },
  });
};

export const useRestockSweet = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => {
      if (!token) throw new Error('Authentication required');
      return sweetsApi.restock(id, quantity, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
    },
  });
};

export const useCreateSweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, token }: { data: CreateSweetDto; token: string }) =>
      sweetsApi.create(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
    },
  });
};

export type { Sweet, CreateSweetDto };

