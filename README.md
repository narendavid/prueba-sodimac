# 🛍️ Shopping Cart - Tienda Online Moderna

Proyecto de **Shopping Cart** completo construido con **React 19**, **TypeScript**, **Vite** y **Clean Architecture**.

## ✨ Características

- ✅ **Listado de Productos**: Consumo de API externa con mapeo de datos
- ✅ **Carrito de Compras**: Agregar, eliminar y modificar cantidades
- ✅ **Persistencia**: LocalStorage automático del carrito
- ✅ **Detalle de Producto**: Página individual con información completa
- ✅ **Performance**: React.memo, useCallback, lazy loading
- ✅ **TypeScript**: Tipado total y seguridad de tipos
- ✅ **CSS Modules**: Estilos modulares sin librerías UI
- ✅ **Responsive**: Diseño adaptable a todos los dispositivos

## 🏗️ Arquitectura

```
src/
├── app/
│   └── router.tsx           # Configuración de rutas
├── features/
│   ├── products/
│   │   ├── components/      # ProductCard, ProductList
│   │   ├── hooks/           # useProducts, useProduct
│   │   ├── pages/           # HomePage, ProductDetailPage
│   │   └── services/        # product.mapper.ts
│   └── cart/
│       ├── components/      # CartItem, CartSummary
│       ├── context/         # cart.context.tsx (Context + Reducer)
│       ├── hooks/           # useCart
│       └── pages/           # CartPage
├── components/
│   ├── ui/                  # Loading, Error
│   └── layout/              # Header, Layout
├── services/
│   └── product.service.ts   # API calls
├── types/
│   ├── product.ts           # Product, ApiProduct
│   └── cart.ts              # CartItem, CartState
├── utils/
│   └── formatters.ts        # Formateo de precios
├── App.tsx                  # Componente raíz con CartProvider
├── main.tsx                 # Punto de entrada
└── index.css                # Estilos globales
```

## 🚀 Inicio Rápido

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 📝 Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio - Listado de productos |
| `/product/:id` | Página de detalle de producto |
| `/cart` | Página del carrito |

## 🔧 Tecnologías Utilizadas

- **React 19.2** - Librería UI
- **TypeScript 6.0** - Lenguaje tipado
- **Vite 8.0** - Build tool y dev server
- **React Router 7.14** - Enrutamiento
- **Context API + useReducer** - Gestión de estado
- **CSS Modules** - Estilos modulares
- **Fetch API** - Llamadas HTTP

## 💡 Conceptos Clave

### 1. **Feature-Based Architecture**
La aplicación está organizada por features (productos, carrito) con su propia lógica, componentes y servicios.

### 2. **Context API + Reducer**
Estado global del carrito manejado con `useReducer` para lógica compleja y consistente.

```typescript
// Acceso al contexto
const { addItem, removeItem, getTotalPrice } = useCart();
```

### 3. **Mapeo de Datos**
La respuesta de la API se transforma a un modelo limpio y tipado:

```typescript
// API responde con campos diferentes
{ nombre, marca, imagen, precio, ... }

// Se mapea a nuestro modelo
{ name, brand, image, price, priceFormatted, ... }
```

### 4. **Persistencia Automática**
El carrito se guarda en `localStorage` automáticamente y se restaura al cargar la página.

### 5. **Hooks Personalizados**
Encapsulan la lógica de negocios:
- `useCart()` - Acceso al carrito
- `useProducts()` - Obtener lista de productos
- `useProduct(id)` - Obtener producto individual

## 📊 Flujo de Datos

```
HomePage
  ↓
useProducts() → API → mapApiProductsToProducts() → ProductList → ProductCard
                                                         ↓
                                                   useCart().addItem()
                                                         ↓
                                                  CartContext (localStorage)
                                                         ↓
                                                    CartPage
```

## ⚡ Performance

- **React.memo**: Previene re-renders innecesarios en ProductCard y CartItem
- **useCallback**: Funciones estables en el contexto
- **useMemo**: Cálculos memorizados en resúmenes
- **Lazy loading**: Imágenes con atributo `loading="lazy"`

## 🎨 Estilos

Sin dependencias de librerías UI. Todo hecho con CSS Modules puro:
- Colores consistentes
- Diseño responsive
- Transiciones suaves
- Hover states definidos

### Paleta de Colores
- **Primario**: #3498db (azul)
- **Éxito**: #27ae60 (verde)
- **Peligro**: #e74c3c (rojo)
- **Neutro**: #2c3e50, #7f8c8d, #ecf0f1

## 🐛 Manejo de Errores

- Try/catch en servicios API
- Estados de carga y error en hooks
- Componentes UI para mostrar errores
- Logs en consola para debugging

## 📱 Responsividad

Breakpoints:
- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px

Grid de productos se adapta automáticamente.

## 🔐 Validaciones

- Cantidades positivas
- Producto válido antes de agregar al carrito
- Precio validado en mapper
- IDs únicos para productos

## 🌐 API

Endpoint utilizado:
```
GET https://apim-dev-proxy.sodhc.co/test-jasson/api/category
```

Respuesta transformada a modelo Product.

## 📦 Dependencias

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router": "^7.14.2"
}
```

## 🛠️ Mejoras Futuras

- [ ] Búsqueda y filtrado de productos
- [ ] Categorías
- [ ] Carrito con descuentos y cupones
- [ ] Sistema de favoritos
- [ ] Integración con pasarela de pago real
- [ ] Historial de pedidos
- [ ] Autenticación de usuario

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Desarrollado con ❤️ usando React + TypeScript**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
