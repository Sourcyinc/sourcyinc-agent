# Sourcy Agent

Aplicación de agentes AI con chat integrado.

## Ejecutar localmente

### Prerrequisitos
- Node.js 20.19.0+ o 22.12.0+ (recomendado)
- npm o yarn

### Cambiar versión de Node.js (si usas nvm)

Si tienes múltiples versiones de Node.js instaladas:

```bash
# Ver versiones instaladas
nvm list

# Cambiar a Node.js 20
nvm use 20

# O cambiar a Node.js 22
nvm use 22
```

### Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   
   **En Windows (PowerShell o CMD):**
   ```bash
   npm run dev:win
   ```
   
   **En Linux/Mac:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - La aplicación estará disponible en: `http://localhost:5000`

### Scripts disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo (Linux/Mac)
- `npm run dev:win` - Ejecuta el servidor en modo desarrollo (Windows)
- `npm run dev:client` - Ejecuta solo el cliente Vite en el puerto 5000
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run check` - Verifica tipos TypeScript

### Debugging

Si necesitas ver los logs del servidor:
- Los logs aparecerán en la terminal donde ejecutaste `npm run dev` o `npm run dev:win`
- Las peticiones a `/api/chat` mostrarán logs detallados en la consola
