import { NextRequest, NextResponse } from 'next/server'
import { createKommoLead } from '@/lib/kommo'

interface LeadData {
  nombre: string
  whatsapp: string
  correo: string
  fondo: string
  valor: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json()

    // Validar datos requeridos
    if (!body.nombre || !body.whatsapp || !body.correo || !body.fondo || !body.valor) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    console.log('📝 Datos recibidos del formulario:', body)

    // Usar la implementación profesional de Kommo
    const result = await createKommoLead(body)

    console.log('🎯 Resultado de Kommo:', result)

    return NextResponse.json(result)

  } catch (error) {
    console.error('❌ Error en API de leads:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
