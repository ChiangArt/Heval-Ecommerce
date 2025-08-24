<h1 align="left">
  Ecommerce Tienda "Heval"
  <img src="/public/next-js-logo-png_seeklogo-321806.png" alt="App" width="50" style="vertical-align: middle;">
</h1>

## 🚀 Demo en Vivo

Puedes ver la aplicación funcionando en este link:  

↪️ **[Heval Ecommerce](https://heval.com)** ↩️ 

## 📌 Descripción del Proyecto

**Heval Ecommerce** es una aplicación web desarrollada con **Next.js + TypeScript**, pensada para ser **rápida, escalable y segura**.  
Permite a los usuarios explorar productos, gestionar un carrito de compras y realizar un proceso de compra con una interfaz moderna y responsiva.  


### 🔑 Funcionalidades principales
- ✅ Catálogo dinámico de productos con filtros y categorías  
- 🛍️ Carrito de compras persistente  
- 💳 Checkout seguro (simulado o integrado con pasarela de pago)  
- 👤 Autenticación y gestión de usuarios  
- ⭐ Valoraciones y reseñas de productos  
- 📦 Control de inventario  
- 📊 Panel de administración (opcional, para gestionar productos y ventas)  
- 🌐 SEO optimizado y carga ultrarrápida gracias a Next.js  

---

##  Tecnologías utilizadas

- **Next.js** → Framework de React con renderizado híbrido (SSR/SSG)  
- **TypeScript** → Tipado estático para mayor robustez  
- **Tailwind CSS** → Estilos rápidos y modernos  
- **Prisma / SQL Server** → ORM para la base de datos (adaptable)  
- **NextAuth** → Autenticación de usuarios  
- **Axios / Fetch API** → Consumo de APIs  
- **Zod / Yup** → Validación de formularios  
- **Lucide Icons** → Iconografía moderna  
- **Vercel** → Despliegue y hosting
---

## 🗂️ Estructura del Proyecto

Este proyecto sigue una **arquitectura Feature-Based**, donde las carpetas se organizan en torno a **funcionalidades (features)** en lugar de hacerlo únicamente por tipo de archivo (ej. `components`, `services`, etc.).  
Esto facilita la escalabilidad, el mantenimiento y la colaboración en equipo, ya que cada "feature" tiene sus propios **componentes, hooks y lógica bien agrupada**.

### 📂 Estructura de Carpetas

```bash
src/
├── app/                  # Rutas con App Router de Next.js
│   ├── (store)/          # Páginas públicas (home, catálogo, producto)
│   ├── (auth)/           # Páginas de login / registro
│   ├── (checkout)/       # Flujo de compra
│   └── layout.tsx        # Layout global
│
├── features/             # Lógica por dominio
│   ├── products/         # Lógica y componentes de productos
│   ├── cart/             # Manejo del carrito
│   ├── auth/             # Autenticación
│   └── orders/           # Gestión de pedidos
│
├── shared/               # Código reutilizable
│   ├── components/       # Botones, inputs, modales, etc.
│   ├── hooks/            # Hooks personalizados
│   ├── types/            # Tipados globales
│   └── utils/            # Funciones de ayuda
│
├── prisma/               # Esquema de la base de datos
├── styles/               # Configuración de estilos globales
├── App.tsx
└── main.tsx              

```
##  Instalación y Uso

### 1. Clona el repositorio

```bash
git clone https://github.com/chiangart/HEVAL_ECOMMERCE.git

```

### 2. Instala las dependencias

```bash
npm install o npm i

```


### 3. Instala las dependencias

```bash
npm run dev

```

### 4. Abre en tu navegador

[http://localhost:3000](http://localhost:3000)


##  Imagenes

### Desktop
![App](/public/image.png)



##  Funcionalidades destacadas

- Catálogo dinámico de productos

- Carrito de compras persistente con estado global

- Checkout seguro con validaciones

- Autenticación de usuarios con NextAuth

- Base de datos gestionada con Java + SQL Server

- SEO optimizado y despliegue en Vercel



##  Autor

[Bryan Lee Chiang Arteaga]
bryan_94tj@hotmail.com

