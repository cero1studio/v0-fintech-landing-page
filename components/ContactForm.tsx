"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Loader2, CheckCircle } from "lucide-react"
import LegalModal from "./LegalModal"

interface ContactFormProps {
  variant?: "card" | "modal"
  className?: string
  onSubmit?: (data: FormData) => void
}

interface FormData {
  nombre: string
  fondo: string
  aceptaTerminos: boolean
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm({ variant = "card", className = "", onSubmit }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [legalModalOpen, setLegalModalOpen] = useState(false)
  const [legalModalType, setLegalModalType] = useState<"terms" | "privacy">("terms")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormData>({
    defaultValues: {
      nombre: "",
      fondo: "",
      aceptaTerminos: true
    }
  })

  const watchedValues = watch()

  const openLegalModal = (type: "terms" | "privacy") => {
    setLegalModalType(type)
    setLegalModalOpen(true)
  }

  const closeLegalModal = () => {
    setLegalModalOpen(false)
  }

  const onSubmitForm = async (data: FormData) => {
    if (onSubmit) {
      onSubmit(data)
      return
    }

    setFormStatus('loading')
    setErrorMessage('')
    setApiResponse(null)

    try {
      // Crear mensaje de WhatsApp como si lo escribiera el cliente
      const mensaje = `Hola! Quiero liberar mi dinero de las cesantías.

Mi información es:
- Nombre: ${data.nombre}

Detalles del retiro:
- Fondo: ${data.fondo}

¿Pueden ayudarme a continuar con el proceso?`

      // Crear URL de WhatsApp con el mensaje
      const whatsappUrl = `https://wa.me/573133593183?text=${encodeURIComponent(mensaje)}`
      
      // Abrir WhatsApp en nueva ventana
      window.open(whatsappUrl, '_blank')
      
      // Simular éxito
      setFormStatus('success')
      setApiResponse({
        success: true,
        message: 'Mensaje enviado a WhatsApp exitosamente',
        whatsappUrl: whatsappUrl
      })
      
      // Limpiar el formulario después del éxito
      reset()
      
      // Ocultar el mensaje de éxito después de 10 segundos
      setTimeout(() => {
        setFormStatus('idle')
        setApiResponse(null)
      }, 10000)

    } catch (error) {
      console.error('Error:', error)
      setFormStatus('error')
      setErrorMessage('Error al generar el mensaje. Por favor, inténtalo de nuevo.')
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Mensaje de éxito */}
      {formStatus === 'success' && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ¡Excelente! Ya estás avanzando en tu proceso
              </h3>
              <p className="text-green-700 mb-3">
                Se ha abierto WhatsApp con tu información. <strong>Envía el mensaje</strong> y nuestro equipo te contactará inmediatamente para continuar liberando tu dinero.
              </p>
              <div className="bg-green-100 rounded-lg p-3">
                <p className="text-sm text-green-800 font-medium">
                  Si WhatsApp no se abrió, copia el mensaje y envíalo manualmente al +57 313 359 3183
                </p>
              </div>
              
              {/* Mostrar información del mensaje */}
              {apiResponse && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">
                    Información del mensaje:
                  </h4>
                  <div className="bg-white rounded p-3 text-sm text-gray-700">
                    <p className="mb-2">
                      <strong>Estado:</strong> {apiResponse.message}
                    </p>
                    <p className="text-xs text-blue-600">
                      El mensaje se abrió en WhatsApp para continuar tu proceso
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de error */}
      {formStatus === 'error' && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                ¡Ups! Algo salió mal 😅
              </h3>
              <p className="text-red-700 mb-3">
                {errorMessage || 'No pudimos procesar tu solicitud en este momento.'}
              </p>
              <div className="bg-red-100 rounded-lg p-3">
                <p className="text-sm text-red-800 font-medium">
                  🔄 Por favor, inténtalo de nuevo o contáctanos directamente por WhatsApp al +57 313 359 3183
                </p>
              </div>
              
              {/* Mostrar respuesta de la API en caso de error */}
              {apiResponse && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                    📊 Respuesta del servidor (Error):
                  </h4>
                  <div className="bg-white rounded p-3 text-xs font-mono text-gray-700 overflow-auto max-h-32">
                    <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Información personal */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
            Solo necesitamos tu nombre
          </Label>
          <Input 
            id="nombre" 
            placeholder="Escribe tu nombre completo"
            className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0"
            {...register("nombre", { 
              required: "El nombre es requerido",
              minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
            })}
          />
          {errors.nombre && (
            <p className="text-sm text-red-600">{errors.nombre.message}</p>
          )}
        </div>
      </div>

      {/* Selección de fondo */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">Selecciona tu fondo</h3>
          <p className="text-sm text-gray-500">¿Dónde tienes tus cesantías?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: "porvenir", name: "Porvenir", logo: "/porvenir-logo.jpg" },
            { id: "proteccion", name: "Protección", logo: "/proteccion-logo.jpg" },
            { id: "colfondos", name: "Colfondos", logo: "/colfondos-logo.jpg" },
            { id: "fna", name: "FNA", logo: "/fna-logo.jpg" }
          ].map((fondo) => (
            <div
              key={fondo.id}
              onClick={() => setValue("fondo", fondo.id)}
              className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                watchedValues.fondo === fondo.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <img 
                  src={fondo.logo} 
                  alt={fondo.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="text-sm font-medium text-gray-700 text-center">
                  {fondo.name}
                </span>
              </div>
              {watchedValues.fondo === fondo.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
        {errors.fondo && (
          <p className="text-sm text-red-600 text-center">{errors.fondo.message}</p>
        )}
      </div>

      {/* Términos y condiciones */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="aceptaTerminos"
            className="mt-1 w-4 h-4 text-primary border-2 border-gray-300 rounded focus:ring-primary"
            {...register("aceptaTerminos", { 
              required: "Debes aceptar los términos y condiciones"
            })}
          />
        <label htmlFor="aceptaTerminos" className="text-sm text-gray-600 leading-relaxed">
          Acepto el procesamiento de mis datos para un <strong>proceso online rápido y seguro</strong>. 
          LibreFondo me contactará vía WhatsApp para continuar con mi solicitud de retiro de cesantías.
        </label>
        </div>
        {errors.aceptaTerminos && (
          <p className="text-sm text-red-600">{errors.aceptaTerminos.message}</p>
        )}
      </div>

      <Button 
        type="submit"
        disabled={formStatus === 'loading'}
        className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6 btn-animate hover-glow disabled:opacity-50"
      >
        {formStatus === 'loading' ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Procesando tu solicitud...
          </>
        ) : (
          <>
            {variant === "modal" ? "Continuar con mi proceso" : "Liberar mi dinero"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        Al continuar, aceptas nuestros{" "}
        <button 
          type="button"
          onClick={() => openLegalModal("terms")} 
          className="text-primary hover:underline cursor-pointer"
        >
          Términos y Condiciones
        </button>{" "}
        y{" "}
        <button 
          type="button"
          onClick={() => openLegalModal("privacy")} 
          className="text-primary hover:underline cursor-pointer"
        >
          Política de Privacidad
        </button>
      </p>
    </form>
  )

  if (variant === "card") {
    return (
      <>
        <Card className={`p-8 animate-on-scroll-right ${className}`}>
          <CardContent>
            {formContent}
          </CardContent>
        </Card>
        <LegalModal 
          isOpen={legalModalOpen}
          onClose={closeLegalModal}
          type={legalModalType}
        />
      </>
    )
  }

  return (
    <>
      <div className={`space-y-6 py-4 ${className}`}>
        {formContent}
      </div>
      <LegalModal 
        isOpen={legalModalOpen}
        onClose={closeLegalModal}
        type={legalModalType}
      />
    </>
  )
}
