"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Save, X, BookOpen, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  type Story,
  getAllStories,
  addStory,
  updateStory,
  deleteStory,
} from "@/lib/firebase-service"

export default function StoryPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [formData, setFormData] = useState<Partial<Story>>({})
  const { toast } = useToast()

  // Load stories from Firebase
  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    try {
      setLoading(true)
      const data = await getAllStories()
      setStories(data)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách cốt truyện",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingStory && editingStory.id) {
        // Update existing story
        await updateStory(editingStory.id, formData)
        setStories(stories.map((story) => (story.id === editingStory.id ? { ...story, ...formData } : story)))
        toast({
          title: "Thành công",
          description: "Đã cập nhật cốt truyện",
        })
      } else {
        // Add new story
        const newStory = await addStory({
          name: formData.name || "",
          image: formData.image || "/placeholder.svg?height=200&width=150",
          story: formData.story || "",
        })
        setStories([newStory, ...stories])
        toast({
          title: "Thành công",
          description: "Đã thêm cốt truyện mới",
        })
      }

      setFormData({})
      setEditingStory(null)
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: editingStory ? "Không thể cập nhật cốt truyện" : "Không thể thêm cốt truyện",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (story: Story) => {
    setEditingStory(story)
    setFormData(story)
    setIsDialogOpen(true)
  }

  const handleDelete = async (story: Story) => {
    if (!story.id) return

    if (!confirm(`Bạn có chắc chắn muốn xóa cốt truyện "${story.name}"?`)) {
      return
    }

    try {
      await deleteStory(story.id)
      setStories(stories.filter((s) => s.id !== story.id))
      toast({
        title: "Thành công",
        description: "Đã xóa cốt truyện",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa cốt truyện",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingStory(null)
    setFormData({})
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4 calligraphy">Cốt Truyện Nhân Vật</h1>
              <p className="text-lg text-gray-700">Quản lý câu chuyện và tiểu sử của các nhân vật</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-gray-800 hover:bg-gray-900 text-white whitespace-nowrap brush-cursor"
                  onClick={resetForm}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm Cốt Truyện
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingStory ? "Chỉnh Sửa Cốt Truyện" : "Thêm Cốt Truyện Mới"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Tên nhân vật *</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">URL hình ảnh</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image || ""}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/placeholder.svg?height=200&width=150"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="story">Nội dung cốt truyện *</Label>
                    <Textarea
                      id="story"
                      value={formData.story || ""}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      required
                      rows={8}
                      placeholder="Nhập nội dung cốt truyện của nhân vật..."
                      disabled={submitting}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-gray-800 hover:bg-gray-900 brush-cursor" disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {submitting ? "Đang lưu..." : editingStory ? "Cập Nhật" : "Thêm Mới"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="brush-cursor"
                      disabled={submitting}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Hủy
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile-First Character Grid */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {stories.map((story) => (
              <Card
                key={story.id}
                className="bg-white/90 backdrop-blur-sm border-gray-300 hover:shadow-xl transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-xl text-gray-900 calligraphy flex-1 mr-2">{story.name}</CardTitle>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(story)}
                        className="text-gray-600 hover:text-gray-800 p-1 brush-cursor"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(story)}
                        className="text-red-600 hover:text-red-800 p-1 brush-cursor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      className="w-32 h-40 object-cover rounded-lg border border-gray-300 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Cốt Truyện
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">{story.story}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {stories.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có cốt truyện nào</h3>
              <p className="text-gray-500 mb-4">Hãy thêm cốt truyện đầu tiên vào Firebase!</p>
              <Button onClick={() => setIsDialogOpen(true)} className="bg-gray-800 hover:bg-gray-900 brush-cursor">
                <Plus className="w-4 h-4 mr-2" />
                Thêm Cốt Truyện
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
