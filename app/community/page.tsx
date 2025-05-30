"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Save, X, MessageCircle, Users, Shield, ExternalLink } from "lucide-react"

interface CommunityLink {
  id: number
  name: string
  type: "chat" | "facebook" | "clan"
  url: string
  description: string
  memberCount?: string
}

export default function CommunityPage() {
  const [links, setLinks] = useState<CommunityLink[]>([
    {
      id: 1,
      name: "Nhóm Chat Chính",
      type: "chat",
      url: "https://discord.gg/example",
      description: "Kênh chat chính thức của game, thảo luận về gameplay và cập nhật mới nhất",
      memberCount: "1,234",
    },
    {
      id: 2,
      name: "Facebook Giang Nam",
      type: "facebook",
      url: "https://facebook.com/groups/example",
      description: "Nhóm Facebook chính thức, chia sẻ hình ảnh và tin tức game",
      memberCount: "5,678",
    },
    {
      id: 3,
      name: "Clan Thiên Long",
      type: "clan",
      url: "https://example.com/clan/thienlong",
      description: "Clan mạnh nhất server, tuyển thành viên có kinh nghiệm",
      memberCount: "50/100",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<CommunityLink | null>(null)
  const [formData, setFormData] = useState<Partial<CommunityLink>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingLink) {
      setLinks(links.map((link) => (link.id === editingLink.id ? { ...link, ...formData } : link)))
      setEditingLink(null)
    } else {
      const newLink: CommunityLink = {
        id: Date.now(),
        name: formData.name || "",
        type: (formData.type as CommunityLink["type"]) || "chat",
        url: formData.url || "",
        description: formData.description || "",
        memberCount: formData.memberCount,
      }
      setLinks([...links, newLink])
    }

    setFormData({})
    setIsAddDialogOpen(false)
  }

  const handleEdit = (link: CommunityLink) => {
    setEditingLink(link)
    setFormData(link)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const resetForm = () => {
    setEditingLink(null)
    setFormData({})
  }

  const getIcon = (type: CommunityLink["type"]) => {
    switch (type) {
      case "chat":
        return MessageCircle
      case "facebook":
        return Users
      case "clan":
        return Shield
      default:
        return MessageCircle
    }
  }

  const getTypeColor = (type: CommunityLink["type"]) => {
    switch (type) {
      case "chat":
        return "bg-blue-100 text-blue-800"
      case "facebook":
        return "bg-indigo-100 text-indigo-800"
      case "clan":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeName = (type: CommunityLink["type"]) => {
    switch (type) {
      case "chat":
        return "Nhóm Chat"
      case "facebook":
        return "Facebook"
      case "clan":
        return "Clan"
      default:
        return "Khác"
    }
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4 calligraphy">Cộng Đồng</h1>
              <p className="text-lg text-gray-700">Kết nối với cộng đồng game thủ Giang Nam</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-gray-800 hover:bg-gray-900 text-white whitespace-nowrap brush-cursor"
                  onClick={resetForm}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm Liên Kết
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingLink ? "Chỉnh Sửa Liên Kết" : "Thêm Liên Kết Mới"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Tên nhóm/kênh *</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Loại *</Label>
                    <select
                      id="type"
                      value={formData.type || "chat"}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as CommunityLink["type"] })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="chat">Nhóm Chat</option>
                      <option value="facebook">Facebook</option>
                      <option value="clan">Clan</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="url">URL/Link *</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url || ""}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      required
                      placeholder="https://..."
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
                    <Label htmlFor="memberCount">Số thành viên (tùy chọn)</Label>
                    <Input
                      id="memberCount"
                      value={formData.memberCount || ""}
                      onChange={(e) => setFormData({ ...formData, memberCount: e.target.value })}
                      placeholder="VD: 1,234 hoặc 50/100"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-gray-800 hover:bg-gray-900 brush-cursor">
                      <Save className="w-4 h-4 mr-2" />
                      {editingLink ? "Cập Nhật" : "Thêm Mới"}
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

          {/* Community Links Grid */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {links.map((link) => {
              const IconComponent = getIcon(link.type)
              return (
                <Card
                  key={link.id}
                  className="bg-white/90 backdrop-blur-sm border-gray-300 hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-gray-900 calligraphy">{link.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(link.type)}`}>
                              {getTypeName(link.type)}
                            </span>
                            {link.memberCount && (
                              <span className="text-xs text-gray-500">{link.memberCount} thành viên</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(link)}
                          className="text-gray-600 hover:text-gray-800 p-1 brush-cursor"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(link.id)}
                          className="text-red-600 hover:text-red-800 p-1 brush-cursor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{link.description}</p>

                    <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white brush-cursor">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Tham Gia Ngay
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {links.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có liên kết cộng đồng nào</h3>
              <p className="text-gray-500 mb-4">Hãy thêm liên kết đầu tiên để kết nối cộng đồng!</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gray-800 hover:bg-gray-900 brush-cursor">
                <Plus className="w-4 h-4 mr-2" />
                Thêm Liên Kết
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
