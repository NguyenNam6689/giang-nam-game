"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Save, X } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

interface CharacterDetail {
  id: number
  name: string
  image: string
  story: string
}

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<CharacterDetail>({
    id: Number.parseInt(params.id),
    name: "Lý Bạch",
    image: "/placeholder.svg?height=400&width=300",
    story: `Lý Bạch sinh năm 701 tại Tây Vực, là một trong những thi nhân vĩ đại nhất của Trung Quốc. Ông được mệnh danh là 'Thi Tiên' với tài năng thơ ca xuất chúng và tính cách phóng khoáng, tự do.

Cuộc đời ông gắn liền với rượu và thơ, tạo nên những tác phẩm bất hủ như 'Tĩnh Dạ Tư', 'Vọng Lư Sơn Thác Bố'. Lý Bạch có tính cách tự do, không thích bị ràng buộc bởi lễ giáo và chính trị.

Ông từng được Đường Huyền Tông triệu vào cung làm quan nhưng sau đó lại rời bỏ để tiếp tục cuộc sống du lịch khắp nơi. Thơ của Lý Bạch mang đậm chất lãng mạn, hào sảng và có sức ảnh hưởng lớn đến văn học Trung Quốc.

Lý Bạch qua đời năm 762, để lại cho hậu thế một kho tàng thơ ca vô giá và hình ảnh của một thi nhân tài hoa, phóng khoáng.`,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedStory, setEditedStory] = useState(character.story)

  const handleSave = () => {
    setCharacter({ ...character, story: editedStory })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedStory(character.story)
    setIsEditing(false)
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button asChild variant="outline" className="mb-4 brush-cursor">
              <Link href="/story">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 calligraphy">{character.name}</h1>
          </div>

          {/* Character Detail Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-300">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-gray-900 calligraphy">Cốt Truyện Chi Tiết</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="brush-cursor">
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Hủy" : "Chỉnh sửa"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Character Image */}
              <div className="flex justify-center">
                <img
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  className="w-64 h-80 object-cover rounded-lg border border-gray-300 shadow-lg"
                />
              </div>

              {/* Story Content */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 calligraphy">Câu Chuyện</h3>
                {isEditing ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editedStory}
                      onChange={(e) => setEditedStory(e.target.value)}
                      rows={15}
                      className="w-full"
                      placeholder="Nhập nội dung cốt truyện..."
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="bg-gray-800 hover:bg-gray-900 brush-cursor">
                        <Save className="w-4 h-4 mr-2" />
                        Lưu
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="brush-cursor">
                        <X className="w-4 h-4 mr-2" />
                        Hủy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-gray max-w-none">
                    {character.story.split("\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
