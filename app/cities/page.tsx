"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, MapPin, Save, X } from "lucide-react"
import Link from "next/link"

interface City {
  id: number
  name: string
  description: string
  image: string
}

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([
    {
      id: 1,
      name: "Trường An",
      description: "Kinh đô thịnh vượng của triều Đường, nơi hội tụ văn hóa và nghệ thuật.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Biện Kinh",
      description: "Thủ đô của triều Tống, trung tâm thương mại và học thuật phát triển.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [formData, setFormData] = useState<Partial<City>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCity) {
      setCities(cities.map((city) => (city.id === editingCity.id ? { ...city, ...formData } : city)))
      setEditingCity(null)
    } else {
      const newCity: City = {
        id: Date.now(),
        name: formData.name || "",
        description: formData.description || "",
        image: formData.image || "/placeholder.svg?height=200&width=300",
      }
      setCities([...cities, newCity])
    }

    setFormData({})
    setIsAddDialogOpen(false)
  }

  const handleEdit = (city: City) => {
    setEditingCity(city)
    setFormData(city)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setCities(cities.filter((city) => city.id !== id))
  }

  const resetForm = () => {
    setEditingCity(null)
    setFormData({})
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4 calligraphy">Danh Sách Thành Phố</h1>
              <p className="text-lg text-gray-700">Quản lý thông tin các thành phố trong game</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-gray-800 hover:bg-gray-900 text-white whitespace-nowrap brush-cursor"
                  onClick={resetForm}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm Thành Phố
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingCity ? "Chỉnh Sửa Thành Phố" : "Thêm Thành Phố Mới"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Tên thành phố *</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Mô tả *</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">URL hình ảnh</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image || ""}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/placeholder.svg?height=200&width=300"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-gray-800 hover:bg-gray-900 brush-cursor">
                      <Save className="w-4 h-4 mr-2" />
                      {editingCity ? "Cập Nhật" : "Thêm Mới"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="brush-cursor"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Hủy
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile-First Grid Layout */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {cities.map((city) => (
              <Card
                key={city.id}
                className="bg-white/90 backdrop-blur-sm border-gray-300 hover:shadow-xl transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-gray-900 calligraphy flex-1 mr-2">{city.name}</CardTitle>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(city)}
                        className="text-gray-600 hover:text-gray-800 p-1 brush-cursor"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(city.id)}
                        className="text-red-600 hover:text-red-800 p-1 brush-cursor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={city.image || "/placeholder.svg"}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed">{city.description}</p>

                  <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white brush-cursor">
                    <Link href={`/cities/${city.id}`}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Xem Chi Tiết
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {cities.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có thành phố nào</h3>
              <p className="text-gray-500 mb-4">Hãy thêm thành phố đầu tiên để bắt đầu!</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gray-800 hover:bg-gray-900 brush-cursor">
                <Plus className="w-4 h-4 mr-2" />
                Thêm Thành Phố
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
