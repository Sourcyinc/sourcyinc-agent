# Diagnóstico del Problema 504 en Vercel

## Problema
Todas las peticiones dan 504 (Gateway Timeout), incluyendo `/api/health`. Esto sugiere que:
1. La función serverless **NO se está ejecutando** en absoluto, O
2. La función se está **bloqueando durante la inicialización** y nunca completa

## Pasos para Diagnosticar

### Paso 1: Verificar que la función se ejecuta (Logs inmediatos)

He agregado logs **al inicio** de la función `vercelHandler` que se ejecutan ANTES de cualquier inicialización:

```typescript
console.log(`[VERCEL HANDLER] Function called at ${new Date().toISOString()}`);
```

**Acción:**
1. Ve a Vercel Dashboard → Tu Proyecto → Functions → api/index.ts
2. Abre "View Function Logs" o "Real-time Logs"
3. Haz una petición a `https://www.sourcylab.com/api/health`
4. **Busca en los logs**: `[VERCEL HANDLER] Function called`

**Resultado Esperado:**
- ✅ Si ves `[VERCEL HANDLER] Function called`: La función SÍ se está ejecutando
- ❌ Si NO ves nada: La función NO se está ejecutando (problema de configuración de Vercel)

### Paso 2: Si la función NO se ejecuta

**Posibles causas:**
1. El archivo `api/index.ts` no está en el lugar correcto
2. El `vercel.json` tiene un error
3. El build falló y la función no existe
4. Vercel no está detectando la función

**Solución:**
1. Verifica que `api/index.ts` existe en la raíz del proyecto
2. Verifica el deployment en Vercel - debería mostrar "Functions" con `api/index.ts`
3. Revisa los logs del build para ver si hubo errores

### Paso 3: Si la función SÍ se ejecuta pero da 504

**Busca en los logs:**
- `[VERCEL HANDLER] Starting initialization...` - Inicialización empezó
- `[InitializeApp] Starting initialization...` - Inicialización de la app empezó
- `[InitializeApp] API routes registered` - Rutas registradas
- `[InitializeApp] Initialization complete` - Inicialización completa

**Si ves el primer log pero no los siguientes:**
- La inicialización se está bloqueando en algún punto
- Posible causa: `fs.existsSync()` o `registerRoutes()` está tardando demasiado

**Solución:**
- El health check ahora tiene un "fast path" que responde SIN inicializar todo
- Si aún da timeout, el problema es antes de llegar a la función

### Paso 4: Probar la función de test

He creado `api/test.ts` como función de prueba ultra-simple.

**Acción:**
1. Temporalmente cambia `vercel.json` para usar `api/test.ts` en lugar de `api/index.ts`
2. O prueba accediendo a `/api/test` si tienes múltiples funciones

Si `api/test.ts` funciona pero `api/index.ts` no, el problema está en la inicialización de `index.ts`.

## Cambios Realizados

### 1. Fast Path para Health Check
El health check ahora responde INMEDIATAMENTE sin esperar la inicialización completa:

```typescript
if (req.url === "/api/health" && req.method === "GET") {
  return res.json({ status: "ok", ... });
}
```

### 2. Logging Exhaustivo
Logs en cada paso:
- Cuando la función se llama
- Antes de inicializar
- Durante la inicialización
- Después de inicializar
- Si hay errores

### 3. Función de Test
`api/test.ts` - función mínima para verificar que Vercel ejecuta funciones.

## Próximos Pasos

1. **Haz commit y push:**
```bash
git add .
git commit -m "Add extensive logging and fast path for health check"
git push origin main
```

2. **Espera a que Vercel despliegue**

3. **Revisa los logs de Vercel:**
   - Ve a Vercel Dashboard
   - Functions → api/index.ts
   - View Function Logs
   - Haz una petición a `/api/health`
   - Copia TODOS los logs que veas

4. **Compárteme los logs** - Con eso podré ver exactamente dónde está el problema

## Configuración de vercel.json

El `vercel.json` actual:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" },
    { "source": "/(.*)", "destination": "/api" }
  ]
}
```

Esto significa:
- `/api/health` → `/api` (función)
- `/api/chat` → `/api` (función)
- Cualquier otra ruta → `/api` (función)

Todas las peticiones van a la misma función `api/index.ts`, que las maneja internamente con Express.

