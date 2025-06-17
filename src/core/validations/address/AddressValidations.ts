// src/core/validations/address/AddressValidations.ts
import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
  fullAddress: Yup.string().required("Dirección completa requerida"),
  apartmentOrFloor: Yup.string().required("Apartamento o piso requerido"),
  district: Yup.string().required("Distrito requerido"),
  province: Yup.string().required("Provincia requerida"),
  department: Yup.string().required("Departamento requerido"),
  reference: Yup.string().required("Referencia requerida"),
  additionalInfo: Yup.string().required("Información adicional requerida"),
});
