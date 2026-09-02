
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlusIcon, Loader2, PlusIcon, X } from "lucide-react";
import useCategories from "../hook/useGetCategory";
import useItemForm from "../hook/useItemForm";
import FormErrorMessage from './FormErrorMessage';
import { useEffect, useRef } from 'react';

function AddItemModal({ open, onClose }) {

  const { handleSubmit,editingItem, onSubmit,addPending,updatePending, register, control, Controller, errors, previewUrl, setPreviewUrl } = useItemForm();

  const { categories } = useCategories();


  const fileRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    }
  }, [previewUrl])

  return (

    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed  inset-0 z-50 flex items-end justify-center bg-(--color-dark-bg)/60 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-(--radius-modal) bg-(--color-surface) p-6 scrollbar-none shadow-(--shadow-modal) sm:rounded-(--radius-modal)"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-(--color-text-main)">
               {
                editingItem ? "Update the menu":"Add the item"
               }
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-full text-text-muted transition hover:bg-subtle"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">


              <Controller
                name="itemImage"
                control={control}
                rules={{
                  required:editingItem ? false :  "Please upload an item photo",
                }}
                render={({ field }) => (
                  <>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-(--radius-card) border-2 border-dashed border-border-main bg-subtle transition hover:border-border-hover"
                    >
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Item preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex flex-col items-center gap-1.5 text-text-muted">
                          <ImagePlusIcon className="h-6 w-6" />

                          <span className="text-(--text-xs) font-medium">
                            Upload item photo
                          </span>
                        </span>
                      )}
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        field.onChange(file);

                        setPreviewUrl(URL.createObjectURL(file));
                      }}
                    />
                  </>
                )}
              />


              <FormErrorMessage error={errors.itemImage} />

              <div>
                <label className="mb-1.5 block text-(--text-xs) font-semibold">
                  Item name
                </label>
                <input
                  disabled={addPending || updatePending}
                  {
                  ...register("itemName", {
                    required: "Item name is required",
                    min: {
                      value: 3,
                      message: "Item name must be at least 3 characters"
                    },
                    max: {
                      value: 20,
                      message: "Item name should not exceed 20 characters"
                    }
                  })
                  }
                  placeholder="e.g. Hazelnut Latte"
                  className="w-full rounded-btn border border-border-main bg-(--color-surface) px-3.5 py-2.5 text-(--text-sm) outline-none transition focus:border-(--color-border-focus) focus:ring-2 focus:ring-(--color-primary)/15"
                />

                <FormErrorMessage error={errors.itemName} />
              </div>



              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-(--text-xs) font-semibold">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    disabled={addPending || updatePending}
                    min="0"
                    {
                    ...register("price", {
                      required: "Price is required",
                      min: {
                        value: 10,
                        message: "Minimum price should be 10."
                      },
                      max: {
                        value: 10000,
                        message: "Price must not exceed 10,000 Rs."
                      }
                    })
                    }
                    placeholder="199"
                    className="w-full rounded-btn border border-border-main bg-(--color-surface) px-3.5 py-2.5 text-(--text-sm) outline-none transition focus:border-(--color-border-focus) focus:ring-2 focus:ring-(--color-primary)/15"
                  />

                  <FormErrorMessage error={errors.price} />
                </div>

                <div>
                  <label className="mb-1.5 block text-(--text-xs) font-semibold">
                    Category
                  </label>
                  <select
                  disabled={addPending || updatePending}
                    {
                    ...register("category", {
                      required: "Catergory is required"
                    })
                    }
                    className="w-full rounded-btn border border-border-main bg-(--color-surface) px-3.5 py-2.5 text-(--text-sm) outline-none transition focus:border-(--color-border-focus) focus:ring-2 focus:ring-(--color-primary)/15"
                  >

                    <option value="" disabled>
                      Select a category
                    </option>

                    {categories?.map((c) => (
                      <option key={c._id} value={c._id.toString()}>
                        {c.icon}  {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <FormErrorMessage error={errors.category} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Food Type */}
                <div>
                  <label className="mb-1.5 block text-(--text-xs) font-semibold">
                    Food Type
                  </label>

                  <select
                  disabled={addPending || updatePending}
                    {...register("foodType", {
                      required: "Please select a food type",
                    })}
                    className="w-full rounded-btn border border-border-main bg-(--color-surface) px-3.5 py-2.5 text-(--text-sm) outline-none transition focus:border-(--color-border-focus) focus:ring-2 focus:ring-(--color-primary)/15"
                  >
                    <option value="" disabled>
                      Select food type
                    </option>

                    <option value="veg">🟢 Veg</option>
                    <option value="non-veg">🔴 Non-Veg</option>
                  </select>

                  <FormErrorMessage error={errors.foodType} />
                </div>

                {/* Preparation Time */}
                <div>
                  <label className="mb-1.5 block text-(--text-xs) font-semibold">
                    Preparation Time
                  </label>

                  <input
                    type="number"
                    disabled={addPending || updatePending}
                    min="1"
                    placeholder="20"
                    {...register("preparationTime", {
                      required: "Preparation time is required",

                      valueAsNumber: true,

                      min: {
                        value: 1,
                        message: "Preparation time must be at least 1 minute",
                      },

                      max: {
                        value: 180,
                        message: "Preparation time cannot exceed 180 minutes",
                      },
                    })}
                    className="w-full rounded-btn border border-border-main bg-(--color-surface) px-3.5 py-2.5 text-(--text-sm) outline-none transition focus:border-(--color-border-focus) focus:ring-2 focus:ring-(--color-primary)/15"
                  />

                  <FormErrorMessage error={errors.preparationTime} />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-(--text-xs) font-semibold">
                  Description
                </label>
                <textarea
                disabled={addPending || updatePending}
                  {
                  ...register("description", {
                    required: "Item description is required",
                    minLength: {
                      value: 25,
                      message: "Description should be at least 25 characters long"
                    },
                    maxLength: {
                      value: 300,
                      message: "Description shouldn't exceed 300 characters"
                    }
                  })
                  }
                  rows={3}
                  placeholder="Short, appetizing description customers will see"
                  className="w-full resize-none rounded-btn border border-border-main bg-(--color-surface) px-3.5 py-2.5 text-(--text-sm) outline-none transition focus:border-(--color-border-focus) focus:ring-2 focus:ring-(--color-primary)/15"
                />

                <FormErrorMessage error={errors.description} />
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-btn border border-border-main bg-subtle px-3.5 py-3">
                <span className="font-medium text-(--color-text-main)">
                  Available for order
                </span>
                <input
                disabled={addPending || updatePending}
                  type="checkbox"
                  {...register("isAvailable")}

                  className="h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full bg-border-main transition-colors checked:bg-(--color-primary) relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:shadow before:transition-transform checked:before:translate-x-4"
                />
              </label>

              <button
                type="submit"
                disabled={addPending || updatePending}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-btn bg-(--color-primary) py-3 font-semibold text-(--color-text-on-primary) shadow-(--shadow-primary) transition hover:bg-primary-hover disabled:opacity-70"
              >
                {(addPending || updatePending) ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {editingItem ? "Updating item...":"Adding item..."}
                  </>
                ) : (
                  <>
                    <PlusIcon className="h-4 w-4" />
                   {editingItem ? "Update item":"Add item"}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddItemModal