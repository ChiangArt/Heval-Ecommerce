// components/ui/promo/PromoPreview.tsx
import { Coupon } from "@/core/coupon/interface/CouponResponse";
import Logo from "@/components/ui/logo/Logo";

interface Props {
  coupon: Coupon;
}

export const PromoPreview = ({ coupon }: Props) => {
  return (
    <div className="w-full text-center space-y-6 p-8 rounded border bg-muted">
      <div className="space-y-2 flex flex-col justify-center items-center">
        <Logo className="text-black w-40 h-auto" />
        <h2 className="text-2xl font-bold">
          ¡Toda la web {coupon.discountPercentage}% OFF!
        </h2>
        <p className="text-sm text-muted-foreground">
          Código: <span className="font-mono font-semibold">{coupon.code}</span>
        </p>
        <p className="text-sm mt-2">
          Ingresa tu correo y obtén descuentos exclusivos y acceso anticipado a
          nuestros lanzamientos.
        </p>
      </div>
    </div>
  );
};
