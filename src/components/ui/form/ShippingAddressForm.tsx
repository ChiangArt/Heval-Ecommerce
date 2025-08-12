"use client";
import { useEffect, useState } from "react";
import { createPreference, postOrder } from "@/core/order/action/order.actions";
import {
  ShippingFormValues,
  shippingInfoSchema,
} from "@/core/validations/shipping-info/shippingInfo";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { logError } from "@/app/utils/logger";

type District = {
  ubigeo: string;
  id: number;
  inei?: string;
};

type Province = {
  [districtName: string]: District;
};

type Department = {
  [provinceName: string]: Province;
};

type UbigeoData = {
  [departmentName: string]: Department;
};

const initialValues: ShippingFormValues & {
  department: string;
  province: string;
  district: string;
} = {
  fullAddress: "",
  apartmentOrFloor: "",
  reference: "",
  additionalInfo: "",
  department: "",
  province: "",
  district: "",
};

export default function ShippingAddressForm() {
  const [ubigeoData, setUbigeoData] = useState<UbigeoData>({});
  const [departamentos, setDepartamentos] = useState<string[]>([]);
  const [provincias, setProvincias] = useState<string[]>([]);
  const [distritos, setDistritos] = useState<District[]>([]);

  // Cargar JSON del Ubigeo (puede ser desde un archivo local o url)
  useEffect(() => {
    fetch("https://free.e-api.net.pe/ubigeos.json") // Cambia por la ruta real de tu JSON
      .then((res) => res.json())
      .then((data: UbigeoData) => {
        setUbigeoData(data);
        setDepartamentos(Object.keys(data));
      })
      .catch(() => {
        setUbigeoData({});
        setDepartamentos([]);
      });
  }, []);

  const handleDepartmentChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const dpto = e.target.value;
    setFieldValue("department", dpto);
    setFieldValue("province", "");
    setFieldValue("district", "");
    setProvincias([]);
    setDistritos([]);

    if (dpto && ubigeoData[dpto]) {
      setProvincias(Object.keys(ubigeoData[dpto]));
    }
  };

  const handleProvinceChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    department: string,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const prov = e.target.value;
    setFieldValue("province", prov);
    setFieldValue("district", "");
    setDistritos([]);

    if (department && prov && ubigeoData[department]?.[prov]) {
      const districtsObj = ubigeoData[department][prov];
      setDistritos(Object.values(districtsObj));
    }
  };

  const handleDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    setFieldValue("district", e.target.value);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const contactData = JSON.parse(
      localStorage.getItem("guest_contact_info") || "{}"
    );

    const shippingInfo = {
      ...contactData,
      ...values,
      district: values.district || contactData.district || "Lima",
      province: values.province || contactData.province || "Lima",
      department: values.department || contactData.department || "Lima",
    };

    try {
      const orderCreated = await postOrder(shippingInfo);
      const orderId = orderCreated.orderId;
      if (!orderId) {
        alert("No se pudo obtener el ID de la orden.");
        return;
      }

      localStorage.setItem("current_order_id", orderId.toString());
      const initPoint = await createPreference(orderId);
      window.location.href = initPoint;
    } catch (error) {
      logError("Error durante el proceso de checkout:", error);
      alert("Ocurrió un error al finalizar el pedido.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        try {
          shippingInfoSchema.parse(values);
          return {};
        } catch {
          return {};
        }
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="text-secundario bg-white p-10 max-w-2xl mx-auto text-sm md:text-md">
          <div className="flex flex-row items-center gap-2 border-b-2 pb-4 mb-10">
            <span className="p-1 px-3 bg-primario text-white text-lg font-semibold">
              2
            </span>
            <h2 className="font-bold">Información de envío</h2>
          </div>

          <h3 className="font-bold pb-3">DATOS DE ENVÍO</h3>

          {/* Dirección completa */}
          <label className="block mb-2">
            Dirección completa
            <Field
              name="fullAddress"
              placeholder="Ingresa tu dirección"
              className="w-full border px-3 py-2 mt-1"
            />
            <ErrorMessage
              name="fullAddress"
              component="p"
              className="text-red-500 text-sm"
            />
          </label>

          {/* Piso / Depto */}
          <label className="block mb-2 mt-4">
            Piso / Depto
            <Field
              name="apartmentOrFloor"
              placeholder="Ej: Piso 3, Depto A"
              className="w-full border px-3 py-2 mt-1"
            />
            <ErrorMessage
              name="apartmentOrFloor"
              component="p"
              className="text-red-500 text-sm"
            />
          </label>

          {/* Referencia */}
          <label className="block mb-2 mt-4">
            Referencia
            <Field
              name="reference"
              placeholder="Alguna referencia adicional"
              className="w-full border px-3 py-2 mt-1"
            />
            <ErrorMessage
              name="reference"
              component="p"
              className="text-red-500 text-sm"
            />
          </label>

          {/* Información adicional */}
          <label className="block mb-2 mt-4">
            Información adicional
            <Field
              name="additionalInfo"
              placeholder="Algo que consideres importante"
              className="w-full border px-3 py-2 mt-1"
            />
            <ErrorMessage
              name="additionalInfo"
              component="p"
              className="text-red-500 text-sm"
            />
          </label>

          {/* Departamento */}
          <label className="block mb-2 mt-4">
            Departamento
            <select
              name="department"
              value={values.department}
              onChange={(e) => handleDepartmentChange(e, setFieldValue)}
              className="w-full border px-3 py-2 mt-1"
              required
            >
              <option value="">Seleccione departamento</option>
              {departamentos.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ErrorMessage
              name="department"
              component="p"
              className="text-red-500 text-sm"
            />
          </label>

          {/* Provincia */}
          <label className="block mb-2 mt-4">
            Provincia
            <select
              name="province"
              value={values.province}
              onChange={(e) =>
                handleProvinceChange(e, values.department, setFieldValue)
              }
              disabled={!values.department}
              className="w-full border px-3 py-2 mt-1"
              required
            >
              <option value="">Seleccione provincia</option>
              {provincias.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ErrorMessage
              name="province"
              component="p"
              className="text-red-500 text-sm"
            />
          </label>

          {/* Distrito */}
          <label className="block mb-2 mt-4">
            Distrito
            <select
              name="district"
              value={values.district}
              onChange={(e) => handleDistrictChange(e, setFieldValue)}
              disabled={!values.province}
              className="w-full border px-3 py-2 mt-1"
              required
            >
              <option value="">Seleccione distrito</option>
              {distritos.map((d) => {
                const districtName = Object.keys(
                  ubigeoData[values.department][values.province]
                ).find(
                  (k) =>
                    ubigeoData[values.department][values.province][k].ubigeo ===
                    d.ubigeo
                );
                return (
                  <option key={d.ubigeo} value={districtName}>
                    {districtName}
                  </option>
                );
              })}
            </select>
            <ErrorMessage
              name="district"
              component="p"
              className="text-red-500 text-sm"
            />
          </label>

          <div className="mt-6">
            <button
              type="submit"
              className="cursor-pointer bg-primario text-white py-3 px-6 font-bold hover:bg-opacity-90 transition w-full"
            >
              REALIZAR PAGO
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
