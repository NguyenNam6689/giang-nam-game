"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Upload, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

interface GalleryImage {
  id: number
  url: string
  title: string
  description?: string
  category: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      url: "/placeholder.svg?height=400&width=600",
      title: "Cảnh Giang Nam Mùa Xuân",
      description: "Khung cảnh thơ mộng của Giang Nam với hoa đào nở rộ",
      category: "Phong Cảnh",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=400&width=600",
      title: "Nhân Vật Lý Bạch",
      description: "Hình ảnh thi tiên Lý Bạch trong trang phục cổ trang",
      category: "Nhân Vật",
    },
    {
      id: 3,
      url: "/placeholder.svg?height=400&width=600",
      title: "Cung Điện Hoàng Gia",
      description: "Kiến trúc cung điện thời Đường với những chi tiết tinh xảo",
      category: "Kiến Trúc",
    },
    {
      id: 4,
      url: "/placeholder.svg?height=400&width=600",
      title: "Trận Chiến Huyền Thoại",
      description: "Cảnh chiến đấu hoành tráng giữa các anh hùng",
      category: "Chiến Đấu",
    },
    {
      id: 5,
      url: "/placeholder.svg?height=400&width=600",
      title: "Phong Cảnh Núi Non",
      description: "Dãy núi hùng vĩ trong sương mù",
      category: "Phong Cảnh",
    },
    {
      id: 6,
      url: "/placeholder.svg?height=400&width=600",
      title: "Lễ Hội Hoa Đăng",
      description: "Lễ hội truyền thống với hàng nghìn chiếc đèn lồng",
      category: "Sự Kiện",
    },
    {
      id: 7,
      url: "/placeholder.svg?height=400&width=600",
      title: "Tô Đông Pha Ngâm Thơ",
      description: "Khoảnh khắc Tô Đông Pha sáng tác thơ bên hồ",
      category: "Nhân Vật",
    },
    {
      id: 8,
      url: "/placeholder.svg?height=400&width=600",
      title: "Chợ Phố Cổ",
      description: "Khung cảnh nhộn nhịp của chợ phố thời xưa",
      category: "Đời Sống",
    },
  ])

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất Cả")
  const [uploadForm, setUploadForm] = useState({
    url: "",
    title: "",
    description: "",
    category: "Phong Cảnh",
  })

  const categories = ["Tất Cả", "Phong Cảnh", "Nhân Vật", "Kiến Trúc", "Chiến Đấu", "Sự Kiện", "Đời Sống"]

  const filteredImages =
    selectedCategory === "Tất Cả" ? images : images.filter((img) => img.category === selectedCategory)

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    const newImage: GalleryImage = {
      id: Date.now(),
      ...uploadForm,
    }
    setImages([...images, newImage])
    setUploadForm({ url: "", title: "", description: "", category: "Phong Cảnh" })
    setIsUploadDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(null)
    }
  }

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < filteredImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-emerald-800 mb-4 font-serif">Thư Viện Hình Ảnh</h1>
            <p className="text-lg text-gray-700">Bộ sưu tập hình ảnh tuyệt đẹp từ thế giới Giang Nam</p>
          </div>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 whitespace-nowrap">
                <Plus className="w-4 h-4 mr-2" />
                Thêm Ảnh
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <form onSubmit={handleUpload} className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">Thêm Hình Ảnh Mới</h3>

                <div>
                  <Label htmlFor="url">URL Hình Ảnh</Label>
                  <Input
                    id="url"
                    type="url"
                    value={uploadForm.url}
                    onChange={(e) => setUploadForm({ ...uploadForm, url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="title">Tiêu Đề</Label>
                  <Input
                    id="title"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Danh Mục</Label>
                  <select
                    id="category"
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Mô Tả (tùy chọn)</Label>
                  <Input
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Thêm Ảnh
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Hủy
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <Card
              key={image.id}
              className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-48 object-cover rounded-t-lg cursor-pointer transition-transform group-hover:scale-105"
                    onClick={() => openLightbox(index)}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(image.id)
                      }}
                      className="bg-red-500/80 hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-emerald-600/80 text-white text-xs px-2 py-1 rounded">{image.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-emerald-800 mb-1 line-clamp-1">{image.title}</h3>
                  {image.description && <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {selectedCategory === "Tất Cả"
                ? "Chưa có hình ảnh nào"
                : `Không có ảnh trong danh mục "${selectedCategory}"`}
            </h3>
            <p className="text-gray-500 mb-4">Hãy thêm hình ảnh đầu tiên vào thư viện!</p>
            <Button onClick={() => setIsUploadDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Ảnh
            </Button>
          </div>
        )}

        {/* Lightbox */}
        {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {selectedImageIndex > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
              )}

              {selectedImageIndex < filteredImages.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              )}

              <img
                src={filteredImages[selectedImageIndex].url || "/placeholder.svg"}
                alt={filteredImages[selectedImageIndex].title}
                className="max-w-full max-h-full object-contain"
              />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                      {filteredImages[selectedImageIndex].category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{filteredImages[selectedImageIndex].title}</h3>
                  {filteredImages[selectedImageIndex].description && (
                    <p className="text-gray-300">{filteredImages[selectedImageIndex].description}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    {selectedImageIndex + 1} / {filteredImages.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
