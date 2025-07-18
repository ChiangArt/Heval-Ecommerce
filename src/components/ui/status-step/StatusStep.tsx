interface StatusStepProps {
  status: "registrado" | "en_ruta" | "entregado";
  currentStatus: string;
  label: string;
  description: string;
  number: number;
}

export default function StatusStep({
  status,
  currentStatus,
  label,
  description,
  number,
}: StatusStepProps) {
  const isActive = status === currentStatus;

  return (
    <div className="flex flex-col font-bold pt-10 justify-center px-6 items-center text-center text-xs text-secundario">
      <div className="flex justify-center pt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="29"
          viewBox="0 0 10 29"
          fill="none"
        >
          <path
            d="M4.53382 28.4662C4.79129 28.7236 5.20872 28.7236 5.46618 28.4662L9.66181 24.2706C9.91927 24.0131 9.91927 23.5957 9.66181 23.3382C9.40434 23.0807 8.98691 23.0807 8.72944 23.3382L5 27.0676L1.27056 23.3382C1.01309 23.0807 0.595661 23.0807 0.338197 23.3382C0.0807324 23.5957 0.0807324 24.0131 0.338197 24.2706L4.53382 28.4662ZM5 0L4.34072 2.8818e-08L4.34072 1.16667L5 1.16667L5.65928 1.16667L5.65928 -2.8818e-08L5 0ZM5 3.5L4.34072 3.5L4.34072 5.83333L5 5.83333L5.65928 5.83333L5.65928 3.5L5 3.5ZM5 8.16667L4.34072 8.16667L4.34072 10.5L5 10.5L5.65928 10.5L5.65928 8.16667L5 8.16667ZM5 12.8333L4.34072 12.8333L4.34072 15.1667L5 15.1667L5.65928 15.1667L5.65928 12.8333L5 12.8333ZM5 17.5L4.34072 17.5L4.34072 19.8333L5 19.8333L5.65928 19.8333L5.65928 17.5L5 17.5ZM5 22.1667L4.34072 22.1667L4.34072 24.5L5 24.5L5.65928 24.5L5.65928 22.1667L5 22.1667ZM5 26.8333L4.34072 26.8333L4.34072 28L5 28L5.65928 28L5.65928 26.8333L5 26.8333Z"
            fill="#092059"
          />
        </svg>
      </div>

      <div className="flex w-full justify-center text-center">
        <span className="bg-primario p-3 text-white">{number}</span>
        <span
          className={`p-3 px-8 font-bold ${
            isActive ? "bg-terciario text-primario" : "bg-white"
          }`}
        >
          {label}
        </span>
      </div>

      <span className="pt-2">{description}</span>
    </div>
  );
}

export function mapBackendStatusToStep(
  status: string
): "registrado" | "en_ruta" | "entregado" {
  switch (status) {
    case "CREATED":
    case "PENDING_PAYMENT":
    case "PAID":
    case "PROCESSING":
      return "registrado";
    case "SHIPPED":
      return "en_ruta";
    case "DELIVERED":
      return "entregado";
    default:
      return "registrado"; // por defecto
  }
}
