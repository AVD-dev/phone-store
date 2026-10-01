# Phone Store

Aplicación web de una tienda de smartphones. Permite consultar el catálogo, buscar productos, revisar sus especificaciones y variantes, explorar artículos similares y gestionar un carrito persistente.

## Funcionalidades

- Listado de hasta 20 smartphones obtenidos desde una API externa.
- Búsqueda por texto con *debounce* de 300 ms.
- Página de detalle con colores, capacidades, precios y especificaciones.
- Selección de color y almacenamiento antes de añadir un producto al carrito.
- Carrusel de productos similares.
- Carrito con cálculo del total y eliminación de artículos.
- Persistencia del carrito en `localStorage`.
- Diseño responsive.
- Pruebas unitarias y de componentes.

## Tecnologías

- React 19
- TypeScript
- Vite 8
- React Router 7
- Sass
- Vitest y Testing Library
- ESLint
- React Compiler
- SVGR

## Requisitos

- Node.js 22.13 o una versión posterior compatible.
- npm.
- URL y clave de acceso para la API de productos.

## Instalación

1. Clona el repositorio y entra en el directorio del proyecto.

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd phone-store
   ```

2. Instala las dependencias.

   ```bash
   npm ci
   ```

3. Crea un archivo `.env` en la raíz:

   ```env
   VITE_API_URL=https://api.example.com/products
   VITE_API_KEY=your-api-key
   ```

   `VITE_API_URL` debe apuntar al endpoint base del catálogo. La aplicación añade el identificador del producto a esa URL para consultar el detalle.

4. Inicia el servidor de desarrollo.

   ```bash
   npm run dev
   ```

5. Abre la dirección que Vite muestre en la terminal, normalmente `http://localhost:5173`.

> Las variables con prefijo `VITE_` quedan expuestas en el código del navegador. La clave configurada debe estar preparada para uso público o protegida mediante un backend intermedio.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el entorno de desarrollo con recarga en caliente. |
| `npm run build` | Comprueba TypeScript y genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run test` | Ejecuta Vitest en modo interactivo. |
| `npm run test:run` | Ejecuta una única pasada de la suite de pruebas. |
| `npm run lint` | Analiza el proyecto con ESLint. |

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Redirige al catálogo. |
| `/list` | Listado y búsqueda de smartphones. |
| `/phones/:phoneId` | Detalle y configuración de un producto. |
| `/cart` | Contenido y total del carrito. |

## Estructura del proyecto

```text
src/
├── app/                 # Aplicación, cabecera y configuración de rutas
├── assets/              # Imágenes e iconos SVG
├── components/          # Componentes compartidos
├── domains/
│   ├── cart/            # Estado, persistencia, páginas y UI del carrito
│   └── catalog/         # API, modelos, páginas y UI del catálogo
├── styles/              # Estilos y breakpoints compartidos
├── test/                # Configuración global de las pruebas
├── index.scss           # Estilos globales
└── main.tsx             # Punto de entrada
```

El código se organiza por dominios. Cada dominio agrupa sus páginas, componentes visuales, tipos, estado y acceso a datos. Los DTO recibidos desde la API se transforman mediante *mappers* antes de llegar a las vistas que lo necesitan.

## Validación antes de publicar

```bash
npm run lint
npm run test:run
npm run build
```

La compilación resultante se guarda en `dist/` y puede desplegarse en cualquier servicio de alojamiento estático. Como la aplicación usa rutas del lado del cliente, el servidor debe redirigir las rutas desconocidas a `index.html`.

## Estado actual

El flujo de catálogo y carrito está implementado. El botón de pago forma parte de la interfaz, pero todavía no está conectado a una pasarela de pago.
