# Guía de Debugging para el Problema 504 en Vercel

## Problema
- Error 504 (Gateway Timeout) en producción (Vercel)
- Las peticiones a `/api/chat` no llegan a n8n
- Funciona correctamente en local con `npm run dev`

## Cambios Realizados

### 1. Logging Mejorado
Se agregó logging extensivo en `api/index.ts` para rastrear:
- Cada petición entrante
- Validación de datos
- Peticiones a n8n
- Respuestas de n8n
- Errores en cada paso

### 2. Timeouts Configurados
- Timeout del handler: 25 segundos
- Timeout del fetch a n8n: 15 segundos
- maxDuration en vercel.json: 60 segundos

### 3. Orden de Middlewares Corregido
- Las rutas de API se registran PRIMERO
- El catch-all solo maneja rutas NO-API (SPA routing)
- Verificación explícita de rutas `/api` en catch-alls

## Cómo Debuggear

### 1. Revisar Logs de Vercel
1. Ve al dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a "Functions" → "api/index.ts"
4. Revisa los logs en tiempo real

Busca estos mensajes:
- `[InitializeApp] Starting initialization...`
- `[POST /api/chat] Request received:`
- `[POST /api/chat] Validated data:`
- `[POST /api/chat] Forwarding to n8n:`
- `[POST /api/chat] n8n response status:`

### 2. Verificar que la Función se Inicializa
Si ves `[InitializeApp] Initialization complete`, la función se inicializó correctamente.

Si no ves este mensaje, la inicialización está fallando.

### 3. Verificar que la Petición Llega
Si ves `[POST /api/chat] Request received:`, la petición está llegando a la función.

Si no ves este mensaje:
- La petición no está llegando a la función
- Puede ser un problema con el routing en vercel.json

### 4. Verificar Validación
Si ves `[POST /api/chat] Validated data:`, la validación pasó.

Si no ves este mensaje, busca errores de validación.

### 5. Verificar Petición a n8n
Si ves `[POST /api/chat] Forwarding to n8n:`, la petición se está enviando.

Si ves `[POST /api/chat] Request timeout to n8n`, n8n está tardando demasiado.

Si no ves ningún mensaje después de "Forwarding", el fetch puede estar colgando.

## Posibles Problemas y Soluciones

### Problema 1: La función nunca se inicializa
**Síntomas**: No ves logs de inicialización
**Solución**: 
- Verifica que `dist/public` existe después del build
- Revisa los logs de build en Vercel

### Problema 2: La petición no llega a /api/chat
**Síntomas**: No ves `[POST /api/chat] Request received:`
**Solución**:
- Verifica que el frontend está haciendo POST a `/api/chat`
- Verifica que vercel.json tiene el rewrite correcto
- Verifica que la ruta se registra antes del catch-all

### Problema 3: Timeout al conectar con n8n
**Síntomas**: Ves `Request timeout to n8n`
**Solución**:
- Verifica que la URL de n8n es correcta
- Verifica que n8n está respondiendo
- Puede ser que n8n tarde más de 15 segundos

### Problema 4: Error en la respuesta de n8n
**Síntomas**: Ves `n8n webhook returned [status]`
**Solución**:
- Verifica el webhook de n8n
- Verifica que n8n está configurado correctamente
- Revisa los logs de n8n

## Pruebas Locales

Para probar localmente la función serverless:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Ejecutar localmente
vercel dev
```

Esto simula el ambiente de Vercel localmente.

## Verificar el Payload

Asegúrate de que el payload que se envía es:
```json
{
  "message": "Hola",
  "sender": "user",
  "timestamp": "2026-01-19T21:42:51.417Z",
  "chatId": "6f069265-415a-4c7b-a20f-ceaaa4116637"
}
```

## Verificar la URL de n8n

La URL configurada es:
```
https://n8n.arkoswearshop.com/webhook/03c90cf6-deaf-4151-bd38-4b2c06ee0d48
```

Asegúrate de que esta URL es correcta y está activa.

