# � Shopping Cart - Sodimac

Aplicación web de carrito de compras desarrollada con React 19, TypeScript y Vite. Integrada con API de Sodimac para obtener el catálogo de productos en tiempo real.

## 🚀 Cómo correr el proyecto

### Requisitos previos
- **Node.js** 18+ 
- **npm** o **yarn**

### Instalación y ejecución

```bash
# 1. Clonar o descargar el proyecto
cd prueba-sodimac

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en el navegador
# La aplicación estará disponible en: http://localhost:5173
```

### Comandos disponibles

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot reload |
| `npm run build` | Compila TypeScript y genera build de producción |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Ejecuta ESLint para validar el código |

## 🏗️ Decisiones Técnicas

### 1. **Arquitectura Feature-based**
```
src/
├── features/
│   ├── cart/       # Lógica del carrito
│   └── products/   # Lógica de productos
├── pages/          # Páginas de la aplicación
├── layouts/        # Componentes envolventes
├── services/       # Llamadas API y mapeo de datos
├── store/          # Estado global (reducers)
└── types/          # Tipos TypeScript
```

**Ventajas:**
- **Escalabilidad**: Fácil agregar nuevas features sin afectar existentes
- **Encapsulación**: Cada feature es autónoma e independiente
- **Mantenibilidad**: Código organizado por dominio, no por tipo
- **Reutilización**: Lógica compartida mediante hooks personalizados

### 2. **Context API + useReducer para estado global**

Se eligió Context API en lugar de Redux/Zustand porque:
- ✅ **Sin dependencias externas**: Reduce el weight del bundle
- ✅ **Type-safe con TypeScript**: Tipos claros y autocompletado
- ✅ **useReducer para lógica compleja**: Manejo predictible del estado
- ✅ **Perfecta para proyectos medianos**: No overkill
- ✅ **Performance**: Con React.memo y memoización evitamos re-renders innecesarios

```typescript
// Ejemplo: cart.context.tsx
const [state, dispatch] = useReducer(cartReducer, initialState);
const addItem = useCallback((product, quantity) => {
  dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
}, []);
```

### 3. **React Router v7 para navegación**

Proporciona:
- Routing declarativo y type-safe
- Parámetros dinámicos (ej: `/product/:id`)
- Mejor UX con transiciones suaves
- Navegación basada en componentes

### 4. **CSS Modules sin librerías UI**

Se evitaron Bootstrap/Material-UI porque:
- ✅ **Control total del diseño**: Personalizaciones sin limitaciones
- ✅ **Menor bundle size**: Sin CSS innecesario
- ✅ **Estilos encapsulados**: No hay conflictos de nombres
- ✅ **Mejor rendimiento en mobile**: Menos CSS para parsear
- ✅ **Mantenimiento simplificado**: CSS colocado junto a componentes

**Ejemplo de responsive design:**
```css
.item {
  grid-template-columns: 80px 1fr auto auto auto; /* Desktop */
}

@media (max-width: 768px) {
  .item {
    grid-template-columns: 60px 1fr 2rem; /* Mobile */
    grid-template-areas: "image info removeButton" ...;
  }
}
```

### 5. **TypeScript para type-safety**

Tipos definidos para cada entidad:
- `Product`: Modelo de producto con tipos estrictos
- `CartItem`: Producto + cantidad
- `CartState`: Estado del carrito
- Componentes con interfaces de props

**Beneficios:**
- Reduce bugs en tiempo de desarrollo
- Autocompletado en el IDE
- Documentación viva del código
- Refactorings más seguros

### 6. **Mapeo de datos API → Modelos internos**

La respuesta de la API se transforma a un modelo limpio:

```typescript
// product.mapper.ts
const mapApiProductToProduct = (item: ApiProduct): Product => ({
  id: item.id,
  name: item.name,
  price: item.price,
  priceFormatted: new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(item.price),
  image: item.imageUrl,
});
```

**Ventajas:**
- Desacoplamiento de la API: Cambios en API no rompen componentes
- Normalización de datos: Todos usan el mismo formato
- Transformaciones centralizadas: Precios, fechas, etc.
- Facilita testing: Mock de datos predecibles

### 7. **Formateo de precios con Intl.NumberFormat**

```typescript
// Formato CLP automático
new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP'
}).format(price)
// Resultado: $ 919.600
```

**Por qué NO usar librerías:**
- ✅ Nativo de JavaScript (soporte completo)
- ✅ Respeta locale del navegador
- ✅ Sin dependencias externas
- ✅ Mejor performance

### 8. **localStorage para persistencia del carrito**

El carrito se guarda automáticamente y se recupera al recargar:

```typescript
// En CartProvider
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(state));
}, [state]);

// Hidratación en mount
const [state] = useState(() => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : initialState;
});
```

**Mejoras de UX:**
- Los usuarios no pierden productos al recargar
- Persistencia sin backend
- Sincronización automática entre tabs
- Funcionamiento offline

### 9. **Optimizaciones de rendimiento**

```typescript
// React.memo: Previene re-renders innecesarios
export const ProductCard = memo(({ product }) => {
  // Solo se re-renderiza si props cambian
});

// useCallback: Funciones estables
const addItem = useCallback((product, qty) => {
  dispatch({ type: 'ADD_ITEM', payload: { product, qty } });
}, []);

// Lazy loading de imágenes
<img src={url} loading="lazy" />

// Separación en componentes pequeños
<ProductCard />        // Solo se actualiza si product cambia
<CartSummary />       // Solo se actualiza si total cambia
```

### 10. **Hooks personalizados para lógica reutilizable**

```typescript
// useCart() - Acceso centralizado al carrito
const { addItem, removeItem, updateQuantity, getTotalPrice } = useCart();

// useProducts() - Manejo de estado de lista
const { products, loading, error } = useProducts();

// useProduct(id) - Obtener producto individual
const { product, loading, error } = useProduct(productId);
```

**Beneficios:**
- Lógica desacoplada de componentes
- Reutilización entre componentes
- Fácil de testear
- Separación de concerns

## ✨ Características principales

- ✅ **Listado de productos** desde API Sodimac en tiempo real
- ✅ **Detalle de producto** en página individual con información completa
- ✅ **Carrito de compras** con agregar/eliminar/editar cantidad
- ✅ **Persistencia automática** de datos en localStorage
- ✅ **Interfaz responsiva** optimizada para desktop y mobile
- ✅ **Manejo robusto de errores** en carga de datos
- ✅ **Estados de carga** con feedback visual (Loading, Error)
- ✅ **Performance optimizado** con memoización y lazy loading

## 🛣️ Rutas disponibles

| Ruta | Descripción |
|------|------------|
| `/` | Home - Listado de productos |
| `/product/:id` | Detalle de un producto con opción de agregar al carrito |
| `/cart` | Página del carrito con resumen y opciones de compra |

## 🔗 API utilizada

```
https://apim-dev-proxy.sodhc.co/test-jasson/api/category
```

**Respuesta esperada:**
```json
[
  {
    "id": "123",
    "nombre": "Producto",
    "descripcion": "...",
    "precio": 50000,
    "imagen": "url",
    "stock": 10
  }
]
```

## 🎯 Stack tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19.2.5 | UI Framework moderno |
| **TypeScript** | 6.0.2 | Type safety y DX |
| **React Router** | 7.14.2 | Client-side routing |
| **Vite** | 8.0.10 | Build tool ultrarrápido |
| **CSS Modules** | Nativo | Estilos encapsulados |

## 📦 Estructura de carpetas

```
src/
├── features/
│   ├── cart/
│   │   ├── components/
│   │   │   ├── CartItem.tsx          # Item individual del carrito
│   │   │   ├── CartSummary.tsx       # Resumen y total
│   │   │   └── CartItem.module.css   # Estilos
│   │   ├── context/
│   │   │   └── cart.context.tsx      # Context + Reducer
│   │   ├── hooks/
│   │   │   └── useCart.ts            # Hook personalizado
│   │   └── pages/
│   │       └── CartPage.tsx
│   └── products/
│       ├── components/
│       │   ├── ProductCard.tsx       # Card individual
│       │   ├── ProductList.tsx       # Grid de productos
│       │   └── ProductDetailModal.tsx
│       ├── hooks/
│       │   ├── useProducts.ts        # Obtener listado
│       │   └── useProduct.ts         # Obtener individual
│       ├── pages/
│       │   ├── HomePage.tsx
│       │   └── ProductDetailPage.tsx
│       └── services/
│           └── product.mapper.ts     # Transformación API
├── pages/
│   └── [Páginas principales]
├── layouts/
│   ├── Header.tsx                   # Navegación
│   └── Layout.tsx                   # Wrapper principal
├── services/
│   └── product.service.ts           # Llamadas API
├── store/
│   └── cart.reducer.ts              # Lógica del reducer
├── types/
│   ├── product.ts                   # Tipos de productos
│   └── cart.ts                      # Tipos del carrito
├── utils/
│   └── formatters.ts                # Utilidades
├── App.tsx                          # Componente raíz
├── main.tsx                         # Punto de entrada
└── index.css                        # Estilos globales
```

## 🐛 Solución de problemas

### El carrito no persiste
- Verifica que localStorage esté habilitado (no estés en navegación privada)
- Revisa la consola del navegador (F12 → Application → Storage)

### Las imágenes no cargan
- Valida que la API de Sodimac esté disponible
- Revisa CORS en la pestaña Network del DevTools
- Verifica que los URLs de imagen sean válidos

### Productos no aparecen
- Abre la consola (F12) y revisa errores en la pestaña Network
- Verifica que la API responda correctamente en `/test-jasson/api/category`
- Comprueba la estructura de la respuesta contra el mapper

### Build falla por tipos TypeScript
```bash
# Valida tipos antes de build
npm run build

# O ejecuta type check manualmente
npx tsc --noEmit
```

## 📚 Recursos útiles

- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router Docs](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev)
- [MDN: Intl API](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl)

---

**Desarrollado con ❤️ para Sodimac**

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
