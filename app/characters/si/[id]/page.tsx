"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, Edit, Save, X } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { type SiCharacter, getSiCharacterById, updateSiCharacter } from "@/lib/firebase-service"
import { useToast } from "@/hooks/use-toast"

const SiCharacterDetailPage = () => {
  const params = useParams()
  const { toast } = useToast()
  const [character, setCharacter] = useState<SiCharacter | null>(null)
  const [editingCharacter, setEditingCharacter] = useState<SiCharacter | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setLoading(true)
        const id = params.id as string
        const data = await getSiCharacterById(id)
        if (data) {
          setCharacter(data)
          setEditingCharacter(data)
        }
      } catch (error) {
        console.error("Error loading character:", error)
        toast({
          title: "Lỗi",
          description: "Không thể tải thông tin nhân vật",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadCharacter()
    }
  }, [params.id, toast])

  const handleSave = async () => {
    if (!character?.id || !editingCharacter) return

    try {
      setSaving(true)
      await updateSiCharacter(character.id, editingCharacter)
      setCharacter(editingCharacter)
      setIsEditing(false)
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin nhân vật",
      })
    } catch (error) {
      console.error("Error updating character:", error)
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật nhân vật",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditingCharacter(character)
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Đang tải thông tin nhân vật...</p>
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Không tìm thấy nhân vật</p>
          <Button asChild>
            <Link href="/characters/si">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <Button asChild variant="outline" className="brush-cursor">
            <Link href="/characters/si">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Link>
          </Button>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-gray-800 hover:bg-gray-900 brush-cursor">
              <Edit className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 brush-cursor"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {saving ? "Đang lưu..." : "Lưu"}
              </Button>
              <Button onClick={handleCancel} variant="outline" disabled={saving} className="brush-cursor">
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
            </div>
          )}
        </div>

        {/* Character Info */}
        <Card className="bg-white/90 backdrop-blur-sm border-gray-300 mb-6">
          <CardHeader>
            <CardTitle className="text-3xl calligraphy text-gray-900">
              {isEditing ? (
                <Input
                  value={editingCharacter?.name || ""}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter!, name: e.target.value })}
                  className="text-3xl font-bold"
                />
              ) : (
                character.name
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image */}
              <div>
                <Label>Hình ảnh nhân vật</Label>
                <div className="mt-2">
                  <img
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    className="w-full max-w-sm h-auto rounded-lg border border-gray-300"
                  />
                  {isEditing && (
                    <Input
                      value={editingCharacter?.image || ""}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter!, image: e.target.value })}
                      placeholder="URL ảnh nhân vật"
                      className="mt-2"
                    />
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label>Chú thích</Label>
                  {isEditing ? (
                    <Input
                      value={editingCharacter?.note1 || ""}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter!, note1: e.target.value })}
                    />
                  ) : (
                    <p className="mt-1 text-gray-700">{character.note1 || "Không có"}</p>
                  )}
                </div>

                {/* Star Levels */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Cấp Sao</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-sm">2★</Label>
                      {isEditing ? (
                        <Input
                          value={editingCharacter?.star2 || ""}
                          onChange={(e) => setEditingCharacter({ ...editingCharacter!, star2: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-700">{character.star2}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm">3★</Label>
                      {isEditing ? (
                        <Input
                          value={editingCharacter?.star3 || ""}
                          onChange={(e) => setEditingCharacter({ ...editingCharacter!, star3: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-700">{character.star3}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm">4★</Label>
                      {isEditing ? (
                        <Input
                          value={editingCharacter?.star4 || ""}
                          onChange={(e) => setEditingCharacter({ ...editingCharacter!, star4: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-700">{character.star4}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-white/90 backdrop-blur-sm border-gray-300 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Chỉ Số</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <Label className="text-xs text-gray-600">Xây dựng</Label>
                {isEditing ? (
                  <Input
                    value={editingCharacter?.construction || ""}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter!, construction: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-semibold text-blue-600 text-lg">{character.construction}</p>
                )}
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <Label className="text-xs text-gray-600">Trồng trọt</Label>
                {isEditing ? (
                  <Input
                    value={editingCharacter?.farming || ""}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter!, farming: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-semibold text-green-600 text-lg">{character.farming}</p>
                )}
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <Label className="text-xs text-gray-600">Sản xuất</Label>
                {isEditing ? (
                  <Input
                    value={editingCharacter?.production || ""}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter!, production: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-semibold text-orange-600 text-lg">{character.production}</p>
                )}
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <Label className="text-xs text-gray-600">Tài chính</Label>
                {isEditing ? (
                  <Input
                    value={editingCharacter?.finance || ""}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter!, finance: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-semibold text-yellow-600 text-lg">{character.finance}</p>
                )}
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <Label className="text-xs text-gray-600">Thám hiểm</Label>
                {isEditing ? (
                  <Input
                    value={editingCharacter?.exploration || ""}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter!, exploration: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-semibold text-purple-600 text-lg">{character.exploration}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Treasure */}
        <Card className="bg-white/90 backdrop-blur-sm border-gray-300 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Pháp Bảo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                src={character.treasureImage || "/placeholder.svg"}
                alt={character.treasureName}
                className="w-20 h-20 object-cover rounded-lg border border-gray-300"
              />
              <div className="flex-1">
                <Label>Tên pháp bảo</Label>
                {isEditing ? (
                  <Input
                    value={editingCharacter?.treasureName || ""}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter!, treasureName: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{character.treasureName}</p>
                )}
                {isEditing && (
                  <Input
                    value={editingCharacter?.treasureImage || ""}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter!, treasureImage: e.target.value })}
                    placeholder="URL ảnh pháp bảo"
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level 50 Stats */}
        <Card className="bg-white/90 backdrop-blur-sm border-gray-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Thuộc Tính Level 50</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Input
                value={editingCharacter?.level50Stats || ""}
                onChange={(e) => setEditingCharacter({ ...editingCharacter!, level50Stats: e.target.value })}
              />
            ) : (
              <p className="text-gray-700">{character.level50Stats}</p>
            )}
            {character.note2 && (
              <div className="mt-4">
                <Label>Ghi chú</Label>
                {isEditing ? (
                  <Input
                    value={editingCharacter?.note2 || ""}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter!, note2: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-gray-600 mt-1">{character.note2}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SiCharacterDetailPage
