
interface ModalProps {
  isOpen: boolean;          
  onClose: () => void;       
  children: React.ReactNode;   
}


export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white shadow-xl p-3 relative w-full max-w-xl">
        <button
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
}
