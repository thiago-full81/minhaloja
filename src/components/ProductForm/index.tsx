import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Product, ProductInput } from "../../types/product";
import "./styles.css";

const productSchema = z.object({
  name: z.string().trim().min(3, "Informe ao menos 3 caracteres."),
  description: z.string().trim(),
  category: z.string().trim().min(1, "Informe a categoria."),
  price: z.number({ error: "Informe o preço." }).positive("O preço deve ser maior que zero."),
  promoPrice: z
    .preprocess(
      (value) => (value === "" || value === undefined ? undefined : value),
      z.number({ error: "Informe um valor válido." }).positive(
        "A promoção deve ser maior que zero.",
      ).optional(),
    )
    .optional(),
  stock: z
    .number({ error: "Informe o estoque." })
    .int("O estoque deve ser um número inteiro.")
    .min(0, "O estoque não pode ser negativo."),
  image: z.url("Informe uma URL válida para a imagem."),
}).refine(
  (values) =>
    values.promoPrice === undefined || values.promoPrice < values.price,
  {
    message: "A promoção deve ser menor que o preço.",
    path: ["promoPrice"],
  },
);

type FormInput = z.input<typeof productSchema>;
type FormValues = z.output<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  submitting: boolean;
  onSubmit: (product: ProductInput) => Promise<void>;
}

export default function ProductForm({
  product,
  submitting,
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      category: product?.category ?? "",
      price: product ? product.price / 100 : undefined,
      promoPrice: product?.promoPrice !== undefined
        ? product.promoPrice / 100
        : undefined,
      stock: product?.stock,
      image: product?.image ?? "",
    },
  });

  async function submit(values: FormValues) {
    const payload: ProductInput = {
      name: values.name,
      description: values.description,
      category: values.category,
      price: Math.round(values.price * 100),
      ...(values.promoPrice !== undefined
        ? { promoPrice: Math.round(values.promoPrice * 100) }
        : {}),
      stock: values.stock,
      image: values.image,
    };
    await onSubmit(payload);
  }

  return (
    <form className="product-form" onSubmit={handleSubmit(submit)} noValidate>
      <label className="form-field">
        Nome
        <input {...register("name")} />
        {errors.name && <span className="field-error">{errors.name.message}</span>}
      </label>

      <label className="form-field">
        Descrição
        <textarea rows={4} {...register("description")} />
        {errors.description && (
          <span className="field-error">{errors.description.message}</span>
        )}
      </label>

      <label className="form-field">
        Categoria
        <input {...register("category")} />
        {errors.category && (
          <span className="field-error">{errors.category.message}</span>
        )}
      </label>

      <div className="product-form__row">
        <label className="form-field">
          Preço (R$)
          <input
            type="number"
            min="0.01"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="field-error">{errors.price.message}</span>
          )}
        </label>

        <label className="form-field">
          Promoção (R$)
          <input
            type="number"
            min="0.01"
            step="0.01"
            {...register("promoPrice", {
              setValueAs: (value: string) =>
                value === "" ? undefined : Number(value),
            })}
          />
          {errors.promoPrice && (
            <span className="field-error">{errors.promoPrice.message}</span>
          )}
        </label>
      </div>

      <label className="form-field">
        Estoque
        <input
          type="number"
          min="0"
          step="1"
          {...register("stock", { valueAsNumber: true })}
        />
        {errors.stock && (
          <span className="field-error">{errors.stock.message}</span>
        )}
      </label>

      <label className="form-field">
        Imagem (URL)
        <input type="url" {...register("image")} />
        {errors.image && (
          <span className="field-error">{errors.image.message}</span>
        )}
      </label>

      <button className="button button--primary" disabled={submitting} type="submit">
        {submitting ? "Salvando..." : "Salvar produto"}
      </button>
    </form>
  );
}
