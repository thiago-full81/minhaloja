import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { productsApi } from "../api/products";
import type { Product, ProductInput } from "../types/product";

export const productsQueryKey = ["products"] as const;
export const productQueryKey = (id: string) => ["products", id] as const;

export function useProducts() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery({
    queryKey: productsQueryKey,
    queryFn: productsApi.list,
  });
  const createMutation = useMutation({
    mutationFn: productsApi.create,
    onSuccess: async (created) => {
      queryClient.setQueryData<Product[]>(productsQueryKey, (products) =>
        products ? [...products, created] : [created],
      );
      await queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, product }: { id: string; product: ProductInput }) =>
      productsApi.update(id, product),
    onSuccess: async (updated) => {
      queryClient.setQueryData<Product[]>(productsQueryKey, (products) =>
        products?.map((product) =>
          String(product.id) === String(updated.id) ? updated : product,
        ),
      );
      queryClient.setQueryData(productQueryKey(String(updated.id)), updated);
      await queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: productsApi.remove,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: productsQueryKey });
      const previous =
        queryClient.getQueryData<Product[]>(productsQueryKey);
      queryClient.setQueryData<Product[]>(productsQueryKey, (products) =>
        products?.filter((product) => String(product.id) !== id),
      );
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(productsQueryKey, context.previous);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });

  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
    getProduct: productsApi.getById,
    createProduct: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateProduct: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteProduct: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productQueryKey(id),
    queryFn: () => productsApi.getById(id),
    enabled: Boolean(id),
    retry: false,
  });
}
