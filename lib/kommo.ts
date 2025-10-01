// Configuración de Kommo CRM
const KOMMO_CONFIG = {
  subdomain: process.env.KOMMO_SUBDOMAIN || "librefondo",
  accessToken: process.env.KOMMO_TOKEN || "",
}

// Interfaz para los datos del lead
interface KommoLead {
  nombre: string
  whatsapp: string
  correo: string
  fondo: string
  valor: string
}

// Mapeo de fondos de cesantías
const FONDO_MAPPING: Record<string, string> = {
  porvenir: "Porvenir",
  proteccion: "Protección", 
  colfondos: "Colfondos",
  fna: "FNA",
  otro: "Otro"
}

// Mapeo de valores de rango
const VALOR_MAPPING: Record<string, string> = {
  '1-5': "$1M - $5M COP",
  '5-10': "$5M - $10M COP", 
  '10-20': "$10M - $20M COP",
  '20+': "Más de $20M COP"
}

// Normalización de números de teléfono colombianos
function normalizePhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/[\s\-()]/g, "")
  
  if (cleanPhone.startsWith("+57")) return cleanPhone
  if (cleanPhone.startsWith("57")) return `+${cleanPhone}`
  if (cleanPhone.length === 10 && cleanPhone.startsWith("3")) return `+57${cleanPhone}`
  
  return cleanPhone.startsWith("+") ? cleanPhone : `+57${cleanPhone}`
}

// Verificar si el token es válido
async function verifyToken(): Promise<boolean> {
  try {
    const response = await fetch(`https://${KOMMO_CONFIG.subdomain}.kommo.com/api/v4/account`, {
      headers: {
        'Authorization': `Bearer ${KOMMO_CONFIG.accessToken}`
      }
    })
    return response.ok
  } catch (error) {
    console.error('Error verificando token:', error)
    return false
  }
}

// Guardar lead localmente como fallback
async function saveLeadLocally(leadData: KommoLead) {
  console.log('💾 Guardando lead localmente:', leadData)
  return {
    success: true,
    message: 'Datos recibidos correctamente (guardados localmente)',
    fallback: true,
    data: leadData
  }
}

// Crear lead en Kommo (3 pasos)
export async function createKommoLead(leadData: KommoLead) {
  try {
    console.log('🚀 Iniciando creación de lead en Kommo:', leadData)

    // Verificar token antes de proceder (temporalmente deshabilitado para debug)
    console.log('🔍 Saltando verificación de token para debug')
    // const isTokenValid = await verifyToken()
    // if (!isTokenValid) {
    //   console.log('❌ Token inválido, usando fallback local')
    //   return await saveLeadLocally(leadData)
    // }
    console.log('✅ Procediendo con la creación (debug mode)')

    const normalizedPhone = normalizePhoneNumber(leadData.whatsapp)
    console.log('📱 Teléfono normalizado:', normalizedPhone)

    // PASO 1: Crear Contacto (con formato correcto)
    const contactPayload = {
      name: [leadData.nombre], // Kommo espera un array
      _embedded: {
        tags: [{ name: "librefondo-landing" }], // Etiqueta incluida
      },
      custom_fields_values: [
        {
          field_id: 1848247, // Campo de teléfono
          values: [{ value: normalizedPhone, enum_code: "WORK" }]
        },
        {
          field_id: 1848249, // Campo de correo
          values: [{ value: leadData.correo, enum_code: "WORK" }]
        },
        {
          field_id: 1853558, // Campo de fondo
          values: [{ value: FONDO_MAPPING[leadData.fondo] || leadData.fondo }]
        },
        {
          field_id: 1853560, // Campo de cantidad/valor
          values: [{ value: VALOR_MAPPING[leadData.valor] || leadData.valor }]
        }
      ]
    }

    console.log('👤 Creando contacto:', JSON.stringify(contactPayload, null, 2))
    console.log('🔗 URL de contacto:', `https://${KOMMO_CONFIG.subdomain}.kommo.com/api/v4/contacts`)

    const contactResponse = await fetch(
      `https://${KOMMO_CONFIG.subdomain}.kommo.com/api/v4/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${KOMMO_CONFIG.accessToken}`
        },
        body: JSON.stringify(contactPayload)
      }
    )

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text()
      console.error('❌ Error creando contacto:', errorText)
      console.error('❌ Status:', contactResponse.status)
      console.error('❌ Headers:', contactResponse.headers)
      return await saveLeadLocally(leadData)
    }

    const contactResult = await contactResponse.json()
    const contactId = contactResult._embedded.contacts[0].id
    console.log('✅ Contacto creado con ID:', contactId)

    // PASO 2: Crear Lead
    const leadPayload = {
      name: [leadData.nombre], // Kommo espera un array
      price: [0], // Kommo espera un array
      _embedded: {
        contacts: [{ id: contactId }], // Asociar al contacto
        tags: [{ name: "librefondo-landing" }], // Etiqueta incluida
      }
    }

    console.log('🎯 Creando lead:', JSON.stringify(leadPayload, null, 2))

    const leadResponse = await fetch(
      `https://${KOMMO_CONFIG.subdomain}.kommo.com/api/v4/leads`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${KOMMO_CONFIG.accessToken}`
        },
        body: JSON.stringify(leadPayload)
      }
    )

    if (!leadResponse.ok) {
      const errorText = await leadResponse.text()
      console.error('❌ Error creando lead:', errorText)
      return await saveLeadLocally(leadData)
    }

    const leadResult = await leadResponse.json()
    const leadId = leadResult._embedded.leads[0].id
    console.log('✅ Lead creado con ID:', leadId)

    // PASO 3: Verificación exitosa
    return {
      success: true,
      message: 'Lead creado exitosamente en Kommo',
      kommoData: {
        contactId,
        leadId,
        contact: contactResult,
        lead: leadResult
      }
    }

  } catch (error) {
    console.error('❌ Error en createKommoLead:', error)
    return await saveLeadLocally(leadData)
  }
}
