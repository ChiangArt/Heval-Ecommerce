import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { AddProductModal } from "@/components/admin/AddProductModal";
import { AddCollectionModal } from "@/components/admin/AddCollectionModal";
import { AddCouponModal } from "@/components/admin/AddCouponModal";
import { AddBannerModal } from "@/components/admin/AddBannerModal";

interface QuickActionsProps {
  onOpenProductModal: () => void;
  isProductModalOpen: boolean;
  onProductModalChange: (open: boolean) => void;
  onUpdate: () => void;
}

export function QuickActions({
  onOpenProductModal,
  isProductModalOpen,
  onProductModalChange,
  onUpdate,
}: QuickActionsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Button
        variant="outline"
        className="h-24 flex-col gap-2 w-full cursor-pointer"
        onClick={onOpenProductModal}
      >
        <Package className="h-6 w-6" />
        <span>Agregar producto</span>
      </Button>

      <AddProductModal
        open={isProductModalOpen}
        onOpenChange={onProductModalChange}
        onUpdate={onUpdate}
      />
      <AddCollectionModal />
      <AddCouponModal />
      <AddBannerModal />
    </div>
  );
}
