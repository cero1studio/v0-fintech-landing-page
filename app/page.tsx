"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckCircle, Clock, Star, Shield, Zap, Heart, ArrowRight, Menu, X, MessageCircle } from "lucide-react"

export default function LibreFondoLanding() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "beneficios", "como-funciona", "testimonios", "prueba-social", "faq"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const animateElements = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale",
    )
    animateElements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const openFormModal = () => {
    setIsFormModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center space-x-2">
            <img
              src="/images/design-mode/logolibre.png"
              alt="LibreFondo"
              className="h-8 w-auto logo-hover"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: "hero", label: "Inicio" },
              { id: "beneficios", label: "Beneficios" },
              { id: "como-funciona", label: "Cómo funciona" },
              { id: "testimonios", label: "Testimonios" },
              { id: "faq", label: "FAQ" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium nav-link ${
                  activeSection === item.id ? "text-primary active" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Button
            onClick={openFormModal}
            className="hidden md:inline-flex bg-gradient-primary hover:opacity-90 btn-animate hover-glow"
          >
            Quiero mi dinero ya
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover-scale transition-transform duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-slide-in-up">
            <nav className="container mx-auto px-4 py-4 space-y-4 max-w-7xl">
              {[
                { id: "hero", label: "Inicio" },
                { id: "beneficios", label: "Beneficios" },
                { id: "como-funciona", label: "Cómo funciona" },
                { id: "testimonios", label: "Testimonios" },
                { id: "faq", label: "FAQ" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={openFormModal} className="w-full bg-gradient-primary hover:opacity-90 btn-animate">
                Quiero mi dinero ya
              </Button>
            </nav>
          </div>
        )}
      </header>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/573133593183?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20el%20retiro%20de%20cesant%C3%ADas"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg whatsapp-float flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>

      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center max-w-7xl">
          <div className="space-y-8 animate-slide-in-left">
            <Badge variant="secondary" className="w-fit animate-bounce-slow">
              Desbloquea tu dinero, úsalo como quieras
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-balance leading-tight">
                Tu dinero, ahora <span className="gradient-text">libre</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-pretty animate-on-scroll stagger-1">
                Accede fácil a tus cesantías de Porvenir, Protección, Colfondos y FNA con nuestro acompañamiento
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center animate-on-scroll stagger-2">
                <div className="text-2xl md:text-3xl font-bold text-primary counter-animate">541+</div>
                <div className="text-sm text-muted-foreground">Sueños cumplidos</div>
              </div>
              <div className="text-center animate-on-scroll stagger-3">
                <div className="text-2xl md:text-3xl font-bold text-secondary counter-animate">$1.2B</div>
                <div className="text-sm text-muted-foreground">COP liberados</div>
              </div>
              <div className="text-center animate-on-scroll stagger-4">
                <div className="text-2xl md:text-3xl font-bold text-accent counter-animate">94.2%</div>
                <div className="text-sm text-muted-foreground">Éxito garantizado</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll stagger-5">
              <Button
                size="lg"
                onClick={openFormModal}
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 btn-animate hover-glow"
              >
                Quiero desbloquear mi dinero ya
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("como-funciona")}
                className="text-lg px-8 py-6 hover-lift"
              >
                Ver cómo funciona
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <img
              src="/mujer-latina-joven-sonriendo-con-laptop-y-taza-de-.jpg"
              alt="Mujer latina joven con laptop y café"
              className="w-full h-auto rounded-2xl shadow-2xl hover-scale transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg animate-pulse-slow">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6" />
                <span className="font-semibold">¡Tu dinero libre!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-balance">
              Beneficios que te van a <span className="text-primary">sorprender</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hemos revolucionado el proceso de retiro de cesantías para ti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 card-hover animate-on-scroll stagger-1">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto hover-scale">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold">Trámite tan ágil que ni el café se enfría ☕🚀</h3>
                <p className="text-muted-foreground">Nuestro proceso optimizado toma minutos, no semanas</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 card-hover animate-on-scroll stagger-2">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto hover-scale">
                  <Heart className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold">
                  Acompañamiento personalizado, sin letras chiquitas
                </h3>
                <p className="text-muted-foreground">Te guiamos paso a paso con transparencia total</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 card-hover animate-on-scroll stagger-3">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto hover-scale">
                  <Shield className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold">Todos los fondos principales en un solo lugar</h3>
                <p className="text-muted-foreground">Porvenir, Protección, Colfondos y FNA integrados</p>
              </CardContent>
            </Card>
          </div>

          <div className="relative animate-on-scroll-scale">
            <img
              src="/hombre-latino-con-su-familia-sonriendo-en-casa-rem.jpg"
              alt="Familia latina feliz en casa remodelada"
              className="w-full h-96 object-cover rounded-2xl shadow-xl hover-lift"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 text-white animate-slide-in-left">
              <h3 className="text-2xl font-heading font-bold mb-2">Ayudamos a invertir en lo que realmente importa</h3>
              <p className="text-lg opacity-90">Tu hogar, tu familia, tu futuro</p>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-balance">
              Te acompañamos en <span className="text-primary">3 pasos simples</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              El proceso más fácil que hayas visto para acceder a tu dinero
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent animate-on-scroll" />

            <div className="text-center space-y-6 animate-on-scroll-left stagger-1">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl font-bold text-primary-foreground">1</span>
                </div>
                <img
                  src="/mano-llenando-datos-en-celular--interfaz-moderna-y.jpg"
                  alt="Completar formulario en celular"
                  className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift"
                />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold mb-2">Completas el formulario</h3>
                <p className="text-muted-foreground">Tus datos básicos en menos de 2 minutos</p>
              </div>
            </div>

            <div className="text-center space-y-6 animate-on-scroll stagger-2">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl font-bold text-secondary-foreground">2</span>
                </div>
                <img
                  src="/asesor-virtual-en-pantalla-de-whatsapp--chat-amiga.jpg"
                  alt="Asesor virtual en WhatsApp"
                  className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift"
                />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold mb-2">Te guiamos personalizado</h3>
                <p className="text-muted-foreground">Te acompañamos por WhatsApp paso a paso</p>
              </div>
            </div>

            <div className="text-center space-y-6 animate-on-scroll-right stagger-3">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl font-bold text-accent-foreground">3</span>
                </div>
                <img
                  src="/joven-latino-celebrando-viaje-con-maleta-en-aeropu.jpg"
                  alt="Joven celebrando viaje en aeropuerto"
                  className="w-full h-48 object-cover rounded-xl shadow-lg hover-lift"
                />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold mb-2">Recibes tu dinero</h3>
                <p className="text-muted-foreground">¡Listo para usar en lo que quieras!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonios" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-balance">
              Historias que <span className="text-primary">inspiran</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Miles de personas ya liberaron su dinero con nosotros
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 testimonial-card animate-on-scroll-left stagger-1">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent hover-scale" />
                  ))}
                </div>
                <blockquote className="text-lg italic">
                  "Pensé que era imposible, ¡y en una semana tenía mi dinero libre!"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src="/mujer-latina-joven-sonriendo--profesional.jpg"
                    alt="Ana"
                    className="w-12 h-12 rounded-full object-cover hover-scale"
                  />
                  <div>
                    <p className="font-semibold">Ana, 29</p>
                    <p className="text-sm text-muted-foreground">Bogotá</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 testimonial-card animate-on-scroll stagger-2">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent hover-scale" />
                  ))}
                </div>
                <blockquote className="text-lg italic">
                  "Con esto pagué mi maestría sin un solo dolor de cabeza"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src="/hombre-latino-joven-estudiando--ambiente-acad-mico.jpg"
                    alt="Julián"
                    className="w-12 h-12 rounded-full object-cover hover-scale"
                  />
                  <div>
                    <p className="font-semibold">Julián, 34</p>
                    <p className="text-sm text-muted-foreground">Medellín</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 testimonial-card animate-on-scroll-right stagger-3">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent hover-scale" />
                  ))}
                </div>
                <blockquote className="text-lg italic">
                  "Gracias a esta solución, emprendí mi propio negocio"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src="/mujer-latina-emprendedora-en-su-negocio--confiada-.jpg"
                    alt="Camila"
                    className="w-12 h-12 rounded-full object-cover hover-scale"
                  />
                  <div>
                    <p className="font-semibold">Camila, 40</p>
                    <p className="text-sm text-muted-foreground">Cali</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="formulario" className="py-20 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-balance mb-4 animate-on-scroll-left">
                ¿Listo para <span className="text-primary">desbloquear</span> tu dinero?
              </h2>
              <p className="text-xl text-muted-foreground animate-on-scroll-left stagger-1">
                Completa el formulario y te contactamos en menos de 24 horas para ayudarte
              </p>
            </div>

            <Card className="p-8 animate-on-scroll-right">
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input id="nombre" placeholder="Tu nombre completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" placeholder="+57 300 123 4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo">Correo electrónico</Label>
                  <Input id="correo" type="email" placeholder="tu@email.com" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fondo">Fondo de cesantías</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu fondo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="porvenir">Porvenir</SelectItem>
                        <SelectItem value="proteccion">Protección</SelectItem>
                        <SelectItem value="colfondos">Colfondos</SelectItem>
                        <SelectItem value="fna">FNA</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor aproximado</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Rango de valor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">$1M - $5M COP</SelectItem>
                        <SelectItem value="5-10">$5M - $10M COP</SelectItem>
                        <SelectItem value="10-20">$10M - $20M COP</SelectItem>
                        <SelectItem value="20+">Más de $20M COP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6">
                  Desbloquear mi dinero
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Al enviar, aceptas nuestros términos y condiciones y política de privacidad
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative animate-on-scroll-scale">
            <img
              src="/smartphone-con-candado-abierto-transform-ndose-en-.jpg"
              alt="Smartphone con candado abierto"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6" />
                <span className="font-semibold">Respuesta en 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prueba-social" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 animate-on-scroll">
            Respaldados por los principales fondos de cesantías
          </h2>
          <p className="text-muted-foreground mb-12 animate-on-scroll stagger-1">
            Trabajamos con transparencia y confianza
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 hover-lift animate-on-scroll stagger-1">
              <img src="/porvenir-logo.jpg" alt="Porvenir" className="max-h-16 w-auto object-contain hover-scale" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 hover-lift animate-on-scroll stagger-2">
              <img src="/proteccion-logo.jpg" alt="Protección" className="max-h-16 w-auto object-contain hover-scale" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 hover-lift animate-on-scroll stagger-3">
              <img src="/colfondos-logo.jpg" alt="Colfondos" className="max-h-16 w-auto object-contain hover-scale" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 hover-lift animate-on-scroll stagger-4">
              <img src="/fna-logo.jpg" alt="FNA" className="max-h-16 w-auto object-contain hover-scale" />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 animate-on-scroll-left">
              <div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-balance mb-4">
                  Preguntas <span className="text-primary">frecuentes</span>
                </h2>
                <p className="text-xl text-muted-foreground">Resolvemos todas tus dudas sobre el proceso</p>
              </div>

              <img
                src="/asistente-virtual-con-chat-burbuja--interfaz-amiga.jpg"
                alt="Asistente virtual con chat"
                className="w-full h-64 object-cover rounded-xl shadow-lg hover-lift"
              />
            </div>

            <div className="space-y-4 animate-on-scroll-right">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg px-6 hover-lift">
                  <AccordionTrigger className="text-left accordion-trigger">
                    ¿Cuánto puedo retirar de mis cesantías?
                  </AccordionTrigger>
                  <AccordionContent>
                    Hasta el porcentaje permitido según tu fondo y las causales establecidas por ley. Te ayudamos a
                    calcular el monto exacto disponible para ti.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-lg px-6 hover-lift">
                  <AccordionTrigger className="text-left accordion-trigger">
                    ¿Cuánto tiempo toma el proceso?
                  </AccordionTrigger>
                  <AccordionContent>
                    El proceso completo toma entre 5 a 15 días hábiles, dependiendo del fondo. Aceleramos todos los
                    trámites posibles para ti.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-lg px-6 hover-lift">
                  <AccordionTrigger className="text-left accordion-trigger">¿Qué documentos necesito?</AccordionTrigger>
                  <AccordionContent>
                    Cédula, certificado laboral, y algunos documentos específicos según la causal. Te guiamos para
                    conseguir todo fácilmente.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-lg px-6 hover-lift">
                  <AccordionTrigger className="text-left accordion-trigger">¿Es seguro el proceso?</AccordionTrigger>
                  <AccordionContent>
                    Completamente seguro. Trabajamos directamente con los fondos oficiales y cumplimos todas las
                    regulaciones financieras colombianas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border rounded-lg px-6 hover-lift">
                  <AccordionTrigger className="text-left accordion-trigger">
                    ¿Cuánto cuesta mi servicio?
                  </AccordionTrigger>
                  <AccordionContent>
                    Solo cobramos una comisión por éxito. Si no logras retirar tu dinero, no pagas nada. Sin costos
                    ocultos.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <img
                src="/images/design-mode/logolibre.png"
                alt="LibreFondo"
                className="h-8 w-auto brightness-0 invert"
              />
              <p className="text-secondary-foreground/80">Desbloquea tu dinero, úsalo como quieras</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-semibold">Contacto</h3>
              <div className="space-y-2 text-secondary-foreground/80">
                <p>WhatsApp: +57 313 359 3183</p>
                <p>Email: hola@librefondo.com</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-semibold">Legal</h3>
              <div className="space-y-2 text-secondary-foreground/80">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-left hover:text-secondary-foreground transition-colors">
                      Términos y condiciones
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Términos y Condiciones - LibreFondo</DialogTitle>
                    </DialogHeader>
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
                        LibreFondo opera bajo el modelo de "comisión por éxito". Solo cobramos honorarios si el retiro
                        de cesantías es aprobado y efectivamente recibido por el usuario. El porcentaje de comisión será
                        informado claramente antes de iniciar el proceso.
                      </p>

                      <h3 className="font-semibold text-base">4. PROTECCIÓN DE DATOS PERSONALES</h3>
                      <p>
                        En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, LibreFondo se compromete a
                        proteger la información personal de nuestros usuarios. Los datos serán utilizados únicamente
                        para la prestación del servicio de asesoría en retiro de cesantías.
                      </p>

                      <h3 className="font-semibold text-base">5. JURISDICCIÓN</h3>
                      <p>
                        Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia será
                        resuelta por los tribunales competentes de Colombia.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-left hover:text-secondary-foreground transition-colors">
                      Política de privacidad
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Política de Privacidad - LibreFondo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <p>
                        <strong>Última actualización:</strong> Septiembre 2025
                      </p>

                      <h3 className="font-semibold text-base">1. RESPONSABLE DEL TRATAMIENTO</h3>
                      <p>
                        LibreFondo, en cumplimiento de la Ley 1581 de 2012 de Protección de Datos Personales de
                        Colombia, informa sobre el tratamiento de datos personales.
                      </p>

                      <h3 className="font-semibold text-base">2. DATOS RECOLECTADOS</h3>
                      <p>
                        Recolectamos: nombre completo, número de WhatsApp, correo electrónico, fondo de cesantías, valor
                        aproximado de cesantías, y documentos necesarios para el trámite.
                      </p>

                      <h3 className="font-semibold text-base">3. FINALIDAD DEL TRATAMIENTO</h3>
                      <p>
                        Los datos se utilizan exclusivamente para: brindar asesoría en retiro de cesantías, comunicación
                        durante el proceso, cumplimiento de obligaciones legales, y mejora de nuestros servicios.
                      </p>

                      <h3 className="font-semibold text-base">4. DERECHOS DEL TITULAR</h3>
                      <p>
                        Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos personales, así como
                        revocar la autorización otorgada. Contacta: hola@librefondo.com
                      </p>

                      <h3 className="font-semibold text-base">5. SEGURIDAD</h3>
                      <p>
                        Implementamos medidas técnicas y administrativas para proteger tus datos contra acceso no
                        autorizado, pérdida o alteración.
                      </p>

                      <h3 className="font-semibold text-base">6. CONSERVACIÓN</h3>
                      <p>
                        Los datos se conservarán durante el tiempo necesario para cumplir con las finalidades descritas
                        y las obligaciones legales aplicables.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 pt-8">
            <p className="text-center text-secondary-foreground/60 text-sm">
              Este servicio guía y acompaña el proceso de retiro de cesantías. No somos los fondos administradores.
            </p>
            <p className="text-center text-secondary-foreground/60 text-sm mt-2">
              © 2025 LibreFondo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto modal-content">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">¿Listo para desbloquear tu dinero?</DialogTitle>
            <p className="text-muted-foreground">Te contactamos en menos de 24 horas para ayudarte</p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Tu nombre completo</Label>
                <Input id="nombre" placeholder="Escribe tu nombre completo" className="input-focus" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">Tu WhatsApp</Label>
                <Input id="whatsapp" placeholder="+57 300 123 4567" className="input-focus" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="correo">Tu correo electrónico</Label>
              <Input id="correo" type="email" placeholder="tu@email.com" className="input-focus" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fondo">Tu fondo de cesantías</Label>
                <Select>
                  <SelectTrigger className="input-focus">
                    <SelectValue placeholder="Selecciona tu fondo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="porvenir">Porvenir</SelectItem>
                    <SelectItem value="proteccion">Protección</SelectItem>
                    <SelectItem value="colfondos">Colfondos</SelectItem>
                    <SelectItem value="fna">FNA</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor aproximado</Label>
                <Select>
                  <SelectTrigger className="input-focus">
                    <SelectValue placeholder="Rango de valor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">$1M - $5M COP</SelectItem>
                    <SelectItem value="5-10">$5M - $10M COP</SelectItem>
                    <SelectItem value="10-20">$10M - $20M COP</SelectItem>
                    <SelectItem value="20+">Más de $20M COP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6 btn-animate hover-glow">
              Quiero desbloquear mi dinero ya
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Al enviar, aceptas nuestros términos y condiciones y política de privacidad
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
