# Configuración de Integración con Kommo CRM

## 📋 Pasos para Configurar la Integración

### 1. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Kommo CRM Configuration
KOMMO_SUBDOMAIN=tu_subdominio_kommo
KOMMO_TOKEN=tu_token_de_larga_duracion_kommo
KOMMO_PIPELINE_ID=tu_pipeline_id_opcional
KOMMO_STATUS_ID=tu_status_id_opcional
```

### 2. Obtener Credenciales de Kommo

#### 2.1 Obtener Subdominio
- Accede a tu cuenta de Kommo
- El subdominio es la parte antes de `.kommo.com` en tu URL
- Ejemplo: Si tu URL es `https://miempresa.kommo.com`, tu subdominio es `miempresa`

#### 2.2 Crear Integración Privada
1. Ve a **Menú lateral → Ajustes → Integraciones**
2. Haz clic en **"Crear integración"**
3. Asigna un nombre descriptivo (ej: "LibreFondo Landing Page")
4. Guarda los cambios

#### 2.3 Generar Token de Larga Duración
1. Dentro de la integración creada, ve a la pestaña **"Claves y Alcances"**
2. Haz clic en **"Generar token de larga duración"**
3. Copia el token generado (comienza con `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...`)
4. **⚠️ IMPORTANTE**: Guarda este token de forma segura, no se puede recuperar

#### 2.4 Configurar Alcances (Scopes)
Asegúrate de que tu integración tenga los siguientes alcances:
- `leads:write` - Para crear leads
- `leads:read` - Para leer información de leads (opcional)

### 3. Configurar Campos Personalizados (Opcional)

Para mapear correctamente los campos del formulario, puedes configurar campos personalizados en Kommo:

1. Ve a **Ajustes → Campos personalizados → Leads**
2. Crea los siguientes campos:
   - **WhatsApp** (Texto)
   - **Fondo de Cesantías** (Lista desplegable)
   - **Rango de Valor** (Lista desplegable)

3. Anota los IDs de estos campos y actualiza el archivo `app/api/leads/route.ts` en las líneas donde dice `field_id: 0`

### 4. Configurar Pipeline y Estado (Opcional)

#### 4.1 Obtener Pipeline ID
1. Ve a **Ajustes → Pipelines**
2. Selecciona el pipeline donde quieres que aparezcan los leads
3. Copia el ID del pipeline de la URL o del código fuente

#### 4.2 Obtener Estado ID
1. Dentro del pipeline seleccionado
2. Selecciona el estado inicial para los nuevos leads
3. Copia el ID del estado

### 5. Probar la Integración

1. Inicia el servidor de desarrollo: `npm run dev`
2. Completa el formulario en la página
3. Verifica que el lead aparezca en tu cuenta de Kommo
4. Revisa los logs del servidor para cualquier error

## 🔧 Estructura de Datos Enviados

El formulario envía los siguientes datos a Kommo:

```json
{
  "nombre": "Juan Pérez",
  "whatsapp": "+573001234567",
  "correo": "juan@email.com",
  "fondo": "porvenir",
  "valor": "5-10"
}
```

## 📊 Mapeo de Valores

### Fondos de Cesantías
- `porvenir` → Porvenir
- `proteccion` → Protección
- `colfondos` → Colfondos
- `fna` → FNA
- `otro` → Otro

### Rangos de Valor
- `1-5` → $1M - $5M COP (Valor estimado: $3M)
- `5-10` → $5M - $10M COP (Valor estimado: $7.5M)
- `10-20` → $10M - $20M COP (Valor estimado: $15M)
- `20+` → Más de $20M COP (Valor estimado: $25M)

## 🚨 Solución de Problemas

### Error: "Variables de entorno de Kommo no configuradas"
- Verifica que el archivo `.env.local` existe
- Asegúrate de que las variables estén correctamente nombradas
- Reinicia el servidor después de agregar las variables

### Error: "Error al crear lead en Kommo"
- Verifica que el token sea válido y no haya expirado
- Confirma que el subdominio sea correcto
- Revisa que la integración tenga los permisos necesarios

### Error: "Error de conexión"
- Verifica tu conexión a internet
- Confirma que la URL de Kommo sea accesible
- Revisa los logs del servidor para más detalles

## 📚 Recursos Adicionales

- [Documentación oficial de Kommo API](https://es-developers.kommo.com/)
- [Endpoint para crear leads](https://es-developers.kommo.com/reference/a%C3%B1adir-leads-entrantes-del-tipo-formulario)
- [Guía de autenticación](https://es-developers.kommo.com/docs/autenticaci%C3%B3n)
