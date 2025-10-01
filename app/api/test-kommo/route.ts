import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const kommoSubdomain = process.env.KOMMO_SUBDOMAIN
    const kommoToken = process.env.KOMMO_TOKEN

    if (!kommoSubdomain || !kommoToken) {
      return NextResponse.json(
        { error: 'Variables de entorno no configuradas' },
        { status: 500 }
      )
    }

    // Probar conexión básica con Kommo
    const testResponse = await fetch(
      `https://${kommoSubdomain}.kommo.com/api/v4/account`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${kommoToken}`
        }
      }
    )

    if (!testResponse.ok) {
      const errorText = await testResponse.text()
      return NextResponse.json({
        success: false,
        error: 'Error de conexión con Kommo',
        details: errorText,
        status: testResponse.status
      })
    }

    const accountData = await testResponse.json()

    return NextResponse.json({
      success: true,
      message: 'Conexión con Kommo exitosa',
      account: accountData,
      subdomain: kommoSubdomain
    })

  } catch (error) {
    console.error('Error en test de Kommo:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
