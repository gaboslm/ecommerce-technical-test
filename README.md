# 🌍 E-commerce en React

Este repositorio contiene la estructura, consigna y guía de desarrollo para la creación de una aplicación de comercio electrónico utilizando **React**, **React-Bootstrap**, **Font Awesome** y **React Router Dom**.

![Vista de la aplicación](https://github.com/gaboslm/ecommerce-technical-test/blob/main/src/assets/images/screen.png)

---

## 📌 Resumen

Aplicación e-commerce en React para vender productos de un rubro a elección (por ejemplo: tecnología, libros, ropa, comida, etc.). La aplicación debe ser una Single Page Application (SPA) dinámica que gestione el flujo completo de compra, desde la navegación por catálogo hasta la confirmación en el Checkout.

### Flujo Fundamental de la App:
1. **Ver un catálogo de productos** general o filtrado por categorías.
2. **Ver el detalle** técnico y comercial de un producto individual.
3. **Seleccionar cantidades y agregar** productos a un carrito de compras global.
4. **Ver un resumen de compra** detallado con la opción de finalizar el pedido.

### Mejora de UX
* Se agregó el botón de **Agregar al carrito** directamente en el listado de productos.

---

## 🚀 Instalación

Se recomienda utilizar **pnpm** como gestor de paquetes por su seguridad, eficiencia y ahorro de espacio en disco.

### Prerrequisitos
- Node.js (versión 18 o superior)
- pnpm (puedes instalarlo globalmente con `npm install -g pnpm`)

### Pasos de instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/gaboslm/ecommerce-technical-test.git
   cd ecommerce-technical-test
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

4. **Abrir en el navegador:**
   La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

### Comandos útiles
- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Crea una versión de producción
- `pnpm preview` - Previsualiza la versión de producción

---

## 🏗️ Arquitectura y Componentes

La aplicación debe estructurarse utilizando los siguientes componentes y contextos, respetando la jerarquía y responsabilidades descritas:

### 1. NavBar
* **Descripción:** Componente de navegación fijo ubicado en la parte superior de la aplicación.
* **Elementos requeridos:**
  * Logo de la tienda (enlazado al Inicio).
  * Enlaces dinámicos a las distintas categorías del catálogo (Inicio / Categorías).
  * Componente `CartWidget` integrado de forma orgánica.

### 2. CartWidget
* **Descripción:** Ícono o botón del carrito de compras que muestra de forma dinámica la cantidad de productos agregados en tiempo real.
* **Comportamiento:** Al hacer clic, debe redirigir al usuario de forma automática a la vista de resumen de compra o checkout. Se implementa utilizando íconos de Font Awesome.

### 3. ItemListContainer
* **Descripción:** Componente contenedor y de lógica para el catálogo. Recibe parámetros de la URL (como categorías) o propiedades de saludo/título.
* **Responsabilidad:** Realizar la petición asíncrona (API externa [Platzi Fake Store API](https://fakeapi.platzi.com/)) para obtener el listado de productos, gestionar el estado de carga (`loading`) y renderizar el componente `ItemList`.

### 4. ItemList
* **Descripción:** Componente de presentación pura.
* **Responsabilidad:** Recibe un array de productos como `prop` y mapea la colección para renderizar de manera iterativa una lista de componentes `Item`.

### 5. Item
* **Descripción:** Tarjeta (Card de React-Bootstrap) que representa un producto individual en el catálogo.
* **Contenido mínimo:** Imagen del producto, nombre, precio, etiqueta de categoría y un botón de acción ("Ver más" / "Detalles") que enlace a su ruta específica.

### 6. ItemDetailContainer
* **Descripción:** Componente contenedor para la vista detallada.
* **Responsabilidad:** Captura el ID del producto desde la URL mediante hooks de enrutamiento, realiza la búsqueda específica de ese ítem (asíncronamente) y renderiza el componente `ItemDetail`.

### 7. ItemDetail
* **Descripción:** Vista detallada de un producto seleccionado.
* **Contenido mínimo:** Presentación en alta resolución de la imagen, nombre, precio, descripción técnica o comercial detallada y la inclusión del componente `ItemQuantitySelector`.

### 8. ItemQuantitySelector
* **Descripción:** Controles interactivos de cantidad para el usuario antes de la adición.
* **Elementos requeridos:**
  * Botones incrementales y decrementales (`+` y `-`).
  * Incorporación del componente `AddItemButton` pasando la cantidad seleccionada.

### 9. AddItemButton
* **Descripción:** Botón de confirmación de compra.
* **Responsabilidad:** Al hacer clic, despacha la acción de agregar la cantidad seleccionada del producto actual hacia el estado global utilizando los métodos provistos por el `CartContext`.

### 10. CartContext
* **Descripción:** Contexto global de React (`useContext`) encargado de centralizar el estado del carrito de compras a lo largo de todo el ciclo de vida de la aplicación.
* **Funcionalidades requeridas:**
  * `addItem(item, quantity)`: Agrega un producto evitando duplicados (si ya existe, acumula la cantidad).
  * `removeItem(itemId)`: Remueve un producto específico del carrito.
  * `clear()`: Limpia por completo el carrito.
  * `isInCart(id)`: Verificación lógica de existencia.
  * Métodos de cálculo computados: `getCartQuantity()` (total de ítems) y `getCartTotal()` (monto total en dinero).

### 11. Checkout
* **Descripción:** Vista o contenedor final para la confirmación de la orden de compra.
* **Responsabilidad:** Renderiza el desglose completo del `Brief`, expone formularios de contacto/envío y provee la acción de "Finalizar Compra".

### 12. Brief
* **Descripción:** Componente detallado del resumen de compra (suele embeberse dentro de la vista de `Checkout`).
* **Responsabilidad:** Muestra una tabla o lista con las imágenes, nombres, cantidades, subtotal por ítem (`precio * cantidad`) y el gran total acumulado a pagar. Permite la remoción individual de ítems.

---

## 🛠️ Stack Técnico

* **Framework Base:** React con arquitectura basada en componentes funcionales y Hooks estándar (`useState`, `useEffect`, `useContext`, `useParams`).
* **Estilos y UI:** Uso estricto de componentes interactivos de **React-Bootstrap** (Navbars, Cards, Buttons, Spinners, Grids) junto con iconos vectoriales de **Font Awesome**.
* **Enrutamiento:** Implementación de rutas dinámicas mediante `react-router-dom` para separar claramente las vistas de Catálogo (`/`), Categorías (`/category/:slug`), Detalles (`/item/:slug`) y Checkout (`/cart` o `/checkout`).
* **Asincronismo:** Simulación de peticiones de red (promesas con retraso simulado mediante `setTimeout`) o consumo de una API REST/Firebase para la persistencia del catálogo de datos.
* **Código Limpio:** Código estructurado bajo las mejores prácticas (Clean Code), con nombres de variables semánticos, correcta indentación y comentarios descriptivos en los bloques de lógica compleja.

---

## 📁 Estructura de Carpetas

```text
src/
├── assets/             # Imágenes, logos y recursos estáticos
├── components/         # Componentes de presentación y contenedores
│   ├── NavBar/
│   ├── CartWidget/
│   ├── ItemListContainer/
│   ├── ItemList/
│   ├── Item/
│   ├── ItemDetailContainer/
│   ├── ItemDetail/
│   ├── ItemQuantitySelector/
│   ├── AddItemButton/
│   ├── Checkout/
│   └── Brief/
├── context/            # Contextos globales de la aplicación
│   └── CartContext.jsx
├── mock/               # Datos simulados de productos (async mock)
│   └── products.json
├── App.jsx             # Componente raíz con la configuración de rutas y Providers
└── main.jsx            # Punto de entrada de la aplicación