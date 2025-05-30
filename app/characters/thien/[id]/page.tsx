"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { type ChangeEvent, useEffect, useState } from "react"
import { type ThienCharacterDetail, getThienCharacterById, updateThienCharacter } from "@/lib/firebase-service"

interface Params {
  id: string
}

const ThienCharacterDetailPage = () => {
  const params = useParams<Params>()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [editedCharacter, setEditedCharacter] = useState<ThienCharacterDetail | null>(null)
  const [character, setCharacter] = useState<ThienCharacterDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = await getThienCharacterById(params.id)
        if (data) {
          setCharacter(data)
          setEditedCharacter(data)
        }
      } catch (error) {
        console.error("Error loading character:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCharacter()
  }, [params.id])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedCharacter((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSave = async () => {
    if (!character?.id) return

    try {
      await updateThienCharacter(character.id, editedCharacter)
      setCharacter(editedCharacter)
      setIsEditing(false)
      // Show success toast
    } catch (error) {
      console.error("Error updating character:", error)
      // Show error toast
    }
  }

  const handleCancel = () => {
    setEditedCharacter(character)
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-blue-600">Đang tải thông tin nhân vật...</p>
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy nhân vật</p>
          <Button asChild className="mt-4">
            <Link href="/characters/thien">Quay lại danh sách</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild>
            <Link href="/characters/thien">Quay lại danh sách</Link>
          </Button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">
            {isEditing ? (
              <Input
                type="text"
                name="name"
                value={editedCharacter?.name || ""}
                onChange={handleInputChange}
                className="w-full"
              />
            ) : (
              character?.name
            )}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Hình ảnh</Label>
              {isEditing ? (
                <Input
                  type="text"
                  name="imageUrl"
                  value={editedCharacter?.imageUrl || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              ) : (
                <img
                  src={character?.imageUrl || "/placeholder.svg"}
                  alt={character?.name}
                  className="w-full h-auto rounded-md"
                />
              )}
            </div>

            <div>
              <Label>Mô tả</Label>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={editedCharacter?.description || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              ) : (
                <p>{character?.description}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            {isEditing ? (
              <>
                <Button variant="secondary" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button className="ml-2" onClick={handleSave}>
                  Lưu
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThienCharacterDetailPage
