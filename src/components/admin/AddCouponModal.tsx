"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Gift } from "lucide-react";
import { couponSchema } from "@/core/validations/promo-coupon/PromoCouponValidations";
import { postCoupon } from "@/core/coupon/action/coupon.actions";
import { PromoPreview } from "./coupon/PromoPreview";
import { logError } from "@/app/utils/logger";

export function AddCouponModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik<z.infer<typeof couponSchema>>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      active: true,
      expiryDate: "",
    },
    validationSchema: toFormikValidationSchema(couponSchema),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await postCoupon({
          code: values.code,
          discountPercentage: values.discountPercentage,
          active: values.active,
          expiryDate: new Date(values.expiryDate || new Date()),
        });
        toast.success("Cupón creado exitosamente");
        setOpen(false);
        formik.resetForm();
      } catch (error) {
        logError(error);
        toast.error("Error al crear el cupón");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) formik.resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="h-24 flex-col gap-2 w-full cursor-pointer">
          <Gift className="w-6 h-6" />
          <span>Crear cupón</span>
        </Button>
      </DialogTrigger>

<DialogContent className="!max-w-[90vw] !w-full">
        <DialogHeader>
          <DialogTitle>Nuevo cupón</DialogTitle>
          <DialogDescription>
            Ingresa los datos para generar un nuevo cupón de descuento.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="grid md:grid-cols-2 gap-6 mt-4"
        >
          {/* 📝 Formulario */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="code">Código del cupón</Label>
              <Input
                name="code"
                id="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                placeholder="EJ: OFERTA10"
              />
            </div>

            <div>
              <Label htmlFor="discountPercentage">Descuento (%)</Label>
              <Input
                type="number"
                name="discountPercentage"
                id="discountPercentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                placeholder="Ej: 15"
              />
            </div>

            <div>
              <Label htmlFor="expiryDate">Fecha de expiración</Label>
              <Input
                type="date"
                name="expiryDate"
                id="expiryDate"
                value={formik.values.expiryDate}
                onChange={formik.handleChange}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button className="cursor-pointer" type="submit" disabled={loading}>
                {loading ? "Creando..." : "Crear cupón"}
              </Button>
            </DialogFooter>
          </div>

          {/* 👁️ Vista previa */}
          <div className="border rounded-md bg-muted p-4">
            <PromoPreview
              coupon={{
                id: 0,
                code: formik.values.code || "CUPON2024",
                discountPercentage: formik.values.discountPercentage || 0,
                active: true,
                expiryDate: new Date(formik.values.expiryDate || new Date()),
              }}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
