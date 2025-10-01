# 🚀 Guía Paso a Paso: Configurar Kommo CRM

## 📋 Información que Necesitamos Obtener

Necesitamos **4 datos** de tu cuenta de Kommo:

1. **KOMMO_SUBDOMAIN** - Tu subdominio de Kommo
2. **KOMMO_TOKEN** - Token de larga duración
3. **KOMMO_PIPELINE_ID** - ID del pipeline (opcional)
4. **KOMMO_STATUS_ID** - ID del estado inicial (opcional)

---

## 🔍 PASO 1: Obtener el Subdominio

### ¿Qué es el subdominio?
Es la parte personalizada de tu URL de Kommo.

### Cómo obtenerlo:
1. **Abre tu cuenta de Kommo** en el navegador
2. **Mira la URL** en la barra de direcciones
3. **Copia la parte** antes de `.kommo.com`

### Ejemplos:
- Si tu URL es: `https://miempresa.kommo.com` → Subdominio: `miempresa`
- Si tu URL es: `https://librefondo.kommo.com` → Subdominio: `librefondo`
- Si tu URL es: `https://ventas2024.kommo.com` → Subdominio: `ventas2024`

### ✅ Resultado:
\`\`\`
KOMMO_SUBDOMAIN=tu_subdominio_aqui
\`\`\`

---

## 🔑 PASO 2: Crear Integración y Obtener Token

### 2.1 Crear una Nueva Integración

1. **Inicia sesión** en tu cuenta de Kommo
2. **Haz clic** en el menú lateral (☰) en la esquina superior izquierda
3. **Selecciona** "Ajustes" (⚙️)
4. **Busca y haz clic** en "Integraciones"
5. **Haz clic** en el botón **"Crear integración"** (esquina superior derecha)
6. **Completa el formulario**:
   - **Nombre**: `LibreFondo Landing Page` (o el nombre que prefieras)
   - **Descripción**: `Integración para formulario de contacto de LibreFondo`
7. **Haz clic** en "Crear"

### 2.2 Configurar Alcances (Permisos)

1. **Dentro de tu nueva integración**, busca la pestaña **"Claves y Alcances"**
2. **Haz clic** en "Configurar alcances"
3. **Selecciona** los siguientes permisos:
   - ✅ `leads:write` - Para crear leads
   - ✅ `leads:read` - Para leer información de leads (opcional pero recomendado)
4. **Guarda** los cambios

### 2.3 Generar Token de Larga Duración

1. **En la misma pestaña** "Claves y Alcances"
2. **Haz clic** en **"Generar token de larga duración"**
3. **⚠️ IMPORTANTE**: Copia inmediatamente el token que aparece
4. **El token se ve así**: `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguYW1vY3JtLnJ1Iiwic3ViIjoi...`
5. **Guarda este token** en un lugar seguro (no se puede recuperar)

### ✅ Resultado:
\`\`\`
KOMMO_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.tu_token_completo_aqui...
\`\`\`

---

## 🎯 PASO 3: Obtener Pipeline ID (Opcional pero Recomendado)

### ¿Qué es un Pipeline?
Es el flujo de trabajo donde aparecerán tus leads (ej: "Ventas", "Marketing", etc.)

### Cómo obtenerlo:
1. **En tu cuenta de Kommo**, ve a **"Ajustes"** (⚙️)
2. **Haz clic** en **"Pipelines"**
3. **Selecciona** el pipeline donde quieres que aparezcan los leads del formulario
4. **Mira la URL** en la barra de direcciones
5. **Busca** el número después de `/pipelines/` o `/pipeline/`

### Ejemplo de URL:
\`\`\`
https://miempresa.kommo.com/settings/pipelines/123456
\`\`\`
En este caso, el Pipeline ID es: `123456`

### ✅ Resultado:
\`\`\`
KOMMO_PIPELINE_ID=123456
\`\`\`

---

## 📊 PASO 4: Obtener Status ID (Opcional pero Recomendado)

### ¿Qué es un Status?
Es el estado inicial donde aparecerán los nuevos leads (ej: "Nuevo", "Contactado", etc.)

### Cómo obtenerlo:
1. **Dentro del pipeline** que seleccionaste en el paso anterior
2. **Haz clic** en el estado inicial que quieres para los nuevos leads
3. **Mira la URL** o **inspecciona el elemento** (clic derecho → Inspeccionar)
4. **Busca** el atributo `data-id` o similar en el HTML

### Método alternativo (más fácil):
1. **Ve a** "Leads" en el menú principal
2. **Crea un lead de prueba** manualmente
3. **Asigna** el estado que quieres
4. **Inspecciona** el elemento del estado en la página
5. **Busca** el `data-id` o `data-status-id`

### ✅ Resultado:
\`\`\`
KOMMO_STATUS_ID=789012
\`\`\`

---

## 🔧 PASO 5: Configurar el Archivo .env.local

### 5.1 Abrir el archivo
1. **Abre** el archivo `.env.local` en tu editor de código
2. **Reemplaza** los valores de ejemplo con tus datos reales

### 5.2 Ejemplo de configuración completa:
\`\`\`env
# Kommo CRM Configuration
KOMMO_SUBDOMAIN=miempresa
KOMMO_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguYW1vY3JtLnJ1Iiwic3ViIjoiMTIzNDU2Nzg5MCIsImF1ZCI6Imh0dHBzOi8vYXBpLmFtb2NybS5ydSIsImV4cCI6MTY5OTk5OTk5OSwiaWF0IjoxNjk5OTk5OTk5LCJqdGkiOiJhYmNkZWYxMjM0NTY3ODkwIn0.signature_here
KOMMO_PIPELINE_ID=123456
KOMMO_STATUS_ID=789012
\`\`\`

### 5.3 Guardar y reiniciar
1. **Guarda** el archivo
2. **Reinicia** el servidor de desarrollo:
   \`\`\`bash
   # Detén el servidor (Ctrl+C)
   npm run dev
   \`\`\`

---

## 🧪 PASO 6: Probar la Integración

### 6.1 Probar el formulario
1. **Abre** http://localhost:3003 en tu navegador
2. **Completa** el formulario con datos de prueba
3. **Envía** el formulario
4. **Verifica** que aparezca el mensaje de éxito

### 6.2 Verificar en Kommo
1. **Ve a** tu cuenta de Kommo
2. **Navega** a "Leads"
3. **Busca** el lead que acabas de crear
4. **Verifica** que tenga todos los datos correctos

### 6.3 Revisar logs (si hay errores)
1. **Mira** la consola del navegador (F12)
2. **Revisa** los logs del servidor en la terminal
3. **Busca** mensajes de error específicos

---

## 🚨 Solución de Problemas Comunes

### Error: "Variables de entorno de Kommo no configuradas"
**Solución:**
- Verifica que el archivo `.env.local` existe
- Confirma que las variables estén correctamente nombradas
- Reinicia el servidor después de hacer cambios

### Error: "Error al crear lead en Kommo"
**Solución:**
- Verifica que el token sea válido y no haya expirado
- Confirma que el subdominio sea correcto
- Revisa que la integración tenga los permisos `leads:write`

### Error: "Error de conexión"
**Solución:**
- Verifica tu conexión a internet
- Confirma que la URL de Kommo sea accesible
- Revisa los logs del servidor para más detalles

### El lead no aparece en Kommo
**Solución:**
- Verifica que estés buscando en el pipeline correcto
- Confirma que el estado sea el correcto
- Revisa si hay filtros activos en la vista de leads

---

## 📞 Datos de Contacto para Soporte

Si tienes problemas con la configuración:

1. **Revisa** esta guía paso a paso
2. **Verifica** que todos los datos estén correctos
3. **Prueba** con datos de prueba simples
4. **Revisa** los logs de error

---

## ✅ Checklist Final

Antes de considerar la integración completa, verifica:

- [ ] Subdominio configurado correctamente
- [ ] Token de larga duración generado y copiado
- [ ] Integración tiene permisos `leads:write`
- [ ] Pipeline ID obtenido (opcional)
- [ ] Status ID obtenido (opcional)
- [ ] Archivo `.env.local` configurado
- [ ] Servidor reiniciado
- [ ] Formulario probado exitosamente
- [ ] Lead aparece en Kommo
- [ ] Datos del lead son correctos

¡Una vez que completes todos estos pasos, tu integración estará funcionando perfectamente! 🎉
