"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Save, X, Target, ImageIcon, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { getCityById, updateCity } from "@/lib/firebase-service"

interface Quest {
  id: string
  name: string
  guide: string
  image?: string
}

interface CityImage {
  id: string
  url: string
  title: string
  description?: string
}

interface CityDetail {
  id?: string
  name: string
  description: string
  introduction: string
  quests: Quest[]
  images: CityImage[]
}

export default function CityDetailPage({ params }: { params: { id: string } }) {
  const [cityDetail, setCityDetail] = useState<CityDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditingIntro, setIsEditingIntro] = useState(false)
  const [introText, setIntroText] = useState("")
  const [isQuestDialogOpen, setIsQuestDialogOpen] = useState(false)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null)
  const [editingImage, setEditingImage] = useState<CityImage | null>(null)
  const [questForm, setQuestForm] = useState<Partial<Quest>>({})
  const [imageForm, setImageForm] = useState<Partial<CityImage>>({})
  const { toast } = useToast()

  useEffect(() => {
    loadCityDetail()
  }, [params.id])

  const loadCityDetail = async () => {
    try {
      setLoading(true)
      const city = await getCityById(params.id)
      if (city) {
        const detail: CityDetail = {
          ...city,
          introduction: city.description || "",
          quests: city.quests || [],
          images: city.images || [],
        }
        setCityDetail(detail)
        setIntroText(detail.introduction)
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải thông tin thành phố",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveIntro = async () => {
    if (!cityDetail?.id) return

    try {
      setSaving(true)
      await updateCity(cityDetail.id, {
        description: introText,
      })
      setCityDetail({ ...cityDetail, introduction: introText })
      setIsEditingIntro(false)
      toast({
        title: "Thành công",
        description: "Đã cập nhật giới thiệu thành phố",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật giới thiệu",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleQuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cityDetail?.id) return

    try {
      setSaving(true)
      let updatedQuests: Quest[]

      if (editingQuest) {
        updatedQuests = cityDetail.quests.map((quest) =>
          quest.id === editingQuest.id ? { ...quest, ...questForm } : quest,
        )
      } else {
        const newQuest: Quest = {
          id: Date.now().toString(),
          name: questForm.name || "",
          guide: questForm.guide || "",
          image: questForm.image,
        }
        updatedQuests = [...cityDetail.quests, newQuest]
      }

      await updateCity(cityDetail.id, { quests: updatedQuests })
      setCityDetail({ ...cityDetail, quests: updatedQuests })
      setQuestForm({})
      setEditingQuest(null)
      setIsQuestDialogOpen(false)

      toast({
        title: "Thành công",
        description: editingQuest ? "Đã cập nhật nhiệm vụ" : "Đã thêm nhiệm vụ mới",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu nhiệm vụ",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cityDetail?.id) return

    try {
      setSaving(true)
      let updatedImages: CityImage[]

      if (editingImage) {
        updatedImages = cityDetail.images.map((img) =>
          img.id === editingImage.id ? { ...img, ...imageForm } : img,
        )
      } else {
        const newImage: CityImage = {
          id: Date.now().toString(),
          url: imageForm.url || "",
          title: imageForm.title || "",
          description: imageForm.description,
        }
        updatedImages = [...cityDetail.images, newImage]
      }

      await updateCity(cityDetail.id, { images: updatedImages })
      setCityDetail({ ...cityDetail, images: updatedImages })
      setImageForm({})
      setEditingImage(null)
      setIsImageDialogOpen(false)

      toast({
        title: "Thành công",
        description: editingImage ? "Đã cập nhật hình ảnh" : "Đã thêm hình ảnh mới",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu hình ảnh",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteQuest = async (id: string) => {
    if (!cityDetail?.id) return

    try {
      const updatedQuests = cityDetail.quests.filter((quest) => quest.id !== id)
      await updateCity(cityDetail.id, { quests: updatedQuests })
      setCityDetail({ ...cityDetail, quests: updatedQuests })
      toast({
        title: "Thành công",
        description: "Đã xóa nhiệm vụ",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa nhiệm vụ",
        variant: "destructive",
      })
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (!cityDetail?.id) return

    try {
      const updatedImages = cityDetail.images.filter((img) => img.id !== id)
      await updateCity(cityDetail.id, { images: updatedImages })
      setCityDetail({ ...cityDetail, images: updatedImages })
      toast({
        title: "Thành công",
        description: "Đã xóa hình ảnh",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa hình ảnh",
        variant: "destructive",
      })
    }
  }

  const resetQuestForm = () => {
    setEditingQuest(null)
    setQuestForm({})
  }

  const resetImageForm = () => {
    setEditingImage(null)
    setImageForm({})
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (!cityDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy thành phố</h2>
          <Button asChild>
            <Link href="/cities">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden py-8">
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 animate-float">
          <div className="w-4 h-4 bg-gray-400 rounded-full opacity-30"></div>
        </div>
        <div className="absolute top-32 right-20 animate-float-delayed">
          <div className="w-3 h-3 bg-gray-500 rounded-full opacity-20"></div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button asChild variant="outline" className="mb-4">
              <Link href="/cities">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 calligraphy">{cityDetail.name}</h1>
          </div>

          {/* Introduction Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-300 mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-gray-900 calligraphy">Giới Thiệu Thành Phố</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditingIntro(!isEditingIntro)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditingIntro ? "Hủy" : "Chỉnh sửa"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditingIntro ? (
                <div className="space-y-4">
                  <Textarea
                    value={introText}
                    onChange={(e) => setIntroText(e.target.value)}
                    rows={6}
                    className="w-full"
                    disabled={saving}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveIntro} className="bg-gray-800 hover:bg-gray-900" disabled={saving}>
                      {saving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {saving ? "Đang lưu..." : "Lưu"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingIntro(false)} disabled={saving}>
                      <X className="w-4 h-4 mr-2" />
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">{cityDetail.introduction}</p>
              )}
            </CardContent>
          </Card>

          {/* Quests Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-300 mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-gray-900 calligraphy">Danh Sách Nhiệm Vụ</CardTitle>
                <Dialog open={isQuestDialogOpen} onOpenChange={setIsQuestDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 hover:bg-gray-900 text-white" onClick={resetQuestForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm Nhiệm Vụ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editingQuest ? "Chỉnh Sửa Nhiệm Vụ" : "Thêm Nhiệm Vụ Mới"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleQuestSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="questName">Tên nhiệm vụ *</Label>
                        <Input
                          id="questName"
                          value={questForm.name || ""}
                          onChange={(e) => setQuestForm({ ...questForm, name: e.target.value })}
                          required
                          disabled={saving}
                        />
                      </div>

                      <div>
                        <Label htmlFor="questGuide">Hướng dẫn hoàn thành *</Label>
                        <Textarea
                          id="questGuide"
                          value={questForm.guide || ""}
                          onChange={(e) => setQuestForm({ ...questForm, guide: e.target.value })}
                          required
                          rows={3}
                          disabled={saving}
                        />
                      </div>

                      <div>
                        <Label htmlFor="questImage">URL hình ảnh</Label>
                        <Input
                          id="questImage"
                          type="url"
                          value={questForm.image || ""}
                          onChange={(e) => setQuestForm({ ...questForm, image: e.target.value })}
                          placeholder="/placeholder.svg?height=150&width=200"
                          disabled={saving}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-gray-800 hover:bg-gray-900" disabled={saving}>
                          {saving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          {saving ? "Đang lưu..." : editingQuest ? "Cập Nhật" : "Thêm Mới"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsQuestDialogOpen(false)}
                          disabled={saving}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Hủy
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cityDetail.quests.map((quest) => (
                  <Card key={quest.id} className="border border-gray-200">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-gray-900 flex-1 mr-2">{quest.name}</CardTitle>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingQuest(quest)
                              setQuestForm(quest)
                              setIsQuestDialogOpen(true)
                            }}
                            className="text-gray-600 hover:text-gray-800 p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteQuest(quest.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {quest.image && (
                        <img
                          src={quest.image || "/placeholder.svg"}
                          alt={quest.name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                      )}
                      <p className="text-gray-700 text-sm">{quest.guide}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {cityDetail.quests.length === 0 && (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có nhiệm vụ nào được thêm</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Images Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-300">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-gray-900 calligraphy">Hình Ảnh Thành Phố</CardTitle>
                <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 hover:bg-gray-900 text-white" onClick={resetImageForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm Hình Ảnh
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editingImage ? "Chỉnh Sửa Hình Ảnh" : "Thêm Hình Ảnh Mới"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleImageSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="imageUrl">URL hình ảnh *</Label>
                        <Input
                          id="imageUrl"
                          type="url"
                          value={imageForm.url || ""}
                          onChange={(e) => setImageForm({ ...imageForm, url: e.target.value })}
                          required
                          placeholder="/placeholder.svg?height=300&width=400"
                          disabled={saving}
                        />
                      </div>

                      <div>
                        <Label htmlFor="imageTitle">Tiêu đề *</Label>
                        <Input
                          id="imageTitle"
                          value={imageForm.title || ""}
                          onChange={(e) => setImageForm({ ...imageForm, title: e.target.value })}
                          required
                          disabled={saving}
                        />
                      </div>

                      <div>
                        <Label htmlFor="imageDescription">Mô tả</Label>
                        <Input
                          id="imageDescription"
                          value={imageForm.description || ""}
                          onChange={(e) => setImageForm({ ...imageForm, description: e.target.value })}
                          disabled={saving}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-gray-800 hover:bg-gray-900" disabled={saving}>
                          {saving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          {saving ? "Đang lưu..." : editingImage ? "Cập Nhật" : "Thêm Mới"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsImageDialogOpen(false)} disabled={saving}>
                          <X className="w-4 h-4 mr-2" />
                          Hủy
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityDetail.images.map((image) => (
                  <Card key={image.id} className="border border-gray-200 group">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingImage(image)
                                setImageForm(image)
                                setIsImageDialogOpen(true)
                              }}
                              className="bg-white/80 text-gray-600 hover:text-gray-800 p-1"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteImage(image.id)}
                              className="bg-white/80 text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                        {image.description && <p className="text-sm text-gray-600">{image.description}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {cityDetail.images.length === 0 && (
                <div className="text-center py-8">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có hình ảnh nào được thêm</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
