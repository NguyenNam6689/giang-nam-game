"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, Cherry } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const [logoSettings, setLogoSettings] = useState({
    logoText: "江南百景圖",
    logoSubtext: "Giang Nam Bách Cảnh Đồ",
    logoImage: "",
    useImageLogo: false,
  })

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#1f2937",
    secondaryColor: "#3b82f6",
    accentColor: "#10b981",
  })

  useEffect(() => {
    // Load logo settings
    const savedLogoSettings = localStorage.getItem("logoSettings")
    if (savedLogoSettings) {
      try {
        const parsedSettings = JSON.parse(savedLogoSettings)
        setLogoSettings(parsedSettings)
      } catch (error) {
        console.error("Error loading logo settings:", error)
      }
    }

    // Load theme settings
    const savedThemeSettings = localStorage.getItem("themeSettings")
    if (savedThemeSettings) {
      try {
        const parsedTheme = JSON.parse(savedThemeSettings)
        setThemeSettings(parsedTheme)

        // Apply theme to CSS variables
        document.documentElement.style.setProperty("--primary-color", parsedTheme.primaryColor)
        document.documentElement.style.setProperty("--secondary-color", parsedTheme.secondaryColor)
        document.documentElement.style.setProperty("--accent-color", parsedTheme.accentColor)
      } catch (error) {
        console.error("Error loading theme settings:", error)
      }
    }
  }, [])

  const menuItems = [
    { title: "Trang Chủ", href: "/" },
    {
      title: "Nhân Vật",
      href: "/characters",
      submenu: [
        { title: "Thiên", href: "/characters/thien", description: "Nhân vật hệ Thiên" },
        { title: "Hầu", href: "/characters/hau", description: "Nhân vật hệ Hầu" },
        { title: "Sĩ", href: "/characters/si", description: "Nhân vật hệ Sĩ" },
      ],
    },
    { title: "Thành Phố", href: "/cities" },
    { title: "Cốt Truyện", href: "/story" },
    // { title: "Cộng Đồng", href: "/community" },
    // { title: "Cài Đặt", href: "/settings" },
  ]

  return (
    <nav
      className="bg-white/95 backdrop-blur-md border-b border-gray-300 sticky top-0 z-50 shadow-sm"
      style={{
        borderBottomColor: themeSettings.primaryColor + "20",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 brush-cursor">
            <div className="relative">
              {logoSettings.useImageLogo && logoSettings.logoImage ? (
                <img
                  src={logoSettings.logoImage || "/placeholder.svg"}
                  alt="Logo"
                  className="w-10 h-10 object-contain rounded"
                />
              ) : (
                <Cherry className="w-8 h-8" style={{ color: themeSettings.primaryColor }} />
              )}
            </div>
            <div className="flex flex-col">
              <span
                className="text-xl font-bold calligraphy leading-none"
                style={{ color: themeSettings.primaryColor }}
              >
                {logoSettings.logoText}
              </span>
              <span className="text-xs text-gray-600 leading-none">{logoSettings.logoSubtext}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger
                          className="font-medium brush-cursor"
                          style={{
                            color: themeSettings.primaryColor,
                            "--hover-color": themeSettings.secondaryColor,
                          }}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-64 gap-3 p-4">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 brush-cursor"
                                    style={{
                                      "--hover-bg": themeSettings.accentColor + "10",
                                    }}
                                  >
                                    <div
                                      className="text-sm font-medium leading-none"
                                      style={{ color: themeSettings.primaryColor }}
                                    >
                                      {subItem.title}
                                    </div>
                                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 brush-cursor"
                          style={{
                            color: themeSettings.primaryColor,
                            "--hover-color": themeSettings.secondaryColor,
                          }}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="brush-cursor"
                  style={{ color: themeSettings.primaryColor }}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
                <div className="flex flex-col space-y-4 mt-8">
                  {menuItems.map((item) => (
                    <div key={item.title}>
                      <Link
                        href={item.href}
                        className="text-lg font-medium hover:opacity-80 block py-2 brush-cursor"
                        style={{ color: themeSettings.primaryColor }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="text-gray-700 hover:opacity-80 block py-1 text-sm brush-cursor"
                              onClick={() => setIsOpen(false)}
                            >
                              • {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
