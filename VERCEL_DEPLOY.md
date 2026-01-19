# Guía de Despliegue en Vercel

## Pasos para Desplegar

### 1. Preparar el Repositorio

Asegúrate de que tu proyecto esté en GitHub y que todos los cambios estén commiteados:

```bash
git add .
git commit -m "Configuración para Vercel"
git push origin main
```

### 2. Instalar Dependencias Localmente (Opcional)

Si quieres probar el build localmente antes de desplegar:

```bash
npm install
npm run build
```

Esto debería crear la carpeta `dist/public` con los archivos estáticos.

### 3. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración desde `vercel.json`

### 4. Configuración en Vercel

Vercel debería detectar automáticamente:
- **Framework Preset**: Otro (o Node.js)
- **Build Command**: `npm run build` (desde `vercel.json`)
- **Output Directory**: `dist/public` (desde `vercel.json`)
- **Install Command**: `npm install`

### 5. Variables de Entorno (Si las necesitas)

Si tu aplicación requiere variables de entorno:
1. En el dashboard de Vercel, ve a Settings → Environment Variables
2. Agrega las variables necesarias (por ejemplo, `NODE_ENV=production`)

### 6. Desplegar

1. Haz clic en "Deploy"
2. Vercel ejecutará:
   - `npm install`
   - `npm run build`
   - Desplegará los archivos estáticos y la función serverless

### 7. Verificar el Despliegue

Una vez completado el despliegue:
- La aplicación debería estar disponible en la URL proporcionada por Vercel
- Los assets deberían cargarse correctamente
- Las rutas de la SPA deberían funcionar
- La API en `/api/chat` debería funcionar

## Estructura de Archivos para Vercel

```
Sourcyinc-agent/
├── api/
│   └── index.ts          # Handler serverless para Vercel
├── vercel.json           # Configuración de Vercel
├── package.json
├── vite.config.ts
└── dist/
    └── public/           # Archivos estáticos (generados por build)
        ├── index.html
        ├── assets/
        └── ...
```

## Solución de Problemas

### Problema: Se muestra el contenido de `index-prod.ts`

**Solución**: Esto significa que Vercel no está usando el handler serverless. Asegúrate de:
1. Que el archivo `api/index.ts` existe
2. Que `vercel.json` tiene la configuración correcta
3. Que las dependencias `@vercel/node` y `serverless-http` están instaladas

### Problema: Los assets no se cargan

**Solución**: 
1. Verifica que el build se completó correctamente (`dist/public/assets/` debería existir)
2. Revisa la consola del navegador para ver errores 404
3. Asegúrate de que los assets se importan como módulos ES (no rutas absolutas)

### Problema: Error 500 en producción

**Solución**:
1. Revisa los logs de Vercel en el dashboard
2. Verifica que todas las dependencias están en `package.json`
3. Asegúrate de que `NODE_ENV=production` está configurado

### Problema: Las rutas de la SPA no funcionan

**Solución**: El handler serverless ya está configurado para redirigir todas las rutas no-API a `index.html`. Si no funciona:
1. Verifica que `vercel.json` tiene el rewrite correcto
2. Revisa que `api/index.ts` está sirviendo `index.html` para rutas no-API

## Comandos Útiles

```bash
# Build local
npm run build

# Verificar que dist/public existe
ls -la dist/public

# Instalar dependencias de Vercel
npm install @vercel/node serverless-http

# Probar localmente (opcional, requiere configuración adicional)
vercel dev
```

## Notas Importantes

- Vercel usa serverless functions, por lo que el servidor Express se convierte en una función serverless
- Los archivos estáticos se sirven desde `dist/public`
- Todas las rutas se redirigen a `/api` que maneja tanto la API como el SPA
- El handler serverless busca los archivos estáticos en varias ubicaciones posibles

