# Guía para Verificar el Despliegue en Vercel

## ✅ Cómo Verificar que el Frontend y Backend Están Funcionando

### 1. Verificar el Frontend (Archivos Estáticos)

#### Paso 1: Acceder a la URL principal
Abre tu sitio en el navegador: `https://www.sourcylab.com`

**¿Qué debería pasar?**
- ✅ Deberías ver la página principal cargando correctamente
- ✅ No deberías ver un error 404 o página en blanco
- ✅ Los assets (imágenes, CSS, JS) deberían cargarse

**Si ves la página principal:** El frontend está funcionando ✅

---

### 2. Verificar el Backend (API/Serverless Functions)

#### Paso 1: Health Check Endpoint
Abre en tu navegador o usa curl:

```
https://www.sourcylab.com/api/health
```

**¿Qué debería pasar?**
- ✅ Deberías ver una respuesta JSON como:
```json
{
  "status": "ok",
  "timestamp": "2026-01-19T22:00:00.000Z",
  "environment": "production",
  "vercel": true,
  "region": "iad1"
}
```

**Si ves esta respuesta:** El backend está funcionando ✅

**Si ves un error 404 o 504:** El backend NO está funcionando ❌

#### Paso 2: Probar el endpoint de chat directamente

Usa curl o Postman para probar:

```bash
curl -X POST https://www.sourcylab.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "test",
    "sender": "user",
    "timestamp": "2026-01-19T22:00:00.000Z",
    "chatId": "test-123"
  }'
```

**¿Qué debería pasar?**
- ✅ Deberías recibir una respuesta (aunque sea un error de n8n)
- ✅ NO deberías recibir un error 504 inmediatamente

**Si recibes una respuesta:** El endpoint de chat está funcionando ✅

---

### 3. Verificar en el Dashboard de Vercel

#### Paso 1: Revisar el Deploy
1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Revisa el último deployment

**¿Qué buscar?**
- ✅ Estado: "Ready" (verde)
- ✅ Build exitoso (sin errores)
- ✅ Función `api/index.ts` listada en "Functions"

#### Paso 2: Revisar los Logs en Tiempo Real
1. En el dashboard de Vercel, ve a **"Functions"**
2. Selecciona **"api/index.ts"**
3. Haz clic en **"View Function Logs"** o **"Real-time Logs"**

**Ahora realiza una petición:**
- Abre `https://www.sourcylab.com/api/health` en otra pestaña
- O envía un mensaje desde el chat

**¿Qué deberías ver en los logs?**
- ✅ `[InitializeApp] Starting initialization...` (solo la primera vez)
- ✅ `[InitializeApp] Initialization complete`
- ✅ `[GET /api/health] Health check requested` (cuando accedas a /api/health)
- ✅ `[POST /api/chat] Request received:` (cuando envíes un mensaje)

**Si ves estos logs:** La función serverless se está ejecutando ✅

**Si NO ves logs o ves errores:** Hay un problema con la función ❌

---

### 4. Comparación: Local vs Producción

#### En Local (`npm run dev`):
```
✅ Servidor Express corriendo continuamente en un puerto
✅ Vite middleware sirviendo el frontend en desarrollo
✅ Todas las rutas funcionando (frontend + API)
```

#### En Vercel (Producción):
```
✅ Frontend: Archivos estáticos pre-construidos desde dist/public
✅ Backend: Funciones serverless que se ejecutan por petición
✅ Cada petición activa la función api/index.ts
✅ La función maneja tanto API como archivos estáticos
```

---

### 5. Problemas Comunes y Soluciones

#### Problema 1: Frontend carga pero API no funciona

**Síntomas:**
- La página principal carga
- `https://www.sourcylab.com/api/health` da 404 o 504

**Solución:**
- Verifica que `vercel.json` tiene el rewrite correcto
- Verifica que `api/index.ts` existe
- Revisa los logs de Vercel para ver errores

#### Problema 2: Todo da 504 (Gateway Timeout)

**Síntomas:**
- Todas las peticiones tardan y luego dan 504
- Ni siquiera `/api/health` funciona

**Posibles causas:**
- La función serverless no se está inicializando correctamente
- Hay un error en la inicialización que bloquea todo
- El límite de tiempo se está excediendo

**Solución:**
- Revisa los logs de Vercel para ver qué error ocurre
- Verifica que `dist/public` existe después del build
- Asegúrate de que no hay errores de sintaxis en `api/index.ts`

#### Problema 3: API funciona pero `/api/chat` da 504

**Síntomas:**
- `/api/health` funciona
- `/api/chat` da 504

**Posibles causas:**
- n8n está tardando demasiado en responder (más de 15 segundos)
- El timeout de la función se está excediendo
- Hay un problema con la conexión a n8n

**Solución:**
- Revisa los logs para ver si la petición llega a n8n
- Verifica que la URL de n8n es correcta
- Considera aumentar el timeout o verificar n8n

---

### 6. Verificación Rápida (Checklist)

Usa este checklist para verificar rápidamente:

```
[ ] 1. La página principal carga → Frontend OK
[ ] 2. /api/health responde con JSON → Backend OK
[ ] 3. Los logs de Vercel muestran actividad → Funciones OK
[ ] 4. /api/chat recibe peticiones (aunque falle con n8n) → API OK
[ ] 5. El deployment en Vercel está en estado "Ready" → Deploy OK
```

---

### 7. Comandos Útiles para Testing

#### Test rápido con curl:

```bash
# Health check
curl https://www.sourcylab.com/api/health

# Test chat endpoint
curl -X POST https://www.sourcylab.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","sender":"user","timestamp":"2026-01-19T22:00:00.000Z","chatId":"test-123"}'
```

#### Desde el navegador:

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Test health check
fetch('/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// Test chat
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'test',
    sender: 'user',
    timestamp: new Date().toISOString(),
    chatId: 'test-' + Date.now()
  })
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

---

## 🔍 Debugging Avanzado

Si después de verificar todo lo anterior sigues teniendo problemas:

1. **Revisa los logs completos de Vercel** - Busca errores de inicialización
2. **Verifica el build** - Asegúrate de que `npm run build` funciona localmente
3. **Revisa las variables de entorno** - Verifica que no falten variables necesarias
4. **Compara con local** - Si funciona local pero no en producción, hay una diferencia de configuración

