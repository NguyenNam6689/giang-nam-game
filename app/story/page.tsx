"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Save, X, BookOpen, User } from "lucide-react"

interface Character {
  id: number
  name: string
  image: string
  story: string
}

export default function StoryPage() {
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 1,
      name: "Lý Bạch",
      image: "/placeholder.svg?height=200&width=150",
      story:
        "Lý Bạch sinh năm 701 tại Tây Vực, là một trong những thi nhân vĩ đại nhất của Trung Quốc. Ông được mệnh danh là 'Thi Tiên' với tài năng thơ ca xuất chúng và tính cách phóng khoáng, tự do. Cuộc đời ông gắn liền với rượu và thơ, tạo nên những tác phẩm bất hủ như 'Tĩnh Dạ Tư', 'Vọng Lư Sơn Thác Bố'...",
    },
    {
      id: 2,
      name: "Tô Đông Pha",
      image: "/placeholder.svg?height=200&width=150",
      story:
        "Tô Đông Pha (1037-1101) là một trong tứ đại văn hào thời Tống. Ông không chỉ nổi tiếng với tài thơ văn mà còn là một quan lại tài ba, họa sĩ và nhà thư pháp xuất sắc. Cuộc đời ông trải qua nhiều thăng trầm chính trị nhưng luôn giữ được tinh thần lạc quan và triết lý sống sâu sắc...",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null)
  const [formData, setFormData] = useState<Partial<Character>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCharacter) {
      setCharacters(characters.map((char) => (char.id === editingCharacter.id ? { ...char, ...formData } : char)))
      setEditingCharacter(null)
    } else {
      const newCharacter: Character = {
        id: Date.now(),
        name: formData.name || "",
        image: formData.image || "/placeholder.svg?height=200&width=150",
        story: formData.story || "",
      }
      setCharacters([...characters, newCharacter])
    }

    setFormData({})
    setIsDialogOpen(false)
  }

  const handleEdit = (character: Character) => {
    setEditingCharacter(character)
    setFormData(character)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setCharacters(characters.filter((char) => char.id !== id))
  }

  const resetForm = () => {
    setEditingCharacter(null)
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
                  Thêm Nhân Vật
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingCharacter ? "Chỉnh Sửa Cốt Truyện" : "Thêm Cốt Truyện Mới"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Tên nhân vật *</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
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
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-gray-800 hover:bg-gray-900 brush-cursor">
                      <Save className="w-4 h-4 mr-2" />
                      {editingCharacter ? "Cập Nhật" : "Thêm Mới"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
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

          {/* Mobile-First Character Grid */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {characters.map((character) => (
              <Card
                key={character.id}
                className="bg-white/90 backdrop-blur-sm border-gray-300 hover:shadow-xl transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-xl text-gray-900 calligraphy flex-1 mr-2">{character.name}</CardTitle>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(character)}
                        className="text-gray-600 hover:text-gray-800 p-1 brush-cursor"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(character.id)}
                        className="text-red-600 hover:text-red-800 p-1 brush-cursor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <img
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
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
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">{character.story}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {characters.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có cốt truyện nào</h3>
              <p className="text-gray-500 mb-4">Hãy thêm cốt truyện đầu tiên cho nhân vật!</p>
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
