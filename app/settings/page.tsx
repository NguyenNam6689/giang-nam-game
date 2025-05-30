"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, RotateCcw, Users, MapPin, BookOpen, MessageCircle, Shield, Palette, Upload, X } from "lucide-react"

interface HomePageCard {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  iconColor: string
  href: string
}

export default function SettingsPage() {
  const [cards, setCards] = useState<HomePageCard[]>([
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

  const [hasChanges, setHasChanges] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [logoSettings, setLogoSettings] = useState({
    logoText: "江南百景圖",
    logoSubtext: "Giang Nam Bách Cảnh Đồ",
    logoImage: "", // URL của ảnh logo
    useImageLogo: false, // true nếu dùng ảnh, false nếu dùng icon
  })

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#1f2937", // gray-800
    secondaryColor: "#3b82f6", // blue-600
    accentColor: "#10b981", // emerald-600
  })

  const iconOptions = [
    { value: "Users", label: "Users", component: Users },
    { value: "MapPin", label: "MapPin", component: MapPin },
    { value: "BookOpen", label: "BookOpen", component: BookOpen },
    { value: "MessageCircle", label: "MessageCircle", component: MessageCircle },
    { value: "Shield", label: "Shield", component: Shield },
    { value: "Palette", label: "Palette", component: Palette },
  ]

  const gradientOptions = [
    {
      value: "from-blue-100 to-indigo-100",
      label: "Xanh Dương",
      preview: "bg-gradient-to-r from-blue-100 to-indigo-100",
    },
    {
      value: "from-green-100 to-emerald-100",
      label: "Xanh Lá",
      preview: "bg-gradient-to-r from-green-100 to-emerald-100",
    },
    {
      value: "from-purple-100 to-pink-100",
      label: "Tím Hồng",
      preview: "bg-gradient-to-r from-purple-100 to-pink-100",
    },
    {
      value: "from-yellow-100 to-orange-100",
      label: "Vàng Cam",
      preview: "bg-gradient-to-r from-yellow-100 to-orange-100",
    },
    { value: "from-red-100 to-pink-100", label: "Đỏ Hồng", preview: "bg-gradient-to-r from-red-100 to-pink-100" },
    { value: "from-gray-100 to-slate-100", label: "Xám", preview: "bg-gradient-to-r from-gray-100 to-slate-100" },
  ]

  const iconColorOptions = [
    { value: "text-blue-600", label: "Xanh Dương", preview: "bg-blue-600" },
    { value: "text-green-600", label: "Xanh Lá", preview: "bg-green-600" },
    { value: "text-purple-600", label: "Tím", preview: "bg-purple-600" },
    { value: "text-yellow-600", label: "Vàng", preview: "bg-yellow-600" },
    { value: "text-red-600", label: "Đỏ", preview: "bg-red-600" },
    { value: "text-gray-600", label: "Xám", preview: "bg-gray-600" },
  ]

  const predefinedThemes = [
    {
      name: "Mặc Định",
      primary: "#1f2937",
      secondary: "#3b82f6",
      accent: "#10b981",
    },
    {
      name: "Cổ Điển",
      primary: "#92400e",
      secondary: "#d97706",
      accent: "#f59e0b",
    },
    {
      name: "Thanh Lịch",
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#60a5fa",
    },
    {
      name: "Tự Nhiên",
      primary: "#166534",
      secondary: "#16a34a",
      accent: "#22c55e",
    },
    {
      name: "Hoàng Gia",
      primary: "#7c2d12",
      secondary: "#dc2626",
      accent: "#ef4444",
    },
    {
      name: "Huyền Bí",
      primary: "#581c87",
      secondary: "#9333ea",
      accent: "#a855f7",
    },
  ]

  const updateCard = (id: string, field: keyof HomePageCard, value: string) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, [field]: value } : card)))
    setHasChanges(true)
  }

  const handleLogoImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setLogoSettings((prev) => ({
          ...prev,
          logoImage: imageUrl,
          useImageLogo: true,
        }))
        setHasChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogoImage = () => {
    setLogoSettings((prev) => ({
      ...prev,
      logoImage: "",
      useImageLogo: false,
    }))
    setHasChanges(true)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const applyTheme = (theme: (typeof predefinedThemes)[0]) => {
    setThemeSettings({
      primaryColor: theme.primary,
      secondaryColor: theme.secondary,
      accentColor: theme.accent,
    })
    setHasChanges(true)
  }

  const handleSave = () => {
    localStorage.setItem("homePageCards", JSON.stringify(cards))
    localStorage.setItem("logoSettings", JSON.stringify(logoSettings))
    localStorage.setItem("themeSettings", JSON.stringify(themeSettings))

    // Apply theme to CSS variables
    document.documentElement.style.setProperty("--primary-color", themeSettings.primaryColor)
    document.documentElement.style.setProperty("--secondary-color", themeSettings.secondaryColor)
    document.documentElement.style.setProperty("--accent-color", themeSettings.accentColor)

    setHasChanges(false)
    alert("Cài đặt đã được lưu!")
  }

  const handleReset = () => {
    const defaultCards: HomePageCard[] = [
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
    ]
    setCards(defaultCards)
    setLogoSettings({
      logoText: "江南百景圖",
      logoSubtext: "Giang Nam Bách Cảnh Đồ",
      logoImage: "",
      useImageLogo: false,
    })
    setThemeSettings({
      primaryColor: "#1f2937",
      secondaryColor: "#3b82f6",
      accentColor: "#10b981",
    })
    setHasChanges(true)
  }

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find((option) => option.value === iconName)
    return iconOption ? iconOption.component : Users
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 animate-float">
          <div className="w-4 h-4 bg-gray-400 rounded-full opacity-30"></div>
        </div>
        <div className="absolute top-32 right-20 animate-float-delayed">
          <div className="w-3 h-3 bg-gray-500 rounded-full opacity-20"></div>
        </div>
        <div className="absolute top-64 left-1/4 animate-float">
          <div className="w-5 h-5 bg-gray-400 rounded-full opacity-25"></div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 calligraphy">Cài Đặt Trang Chủ</h1>
              <p className="text-lg text-gray-700">Tùy chỉnh giao diện và nội dung các card trên trang chủ</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset} className="brush-cursor">
                <RotateCcw className="w-4 h-4 mr-2" />
                Khôi Phục
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="bg-gray-800 hover:bg-gray-900 text-white brush-cursor"
              >
                <Save className="w-4 h-4 mr-2" />
                Lưu Thay Đổi
              </Button>
            </div>
          </div>

          {/* Logo Settings */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-300 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 calligraphy">Cài Đặt Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Xem Trước Logo:</h4>
                <div className="flex items-center space-x-3 p-4 bg-white rounded border">
                  {logoSettings.useImageLogo && logoSettings.logoImage ? (
                    <img
                      src={logoSettings.logoImage || "/placeholder.svg"}
                      alt="Logo"
                      className="w-12 h-12 object-contain rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Logo</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 calligraphy leading-none">
                      {logoSettings.logoText}
                    </span>
                    <span className="text-xs text-gray-600 leading-none">{logoSettings.logoSubtext}</span>
                  </div>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="space-y-4">
                <div>
                  <Label>Logo Image</Label>
                  <div className="mt-2">
                    {logoSettings.logoImage ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={logoSettings.logoImage || "/placeholder.svg"}
                          alt="Logo preview"
                          className="w-16 h-16 object-contain border rounded"
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="brush-cursor"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Thay Đổi
                          </Button>
                          <Button variant="outline" onClick={removeLogoImage} className="brush-cursor">
                            <X className="w-4 h-4 mr-2" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Tải lên logo của bạn</p>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="brush-cursor"
                        >
                          Chọn File
                        </Button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Logo Text Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="logoText">Văn Bản Logo Chính</Label>
                  <Input
                    id="logoText"
                    value={logoSettings.logoText}
                    onChange={(e) => {
                      setLogoSettings((prev) => ({ ...prev, logoText: e.target.value }))
                      setHasChanges(true)
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="logoSubtext">Văn Bản Phụ</Label>
                  <Input
                    id="logoSubtext"
                    value={logoSettings.logoSubtext}
                    onChange={(e) => {
                      setLogoSettings((prev) => ({ ...prev, logoSubtext: e.target.value }))
                      setHasChanges(true)
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-300 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 calligraphy">Màu Chủ Đạo Website</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Xem Trước Màu Sắc:</h4>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-lg border shadow-sm"
                      style={{ backgroundColor: themeSettings.primaryColor }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">Chính</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-lg border shadow-sm"
                      style={{ backgroundColor: themeSettings.secondaryColor }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">Phụ</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-lg border shadow-sm"
                      style={{ backgroundColor: themeSettings.accentColor }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">Nhấn</span>
                  </div>
                </div>
              </div>

              {/* Predefined Themes */}
              <div>
                <Label className="text-base font-semibold">Chủ Đề Có Sẵn</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-3">
                  {predefinedThemes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => applyTheme(theme)}
                      className="p-3 border rounded-lg hover:shadow-md transition-shadow brush-cursor"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.primary }}></div>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.secondary }}></div>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.accent }}></div>
                      </div>
                      <span className="text-xs font-medium">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="primaryColor">Màu Chính</Label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="color"
                      id="primaryColor"
                      value={themeSettings.primaryColor}
                      onChange={(e) => {
                        setThemeSettings((prev) => ({ ...prev, primaryColor: e.target.value }))
                        setHasChanges(true)
                      }}
                      className="w-12 h-10 border rounded cursor-pointer"
                    />
                    <Input
                      value={themeSettings.primaryColor}
                      onChange={(e) => {
                        setThemeSettings((prev) => ({ ...prev, primaryColor: e.target.value }))
                        setHasChanges(true)
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor">Màu Phụ</Label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="color"
                      id="secondaryColor"
                      value={themeSettings.secondaryColor}
                      onChange={(e) => {
                        setThemeSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))
                        setHasChanges(true)
                      }}
                      className="w-12 h-10 border rounded cursor-pointer"
                    />
                    <Input
                      value={themeSettings.secondaryColor}
                      onChange={(e) => {
                        setThemeSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))
                        setHasChanges(true)
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accentColor">Màu Nhấn</Label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="color"
                      id="accentColor"
                      value={themeSettings.accentColor}
                      onChange={(e) => {
                        setThemeSettings((prev) => ({ ...prev, accentColor: e.target.value }))
                        setHasChanges(true)
                      }}
                      className="w-12 h-10 border rounded cursor-pointer"
                    />
                    <Input
                      value={themeSettings.accentColor}
                      onChange={(e) => {
                        setThemeSettings((prev) => ({ ...prev, accentColor: e.target.value }))
                        setHasChanges(true)
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Settings */}
          <div className="space-y-8">
            {cards.map((card, index) => {
              const IconComponent = getIconComponent(card.icon)
              return (
                <Card key={card.id} className="bg-white/90 backdrop-blur-sm border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 calligraphy">
                      Card {index + 1}: {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Preview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Xem Trước:</h4>
                      <div
                        className={`bg-gradient-to-br ${card.gradient} border-gray-300 rounded-lg p-6 text-center max-w-sm`}
                      >
                        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className={`w-8 h-8 ${card.iconColor}`} />
                        </div>
                        <h5 className="text-lg font-bold text-gray-900 mb-2 calligraphy">{card.title}</h5>
                        <p className="text-gray-700 text-sm">{card.description}</p>
                      </div>
                    </div>

                    {/* Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor={`title-${card.id}`}>Tiêu Đề</Label>
                        <Input
                          id={`title-${card.id}`}
                          value={card.title}
                          onChange={(e) => updateCard(card.id, "title", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`icon-${card.id}`}>Icon</Label>
                        <select
                          id={`icon-${card.id}`}
                          value={card.icon}
                          onChange={(e) => updateCard(card.id, "icon", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {iconOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor={`description-${card.id}`}>Mô Tả</Label>
                        <Textarea
                          id={`description-${card.id}`}
                          value={card.description}
                          onChange={(e) => updateCard(card.id, "description", e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`gradient-${card.id}`}>Màu Nền</Label>
                        <div className="space-y-2">
                          <select
                            id={`gradient-${card.id}`}
                            value={card.gradient}
                            onChange={(e) => updateCard(card.id, "gradient", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            {gradientOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="flex gap-2 flex-wrap">
                            {gradientOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => updateCard(card.id, "gradient", option.value)}
                                className={`w-8 h-8 rounded ${option.preview} border-2 ${
                                  card.gradient === option.value ? "border-gray-800" : "border-gray-300"
                                } brush-cursor`}
                                title={option.label}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`iconColor-${card.id}`}>Màu Icon</Label>
                        <div className="space-y-2">
                          <select
                            id={`iconColor-${card.id}`}
                            value={card.iconColor}
                            onChange={(e) => updateCard(card.id, "iconColor", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            {iconColorOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="flex gap-2 flex-wrap">
                            {iconColorOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => updateCard(card.id, "iconColor", option.value)}
                                className={`w-8 h-8 rounded ${option.preview} border-2 ${
                                  card.iconColor === option.value ? "border-gray-800" : "border-gray-300"
                                } brush-cursor`}
                                title={option.label}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Save Notice */}
          {hasChanges && (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Lưu ý:</strong> Bạn có thay đổi chưa được lưu. Nhấn "Lưu Thay Đổi" để áp dụng các thay đổi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
