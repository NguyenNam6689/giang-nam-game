"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, ImageIcon, Sword, Star, Target, Award } from "lucide-react"

interface Quest {
  id: number
  name: string
  description: string
  difficulty: "Dễ" | "Trung Bình" | "Khó" | "Cực Khó"
  reward: string
  image?: string
  type: "Chính Tuyến" | "Phụ Tuyến" | "Hàng Ngày" | "Sự Kiện"
}

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 1,
      name: "Tìm Kiếm Hoa Đào Thiên Niên",
      description:
        "Hành trình tìm kiếm loài hoa đào huyền thoại nở một lần trong nghìn năm tại đỉnh núi Côn Lôn. Nhiệm vụ đòi hỏi sự kiên nhẫn và lòng dũng cảm để vượt qua những thử thách khắc nghiệt.",
      difficulty: "Khó",
      reward: "Trang bị huyền thoại + 5000 EXP + Danh hiệu 'Tìm Hoa'",
      type: "Chính Tuyến",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Giải Cứu Làng Chài",
      description:
        "Giúp đỡ ngư dân địa phương chống lại bầy quái vật biển đang tấn công làng chài. Bảo vệ người dân và khôi phục hòa bình cho vùng ven biển.",
      difficulty: "Trung Bình",
      reward: "2000 Vàng + Danh hiệu Anh Hùng + Trang bị hiếm",
      type: "Phụ Tuyến",
    },
    {
      id: 3,
      name: "Học Thuật Kiếm Thiên Hạ",
      description:
        "Tìm hiểu và luyện tập bí kíp kiếm thuật cổ xưa từ các cao thủ ẩn dật trong rừng sâu. Hoàn thành để mở khóa kỹ năng mới.",
      difficulty: "Cực Khó",
      reward: "Kỹ năng mới + Kiếm thần + 10000 EXP",
      type: "Chính Tuyến",
    },
    {
      id: 4,
      name: "Thu Thập Nguyên Liệu Hàng Ngày",
      description:
        "Thu thập các nguyên liệu cần thiết để chế tạo trang bị và thuốc men. Nhiệm vụ có thể lặp lại mỗi ngày.",
      difficulty: "Dễ",
      reward: "Nguyên liệu + 500 EXP + Vàng",
      type: "Hàng Ngày",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "Dễ" as Quest["difficulty"],
    reward: "",
    image: "",
    type: "Chính Tuyến" as Quest["type"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingQuest) {
      setQuests(quests.map((quest) => (quest.id === editingQuest.id ? { ...quest, ...formData } : quest)))
      setEditingQuest(null)
    } else {
      const newQuest: Quest = {
        id: Date.now(),
        ...formData,
      }
      setQuests([...quests, newQuest])
    }

    setFormData({ name: "", description: "", difficulty: "Dễ", reward: "", image: "", type: "Chính Tuyến" })
    setIsAddDialogOpen(false)
  }

  const handleEdit = (quest: Quest) => {
    setEditingQuest(quest)
    setFormData({
      name: quest.name,
      description: quest.description,
      difficulty: quest.difficulty,
      reward: quest.reward,
      image: quest.image || "",
      type: quest.type,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setQuests(quests.filter((quest) => quest.id !== id))
  }

  const getDifficultyColor = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "Dễ":
        return "bg-green-100 text-green-800"
      case "Trung Bình":
        return "bg-yellow-100 text-yellow-800"
      case "Khó":
        return "bg-orange-100 text-orange-800"
      case "Cực Khó":
        return "bg-red-100 text-red-800"
    }
  }

  const getTypeColor = (type: Quest["type"]) => {
    switch (type) {
      case "Chính Tuyến":
        return "bg-purple-100 text-purple-800"
      case "Phụ Tuyến":
        return "bg-blue-100 text-blue-800"
      case "Hàng Ngày":
        return "bg-green-100 text-green-800"
      case "Sự Kiện":
        return "bg-pink-100 text-pink-800"
    }
  }

  const getDifficultyStars = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "Dễ":
        return 1
      case "Trung Bình":
        return 2
      case "Khó":
        return 3
      case "Cực Khó":
        return 4
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-800 mb-4 font-serif">Hướng Dẫn Nhiệm Vụ</h1>
            <p className="text-lg text-gray-700">Quản lý và theo dõi các nhiệm vụ trong game</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap"
                onClick={() => {
                  setEditingQuest(null)
                  setFormData({
                    name: "",
                    description: "",
                    difficulty: "Dễ",
                    reward: "",
                    image: "",
                    type: "Chính Tuyến",
                  })
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm Nhiệm Vụ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingQuest ? "Chỉnh Sửa Nhiệm Vụ" : "Thêm Nhiệm Vụ Mới"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên Nhiệm Vụ</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mô Tả</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Độ Khó</Label>
                    <select
                      id="difficulty"
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Quest["difficulty"] })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Dễ">Dễ</option>
                      <option value="Trung Bình">Trung Bình</option>
                      <option value="Khó">Khó</option>
                      <option value="Cực Khó">Cực Khó</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="type">Loại Nhiệm Vụ</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Quest["type"] })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Chính Tuyến">Chính Tuyến</option>
                      <option value="Phụ Tuyến">Phụ Tuyến</option>
                      <option value="Hàng Ngày">Hàng Ngày</option>
                      <option value="Sự Kiện">Sự Kiện</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reward">Phần Thưởng</Label>
                  <Input
                    id="reward"
                    value={formData.reward}
                    onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">URL Hình Ảnh (tùy chọn)</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
                    {editingQuest ? "Cập Nhật" : "Thêm Mới"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Hủy
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quest Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-800">{quests.length}</div>
              <div className="text-sm text-gray-600">Tổng Nhiệm Vụ</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardContent className="p-4 text-center">
              <Sword className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">
                {quests.filter((q) => q.type === "Chính Tuyến").length}
              </div>
              <div className="text-sm text-gray-600">Chính Tuyến</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">
                {quests.filter((q) => q.type === "Phụ Tuyến").length}
              </div>
              <div className="text-sm text-gray-600">Phụ Tuyến</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">
                {quests.filter((q) => q.type === "Hàng Ngày").length}
              </div>
              <div className="text-sm text-gray-600">Hàng Ngày</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <Card
              key={quest.id}
              className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg text-amber-800 font-serif line-clamp-2 flex-1 mr-2">
                    {quest.name}
                  </CardTitle>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(quest)}
                      className="text-amber-600 hover:text-amber-700 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(quest.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getDifficultyColor(quest.difficulty)}>{quest.difficulty}</Badge>
                  <Badge className={getTypeColor(quest.type)}>{quest.type}</Badge>
                  <div className="flex">
                    {Array.from({ length: getDifficultyStars(quest.difficulty) }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {quest.image && (
                  <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={quest.image || "/placeholder.svg"}
                      alt={quest.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        target.nextElementSibling?.classList.remove("hidden")
                      }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                )}

                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{quest.description}</p>

                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">Phần Thưởng:</span>
                  </div>
                  <p className="text-sm text-amber-700">{quest.reward}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {quests.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có nhiệm vụ nào</h3>
            <p className="text-gray-500 mb-4">Hãy thêm nhiệm vụ đầu tiên để bắt đầu!</p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Nhiệm Vụ
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
