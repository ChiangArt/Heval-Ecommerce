import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { AddCollectionModal } from "@/components/admin/AddCollectionModal";
import { AddCouponModal } from "@/components/admin/AddCouponModal";
import { AddBannerModal } from "@/components/admin/AddBannerModal";
import { CreateProductModal } from "../products/CreateProductModal";

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

      <CreateProductModal
        open={isProductModalOpen}
        onOpenChange={onProductModalChange}
        onCreated={onUpdate}
      />
      <AddCollectionModal />
      <AddCouponModal />
      <AddBannerModal />
    </div>
  );
}
