"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Save, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  type HauCharacter,
  addHauCharacter,
  getAllHauCharacters,
  updateHauCharacter,
  deleteHauCharacter,
} from "@/lib/firebase-service"

export default function HauCharactersPage() {
  const [characters, setCharacters] = useState<HauCharacter[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState<HauCharacter | null>(null)
  const [formData, setFormData] = useState<Partial<HauCharacter>>({})
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  // Load characters from Firebase
  useEffect(() => {
    loadCharacters()
  }, [])

  const loadCharacters = async () => {
    try {
      setLoading(true)
      const data = await getAllHauCharacters()
      setCharacters(data)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách nhân vật",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingCharacter && editingCharacter.id) {
        // Update existing character
        await updateHauCharacter(editingCharacter.id, formData)
        setCharacters(characters.map((char) => (char.id === editingCharacter.id ? { ...char, ...formData } : char)))
        toast({
          title: "Thành công",
          description: "Cập nhật nhân vật thành công",
        })
      } else {
        // Add new character
        const newCharacter = await addHauCharacter({
          name: formData.name || "",
          image: formData.image || "/placeholder.svg?height=100&width=100",
          note1: formData.note1 || "",
          star2: formData.star2 || "",
          star3: formData.star3 || "",
          star4: formData.star4 || "",
          construction: formData.construction || "",
          farming: formData.farming || "",
          production: formData.production || "",
          finance: formData.finance || "",
          exploration: formData.exploration || "",
          treasureName: formData.treasureName || "",
          treasureImage: formData.treasureImage || "/placeholder.svg?height=60&width=60",
          level50Stats: formData.level50Stats || "",
          note2: formData.note2 || "",
        })
        setCharacters([newCharacter, ...characters])
        toast({
          title: "Thành công",
          description: "Thêm nhân vật mới thành công",
        })
      }

      setFormData({})
      setEditingCharacter(null)
      setIsAddDialogOpen(false)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: editingCharacter ? "Không thể cập nhật nhân vật" : "Không thể thêm nhân vật",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (character: HauCharacter) => {
    setEditingCharacter(character)
    setFormData(character)
    setIsAddDialogOpen(true)
  }

  const handleDelete = async (character: HauCharacter) => {
    if (!character.id) return

    if (!confirm(`Bạn có chắc chắn muốn xóa nhân vật "${character.name}"?`)) {
      return
    }

    try {
      await deleteHauCharacter(character.id)
      setCharacters(characters.filter((char) => char.id !== character.id))
      toast({
        title: "Thành công",
        description: "Xóa nhân vật thành công",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa nhân vật",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingCharacter(null)
    setFormData({})
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Đang tải dữ liệu...</span>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4 calligraphy">Nhân Vật Hệ Hầu</h1>
              <p className="text-lg text-gray-700">Quản lý thông tin chi tiết các nhân vật hệ Hầu</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                  <DialogTitle>{editingCharacter ? "Chỉnh Sửa Nhân Vật" : "Thêm Nhân Vật Mới"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Label htmlFor="image">URL ảnh nhân vật</Label>
                      <Input
                        id="image"
                        type="url"
                        value={formData.image || ""}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/placeholder.svg?height=100&width=100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="note1">Chú thích 1</Label>
                    <Input
                      id="note1"
                      value={formData.note1 || ""}
                      onChange={(e) => setFormData({ ...formData, note1: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="star2">2* *</Label>
                      <Input
                        id="star2"
                        value={formData.star2 || ""}
                        onChange={(e) => setFormData({ ...formData, star2: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="star3">3* *</Label>
                      <Input
                        id="star3"
                        value={formData.star3 || ""}
                        onChange={(e) => setFormData({ ...formData, star3: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="star4">4* *</Label>
                      <Input
                        id="star4"
                        value={formData.star4 || ""}
                        onChange={(e) => setFormData({ ...formData, star4: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="construction">Xây dựng *</Label>
                      <Input
                        id="construction"
                        value={formData.construction || ""}
                        onChange={(e) => setFormData({ ...formData, construction: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="farming">Trồng trọt *</Label>
                      <Input
                        id="farming"
                        value={formData.farming || ""}
                        onChange={(e) => setFormData({ ...formData, farming: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="production">Sản xuất *</Label>
                      <Input
                        id="production"
                        value={formData.production || ""}
                        onChange={(e) => setFormData({ ...formData, production: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="finance">Tài chính *</Label>
                      <Input
                        id="finance"
                        value={formData.finance || ""}
                        onChange={(e) => setFormData({ ...formData, finance: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="exploration">Thám hiểm *</Label>
                      <Input
                        id="exploration"
                        value={formData.exploration || ""}
                        onChange={(e) => setFormData({ ...formData, exploration: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="treasureName">Tên pháp bảo *</Label>
                      <Input
                        id="treasureName"
                        value={formData.treasureName || ""}
                        onChange={(e) => setFormData({ ...formData, treasureName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="treasureImage">URL ảnh pháp bảo</Label>
                      <Input
                        id="treasureImage"
                        type="url"
                        value={formData.treasureImage || ""}
                        onChange={(e) => setFormData({ ...formData, treasureImage: e.target.value })}
                        placeholder="/placeholder.svg?height=60&width=60"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="level50Stats">Thuộc tính level 50 *</Label>
                    <Input
                      id="level50Stats"
                      value={formData.level50Stats || ""}
                      onChange={(e) => setFormData({ ...formData, level50Stats: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="note2">Chú thích 2</Label>
                    <Input
                      id="note2"
                      value={formData.note2 || ""}
                      onChange={(e) => setFormData({ ...formData, note2: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex-1 bg-gray-800 hover:bg-gray-900 brush-cursor"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {editingCharacter ? "Cập Nhật" : "Thêm Mới"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
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

          {/* Mobile-Optimized Character Cards */}
          <div className="space-y-4">
            {characters.map((character) => (
              <Card key={character.id} className="bg-white/90 backdrop-blur-sm border-gray-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={character.image || "/placeholder.svg"}
                        alt={character.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                      />
                      <div>
                        <CardTitle className="text-xl text-gray-900 calligraphy">{character.name}</CardTitle>
                        {character.note1 && <p className="text-gray-600 text-sm">{character.note1}</p>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => character.id && toggleRowExpansion(character.id)}
                        className="text-gray-600 hover:text-gray-800 p-1 brush-cursor"
                      >
                        {character.id && expandedRows.has(character.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
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
                        onClick={() => handleDelete(character)}
                        className="text-red-600 hover:text-red-800 p-1 brush-cursor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {character.id && expandedRows.has(character.id) && (
                  <CardContent className="space-y-4">
                    {/* Star Levels */}
                    <div className="grid grid-cols-1 gap-2">
                      <div className="bg-gray-50 rounded p-3">
                        <h4 className="font-semibold text-gray-800 mb-2">Cấp Sao</h4>
                        <div className="space-y-1 text-sm">
                          <div>
                            <strong>2*:</strong> {character.star2}
                          </div>
                          <div>
                            <strong>3*:</strong> {character.star3}
                          </div>
                          <div>
                            <strong>4*:</strong> {character.star4}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 rounded p-3 text-center">
                        <div className="text-xs text-gray-600">Xây dựng</div>
                        <div className="font-semibold text-red-600">{character.construction}</div>
                      </div>
                      <div className="bg-green-50 rounded p-3 text-center">
                        <div className="text-xs text-gray-600">Trồng trọt</div>
                        <div className="font-semibold text-green-600">{character.farming}</div>
                      </div>
                      <div className="bg-orange-50 rounded p-3 text-center">
                        <div className="text-xs text-gray-600">Sản xuất</div>
                        <div className="font-semibold text-orange-600">{character.production}</div>
                      </div>
                      <div className="bg-yellow-50 rounded p-3 text-center">
                        <div className="text-xs text-gray-600">Tài chính</div>
                        <div className="font-semibold text-yellow-600">{character.finance}</div>
                      </div>
                      <div className="bg-purple-50 rounded p-3 text-center col-span-2">
                        <div className="text-xs text-gray-600">Thám hiểm</div>
                        <div className="font-semibold text-purple-600">{character.exploration}</div>
                      </div>
                    </div>

                    {/* Treasure */}
                    <div className="bg-gray-50 rounded p-3">
                      <h4 className="font-semibold text-gray-800 mb-2">Pháp Bảo</h4>
                      <div className="flex items-center gap-3">
                        <img
                          src={character.treasureImage || "/placeholder.svg"}
                          alt={character.treasureName}
                          className="w-12 h-12 object-cover rounded border border-gray-300"
                        />
                        <span className="text-gray-700">{character.treasureName}</span>
                      </div>
                    </div>

                    {/* Level 50 Stats */}
                    <div className="bg-gray-50 rounded p-3">
                      <h4 className="font-semibold text-gray-800 mb-2">Thuộc tính Level 50</h4>
                      <p className="text-gray-700 text-sm">{character.level50Stats}</p>
                    </div>

                    {/* Note 2 */}
                    {character.note2 && (
                      <div className="bg-gray-50 rounded p-3">
                        <h4 className="font-semibold text-gray-800 mb-2">Chú thích</h4>
                        <p className="text-gray-700 text-sm">{character.note2}</p>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {characters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Chưa có nhân vật nào được thêm</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gray-800 hover:bg-gray-900 brush-cursor">
                <Plus className="w-4 h-4 mr-2" />
                Thêm Nhân Vật Đầu Tiên
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
