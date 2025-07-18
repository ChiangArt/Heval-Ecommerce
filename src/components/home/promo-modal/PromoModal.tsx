"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-hot-toast";
import { promoSchema } from "@/core/validations/promo-coupon/PromoCouponValidations";
import Button from "@/components/ui/button/Button";
import { getCoupons } from "@/core/coupon/action/coupon.actions";
import { Coupon } from "@/core/coupon/interface/CouponResponse";
import Logo from "@/components/ui/logo/Logo";

export function PromoModal() {
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  // 🔹 Obtener cupón al montar el componente
  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const coupons = await getCoupons();

        // Usamos solo el primer cupón disponible
        if (coupons.length > 0) {
          setCoupon(coupons[0]);
          setOpen(true);
        }
      } catch (error) {
        console.error("No se pudieron obtener los cupones:", error);
      }
    };

    fetchCoupon();
  }, []);

  const formik = useFormik<z.infer<typeof promoSchema>>({
    initialValues: { email: "" },
    validationSchema: toFormikValidationSchema(promoSchema),
    onSubmit: (values) => {
      console.log("Correo registrado:", values.email);
      toast.success("¡Gracias por registrarte!");
      formik.resetForm();
      setOpen(false);
    },
  });

  // 🔹 Si no hay cupón, no se muestra el modal
  if (!coupon) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="!max-w-2xl !px-20 text-secundario text-center  p-8 rounded-none">
        <div className=" flex flex-col justify-center items-center">
          <Logo className="text-black w-40 my-4" />
          <DialogTitle></DialogTitle>

          <h2 className="text-xl  font-bold">
            ¡Toda la web {coupon.discountPercentage}% OFF!
          </h2>
          <p className="text-sm ">
            Código:
            <span className="font-mono font-semibold">{coupon.code}</span>
          </p>
          <p className="text-sm mt-5 py-4 bg-[rgba(232,227,222,0.40)]">
            Ingresa tu correo y obtén descuentos exclusivos y acceso anticipado
            a nuestros lanzamientos.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Tu correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="rounded-none"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-500">{formik.errors.email}</p>
          )}
          <Button
            title="REGISTRARSE"
            type="submit"
            className="w-full bg-secundario text-white"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
