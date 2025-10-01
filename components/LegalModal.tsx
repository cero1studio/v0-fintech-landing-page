"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  type: "terms" | "privacy"
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const [currentView, setCurrentView] = useState<"terms" | "privacy">(type)

  const handleBack = () => {
    onClose()
  }

  const termsContent = (
    <div className="space-y-4 text-sm">
      <p>
        <strong>Última actualización:</strong> Septiembre 2025
      </p>

      <h3 className="font-semibold text-base">1. NATURALEZA DEL SERVICIO</h3>
      <p>
        LibreFondo es un servicio de asesoría y acompañamiento para el retiro de cesantías en Colombia.
        NO somos un fondo de cesantías ni una entidad financiera. Actuamos como intermediarios y
        asesores en el proceso de retiro ante los fondos oficiales (Porvenir, Protección, Colfondos,
        FNA).
      </p>

      <h3 className="font-semibold text-base">2. LIMITACIÓN DE RESPONSABILIDAD</h3>
      <p>
        LibreFondo no garantiza la aprobación del retiro de cesantías, ya que esta decisión depende
        exclusivamente de cada fondo administrador y del cumplimiento de los requisitos legales
        establecidos por la normatividad colombiana. Nuestra responsabilidad se limita a brindar
        asesoría y acompañamiento en el proceso.
      </p>

      <h3 className="font-semibold text-base">3. COMISIÓN POR ÉXITO</h3>
      <p>
        LibreFondo cobra una comisión únicamente cuando el retiro de cesantías es exitoso. Esta
        comisión se descuenta del monto retirado y se informa claramente al cliente antes de
        iniciar el proceso. No hay costos ocultos ni comisiones por servicios no prestados.
      </p>

      <h3 className="font-semibold text-base">4. PROCESO DE RETIRO</h3>
      <p>
        El proceso de retiro de cesantías está sujeto a la normatividad vigente en Colombia y a
        los requisitos específicos de cada fondo administrador. LibreFondo se compromete a
        acompañar al cliente durante todo el proceso, pero no puede garantizar tiempos específicos
        de aprobación.
      </p>

      <h3 className="font-semibold text-base">5. PROTECCIÓN DE DATOS</h3>
      <p>
        LibreFondo se compromete a proteger la información personal de sus clientes de acuerdo
        con la Ley 1581 de 2012 y el Decreto 1377 de 2013. Los datos proporcionados serán
        utilizados exclusivamente para el proceso de retiro de cesantías y no serán compartidos
        con terceros sin autorización expresa del titular.
      </p>

      <h3 className="font-semibold text-base">6. MODIFICACIONES</h3>
      <p>
        LibreFondo se reserva el derecho de modificar estos términos y condiciones en cualquier
        momento. Las modificaciones serán notificadas a través de nuestros canales oficiales y
        entrarán en vigor inmediatamente después de su publicación.
      </p>

      <h3 className="font-semibold text-base">7. CONTACTO</h3>
      <p>
        Para cualquier consulta sobre estos términos y condiciones, puedes contactarnos a través
        de WhatsApp al +57 313 359 3183 o por correo electrónico a info@librefondo.com.
      </p>
    </div>
  )

  const privacyContent = (
    <div className="space-y-4 text-sm">
      <p>
        <strong>Última actualización:</strong> Septiembre 2025
      </p>

      <h3 className="font-semibold text-base">1. INFORMACIÓN QUE RECOPILAMOS</h3>
      <p>
        Recopilamos información personal que nos proporcionas directamente, incluyendo tu nombre,
        número de WhatsApp, correo electrónico, fondo de cesantías y valor aproximado de tus
        cesantías. Esta información es necesaria para brindarte nuestro servicio de asesoría.
      </p>

      <h3 className="font-semibold text-base">2. USO DE LA INFORMACIÓN</h3>
      <p>
        Utilizamos tu información personal para:
        <br />• Brindarte asesoría sobre el retiro de cesantías
        <br />• Contactarte vía WhatsApp para continuar con tu proceso
        <br />• Procesar tu solicitud de manera segura y eficiente
        <br />• Cumplir con las obligaciones legales aplicables
      </p>

      <h3 className="font-semibold text-base">3. COMPARTIR INFORMACIÓN</h3>
      <p>
        No compartimos tu información personal con terceros, excepto cuando sea necesario para
        el proceso de retiro de cesantías (como con los fondos administradores) o cuando la ley
        lo requiera. Tu información se mantiene confidencial y segura.
      </p>

      <h3 className="font-semibold text-base">4. SEGURIDAD</h3>
      <p>
        Implementamos medidas de seguridad técnicas y organizacionales para proteger tu
        información personal contra acceso no autorizado, alteración, divulgación o destrucción.
        Sin embargo, ningún método de transmisión por internet es 100% seguro.
      </p>

      <h3 className="font-semibold text-base">5. TUS DERECHOS</h3>
      <p>
        Tienes derecho a:
        <br />• Conocer, actualizar y rectificar tus datos personales
        <br />• Solicitar prueba de la autorización otorgada
        <br />• Revocar la autorización y/o solicitar la supresión del dato
        <br />• Acceder de forma gratuita a tus datos personales
      </p>

      <h3 className="font-semibold text-base">6. CONTACTO</h3>
      <p>
        Para ejercer tus derechos o resolver dudas sobre el tratamiento de tus datos personales,
        puedes contactarnos a través de WhatsApp al +57 313 359 3183 o por correo electrónico a
        info@librefondo.com.
      </p>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle>
              {currentView === "terms" ? "Términos y Condiciones - LibreFondo" : "Política de Privacidad - LibreFondo"}
            </DialogTitle>
          </div>
        </DialogHeader>
        {currentView === "terms" ? termsContent : privacyContent}
      </DialogContent>
    </Dialog>
  )
}
