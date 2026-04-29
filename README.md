# 🛒 Shopping Cart App

Aplicación de carrito de compras desarrollada con **React + TypeScript + Vite**, enfocada en buenas prácticas, arquitectura escalable y manejo de estado.

---

## 🌐 Demo

Puedes ver la aplicación desplegada aquí:

👉 https://prueba-sodimac.vercel.app/

La aplicación soporta navegación directa a rutas internas gracias a la configuración de rewrites en Vercel para aplicaciones SPA.

---

## 🚀 Cómo correr el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/narendavid/prueba-sodimac
cd prueba-sodimac
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador:

```
http://localhost:5173
```

---

## 🧠 Decisiones técnicas

### 1. Arquitectura basada en features

Se organizó el proyecto por funcionalidades (`products`, `cart`) en lugar de por tipo de archivo, lo que facilita la escalabilidad y el mantenimiento.

---

### 2. Uso de Context + useReducer

El estado del carrito se maneja con `useReducer` para tener una lógica más predecible y escalable frente a múltiples acciones (agregar, eliminar, actualizar cantidad).

---

### 3. Uso de mappers para la API

Se implementó una capa de transformación de datos (mapper) para desacoplar la estructura del backend del frontend, evitando dependencias directas.

---

### 4. Hooks personalizados

Se crearon hooks como `useProducts` y `useCart` para encapsular la lógica de negocio y mantener los componentes más limpios y reutilizables.

---

### 5. Persistencia con localStorage

El carrito se guarda en `localStorage` para mantener la información incluso después de recargar o cerrar la aplicación.

---

## 📦 Tecnologías

* React
* TypeScript
* Vite
* React Router DOM

---

## ✨ Notas

La UI se mantuvo simple para priorizar la lógica, arquitectura y manejo de estado.
