// "use client";
// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { Formik, Form } from "formik";
// import {
//   createProduct,
//   updateProduct,
// } from "@/core/product/action/product.actions";
// import { productSchema } from "@/core/validations/product/ProductValidations";
// import Image from "next/image";
// import { toFormikValidationSchema } from "zod-formik-adapter";
// import { useCollectionStore } from "@/store/admin/collection-store";
// import { Product } from "@/core/product/interface/productResponse";
// import { InputField } from "../ui/form/InputField";
// import { SelectField } from "../ui/form/SelectField";
// import { TextareaField } from "../ui/form/TextareaField";
// import { useImageUpload } from "@/hooks/useImageUpload";
// import { logError } from "@/app/utils/logger";

// interface AddProductModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   productToEdit?: Product | null;
//   onUpdate?: () => void;
// }

// export function AddProductModal({
//   open,
//   onOpenChange,
//   productToEdit,
//   onUpdate,
// }: AddProductModalProps) {
//   const [loading, setLoading] = useState(false);
//   const { collections, fetchCollections } = useCollectionStore();
//   const isEditing = !!productToEdit;

//   const {
//     files,
//     previews: imagePreviews,
//     handleFileChange,
//     uploadFiles,
//     resetImages,
//   } = useImageUpload();

//   useEffect(() => {
//     fetchCollections();
//   }, [fetchCollections]);

//   const initialValues = {
//     title: productToEdit?.title || "",
//     description: productToEdit?.description || "",
//     material: productToEdit?.material || "",
//     price: productToEdit?.price || 0,
//     color: productToEdit?.color || "",
//     quantity: productToEdit?.quantity || 0,
//     discountPercentage: productToEdit?.discountPercentage || 0,
//     discountUntil: productToEdit?.discountUntil
//       ? new Date(productToEdit.discountUntil).toISOString().slice(0, 16)
//       : "",
//     collectionId: productToEdit?.collectionId || 0,
//     imageUrls: productToEdit?.imageUrls || [],
//   };

//   const handleDialogChange = (isOpen: boolean) => {
//     onOpenChange(isOpen);
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleDialogChange}>
//       <DialogContent className="w-full !max-w-[95vw]">
//         <DialogHeader>
//           <DialogTitle>
//             {isEditing ? "Editar producto" : "Nuevo producto"}
//           </DialogTitle>
//           <DialogDescription>
//             {isEditing
//               ? "Modifica los detalles del producto."
//               : "Completa los detalles del nuevo producto."}
//           </DialogDescription>
//         </DialogHeader>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={toFormikValidationSchema(productSchema)}
//           enableReinitialize
//           onSubmit={async (values, { resetForm }) => {
//             setLoading(true);
//             try {
//               const imageUrls =
//                 files.length > 0 ? await uploadFiles() : imagePreviews;

//               const productData = {
//                 ...values,
//                 price: Number(values.price),
//                 quantity: Number(values.quantity),
//                 discountPercentage: Number(values.discountPercentage),
//                 collectionId: Number(values.collectionId),
//                 color: values.color,
//                 discountUntil: values.discountUntil || "",
//                 imageUrls,
//               };

//               if (isEditing && productToEdit) {
//                 await updateProduct(productToEdit.id, productData);
//                 toast.success("Producto actualizado exitosamente");
//               } else {
//                 await createProduct(productData);
//                 toast.success("Producto agregado exitosamente");
//               }

//               onOpenChange(false);
//               resetForm();
//               resetImages();
//               onUpdate?.();
//             } catch (err) {
//               logError(err);
//               toast.error("Error al guardar producto");
//             } finally {
//               setLoading(false);
//             }
//           }}
//         >
//           <Form className="grid grid-cols-1 gap-6 py-4">
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <InputField name="title" label="Título" />
//                 <InputField name="material" label="Material" />
//                 <SelectField
//                   name="collectionId"
//                   label="Colección"
//                   options={collections.map((col) => ({
//                     value: col.id,
//                     label: col.name,
//                   }))}
//                 />
//               </div>

//               <TextareaField name="description" label="Descripción" />
 

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField name="price" label="Precio" type="number" />
//                 <InputField
//                   name="discountPercentage"
//                   label="Descuento (%)"
//                   type="number"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField name="quantity" label="Cantidad" type="number" />
//                 <InputField
//                   name="discountUntil"
//                   label="Fecha de descuento"
//                   type="datetime-local"
//                 />
//               </div>

//               <InputField name="color" label="Color" />

//               <div>
//                 <Label>Imágenes</Label>
//                 <Input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//                 {imagePreviews.length > 0 && (
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//                     {imagePreviews.map((src, index) => (
//                       <div
//                         key={index}
//                         className="relative w-full h-32 rounded overflow-hidden border"
//                       >
//                         <Image
//                           src={src}
//                           alt={`Imagen ${index + 1}`}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <DialogFooter>
//                 <Button
//                   className="cursor-pointer"
//                   type="submit"
//                   disabled={loading}
//                 >
//                   {loading
//                     ? isEditing
//                       ? "Actualizando..."
//                       : "Agregando..."
//                     : isEditing
//                     ? "Actualizar producto"
//                     : "Agregar producto"}
//                 </Button>
//               </DialogFooter>
//             </div>
//           </Form>
//         </Formik>
//       </DialogContent>
//     </Dialog>
//   );
// }
