"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MapPin, BookOpen, ChevronLeft, ChevronRight, MessageCircle, Shield, Palette } from "lucide-react"
import Link from "next/link"

interface HomePageCard {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  iconColor: string
  href: string
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<HomePageCard[]>([
    {
      id: "characters",
      title: "Danh Sách Nhân Vật",
      description: "Khám phá các nhân vật với ba hệ Thiên, Hầu, Sĩ",
      icon: "Users",
      gradient: "from-blue-100 to-indigo-100",
      iconColor: "text-blue-600",
      href: "/characters",
    },
    {
      id: "cities",
      title: "Danh Sách Thành Phố",
      description: "Tham quan các thành phố cổ kính trong game",
      icon: "MapPin",
      gradient: "from-green-100 to-emerald-100",
      iconColor: "text-green-600",
      href: "/cities",
    },
    {
      id: "story",
      title: "Cốt Truyện",
      description: "Đọc câu chuyện hấp dẫn của từng nhân vật",
      icon: "BookOpen",
      gradient: "from-purple-100 to-pink-100",
      iconColor: "text-purple-600",
      href: "/story",
    },
  ])

  useEffect(() => {
    // Load saved settings from localStorage
    const savedCards = localStorage.getItem("homePageCards")
    if (savedCards) {
      try {
        const parsedCards = JSON.parse(savedCards)
        setSlides(parsedCards)
      } catch (error) {
        console.error("Error loading saved cards:", error)
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Users,
      MapPin,
      BookOpen,
      MessageCircle,
      Shield,
      Palette,
    }
    return iconMap[iconName] || Users
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
      {/* Traditional Chinese Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Enhanced Floating cherry blossoms */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 animate-float">
          <div className="w-6 h-6 rounded-full bg-gray-300 opacity-40"></div>
        </div>
        <div className="absolute top-32 right-20 animate-float-delayed">
          <div className="w-4 h-4 rounded-full bg-gray-400 opacity-30"></div>
        </div>
        <div className="absolute top-64 left-1/4 animate-float">
          <div className="w-5 h-5 rounded-full bg-gray-300 opacity-35"></div>
        </div>
        <div className="absolute top-96 right-1/3 animate-float-delayed">
          <div className="w-6 h-6 rounded-full bg-gray-400 opacity-40"></div>
        </div>
        <div className="absolute top-20 left-1/2 animate-float">
          <div className="w-4 h-4 rounded-full bg-gray-300 opacity-30"></div>
        </div>
        <div className="absolute top-80 left-20 animate-float-delayed">
          <div className="w-5 h-5 rounded-full bg-gray-400 opacity-35"></div>
        </div>
        <div className="absolute top-40 right-10 animate-float">
          <div className="w-3 h-3 rounded-full bg-gray-300 opacity-25"></div>
        </div>
        <div className="absolute top-72 left-1/3 animate-float-delayed">
          <div className="w-7 h-7 rounded-full bg-gray-400 opacity-45"></div>
        </div>
        <div className="absolute top-16 left-3/4 animate-float">
          <div className="w-5 h-5 rounded-full bg-gray-300 opacity-30"></div>
        </div>
        <div className="absolute top-88 right-1/4 animate-float-delayed">
          <div className="w-4 h-4 rounded-full bg-gray-400 opacity-35"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section with Image Slider */}
        <section className="relative h-screen flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Image Slider Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {[
                "/placeholder.svg?height=800&width=1200&text=Giang+Nam+1",
                "/placeholder.svg?height=800&width=1200&text=Giang+Nam+2",
                "/placeholder.svg?height=800&width=1200&text=Giang+Nam+3",
              ].map((src, index) => (
                <div key={index} className="w-full h-full flex-shrink-0">
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Giang Nam ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 brush-cursor ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative text-center text-white z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 calligraphy drop-shadow-2xl">江南百景圖</h1>
            <h2 className="text-2xl md:text-4xl mb-4 calligraphy drop-shadow-lg">Giang Nam Bách Cảnh Đồ</h2>
            <p className="text-lg md:text-xl drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
              Khám phá thế giới cổ trang tuyệt đẹp với phong cách thuỷ mặc Trung Hoa, nơi hội tụ những nhân vật huyền
              thoại và câu chuyện bất hủ
            </p>
          </div>
        </section>

        {/* Features Slider Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center text-gray-900 mb-12 calligraphy">Khám Phá Thế Giới Game</h3>

            {/* Mobile-First Slider */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => {
                    const IconComponent = getIconComponent(slide.icon)
                    return (
                      <div key={index} className="w-full flex-shrink-0 px-2">
                        <Card
                          className={`bg-gradient-to-br ${slide.gradient} border-gray-300 hover:shadow-2xl transition-all duration-300 group h-80`}
                        >
                          <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                            <div
                              className={`w-20 h-20 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                            >
                              <IconComponent className={`w-10 h-10 ${slide.iconColor}`} />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-4 calligraphy">{slide.title}</h4>
                            <p className="text-gray-700 mb-6 leading-relaxed">{slide.description}</p>
                            <Button asChild className="bg-gray-800 hover:bg-gray-900 text-white mt-auto brush-cursor">
                              <Link href={slide.href}>Khám Phá Ngay</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Slider Controls */}
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg brush-cursor"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg brush-cursor"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Slider Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 brush-cursor ${
                      index === currentSlide ? "bg-gray-800" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid (Hidden on Mobile) */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8 mt-16">
              {slides.map((slide, index) => {
                const IconComponent = getIconComponent(slide.icon)
                return (
                  <Card
                    key={index}
                    className={`bg-gradient-to-br ${slide.gradient} border-gray-300 hover:shadow-2xl transition-all duration-300 group`}
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-20 h-20 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className={`w-10 h-10 ${slide.iconColor}`} />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-4 calligraphy">{slide.title}</h4>
                      <p className="text-gray-700 mb-6 leading-relaxed">{slide.description}</p>
                      <Button asChild className="bg-gray-800 hover:bg-gray-900 text-white brush-cursor">
                        <Link href={slide.href}>Khám Phá Ngay</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
