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
├── app/                         # Shell de la aplicación y configuración de rutas
├── assets/                      # Imágenes e iconos SVG
├── components/                  # Componentes presentacionales compartidos
├── domains/
│   ├── cart/
│   │   ├── data-access/         # Persistencia del carrito
│   │   ├── features/            # Funcionalidades conectadas del carrito
│   │   ├── pages/               # Páginas del dominio
│   │   ├── state/               # Contexto, reducer y contratos de estado
│   │   └── types/               # Modelos del dominio
│   └── catalog/
│       ├── data-access/         # API, DTO y mappers DTO → dominio
│       ├── hooks/               # Hooks propios del catálogo
│       ├── pages/               # Páginas y composición
│       ├── types/               # Modelos del dominio
│       └── view-models/         # Mappers dominio → presentación
├── styles/                      # Estilos y breakpoints compartidos
├── test/                        # Configuración global de las pruebas
├── index.scss                   # Estilos globales
└── main.tsx                     # Punto de entrada
```

## Arquitectura

El proyecto utiliza una **arquitectura modular orientada a dominios, con separación por capas y features**. No implementa Feature-Sliced Design ni Clean Architecture de forma estricta, aunque adopta algunas de sus ideas: dependencias dirigidas, aislamiento del dominio y separación entre presentación y coordinación.

Las responsabilidades se distribuyen de la siguiente manera:

- `app` compone la aplicación, el encabezado y las rutas.
- `components` contiene componentes visuales compartidos. Reciben datos y callbacks mediante props y no importan tipos, estado ni acceso a datos de los dominios.
- `domains` agrupa el comportamiento por área de negocio, actualmente `catalog` y `cart`.
- `pages` obtiene datos y compone componentes, ViewModels y features para construir una ruta completa.
- `features` contiene capacidades conectadas a estado o navegación que pertenecen a un dominio. Por ejemplo, `cart-link` consulta el carrito y decide si debe mostrarse según la ruta actual.
- `data-access` encapsula API, persistencia, DTO y transformaciones de datos externos.
- `types` define los modelos internos de cada dominio.
- `state` gestiona el estado y las operaciones propias del dominio.
- `view-models` transforma modelos de dominio en datos preparados para componentes presentacionales.

El flujo principal de datos es:

```text
API / localStorage
       ↓
data-access y mappers de entrada
       ↓
modelos de dominio
       ↓
ViewModel mappers / features / pages
       ↓
componentes presentacionales
```

### Reglas de dependencias

- Los componentes de `src/components` no deben importar desde `src/domains`.
- Los dominios pueden utilizar componentes compartidos y adaptar sus modelos a las props mediante ViewModels.
- Los DTO no deben llegar directamente a páginas o componentes; se convierten primero en modelos del dominio.
- Una feature puede conocer el estado y la navegación necesarios para ejecutar su caso de uso, pero debe mantener esos detalles fuera de los componentes presentacionales.
- Las páginas coordinan una ruta completa; la lógica reutilizable o con identidad propia debe extraerse a una feature, un mapper, un hook o el estado del dominio según su responsabilidad.

## Validación antes de publicar

```bash
npm run lint
npm run test:run
npm run build
```

La compilación resultante se guarda en `dist/` y puede desplegarse en cualquier servicio de alojamiento estático. Como la aplicación usa rutas del lado del cliente, el servidor debe redirigir las rutas desconocidas a `index.html`.

## Estado actual

El flujo de catálogo y carrito está implementado. El botón de pago forma parte de la interfaz, pero todavía no está conectado a una pasarela de pago.
