import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Sword, BookOpen } from "lucide-react"
import Link from "next/link"

export default function CharactersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Traditional Chinese Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating cherry blossoms */}
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
        <div className="absolute top-96 right-1/3 animate-float-delayed">
          <div className="w-4 h-4 bg-gray-500 rounded-full opacity-30"></div>
        </div>
        <div className="absolute top-20 left-1/2 animate-float">
          <div className="w-3 h-3 bg-gray-400 rounded-full opacity-20"></div>
        </div>
        <div className="absolute top-80 left-20 animate-float-delayed">
          <div className="w-5 h-5 bg-gray-500 rounded-full opacity-25"></div>
        </div>
      </div>

      <div className="relative z-10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 calligraphy">Danh Sách Nhân Vật</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Khám phá các nhân vật trong thế giới Giang Nam với ba hệ khác nhau
            </p>
          </div>

          {/* Mobile-First Card Layout */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {/* Thiên Characters */}
            <Card className="bg-white/90 backdrop-blur-sm border-gray-300 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Users className="w-10 h-10 text-blue-700" />
                </div>
                <CardTitle className="text-2xl text-gray-900 calligraphy">Hệ Thiên</CardTitle>
                <p className="text-gray-600">Nhân vật thuộc hệ Thiên</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-center">
                  Khám phá các nhân vật thuộc hệ Thiên với những đặc điểm và kỹ năng độc đáo.
                </p>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Đặc điểm:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Trí tuệ cao</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Kỹ năng đặc biệt</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Thuộc tính cân bằng</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white brush-cursor">
                  <Link href="/characters/thien">Xem Chi Tiết</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Hau Characters */}
            <Card className="bg-white/90 backdrop-blur-sm border-gray-300 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <Sword className="w-10 h-10 text-red-700" />
                </div>
                <CardTitle className="text-2xl text-gray-900 calligraphy">Hệ Hầu</CardTitle>
                <p className="text-gray-600">Nhân vật thuộc hệ Hầu</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-center">
                  Khám phá các nhân vật thuộc hệ Hầu với sức mạnh chiến đấu vượt trội.
                </p>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Đặc điểm:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Sức mạnh cao</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Chiến đấu xuất sắc</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Phòng thủ tốt</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white brush-cursor">
                  <Link href="/characters/hau">Xem Chi Tiết</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Si Characters */}
            <Card className="bg-white/90 backdrop-blur-sm border-gray-300 hover:shadow-xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <BookOpen className="w-10 h-10 text-green-700" />
                </div>
                <CardTitle className="text-2xl text-gray-900 calligraphy">Hệ Sĩ</CardTitle>
                <p className="text-gray-600">Nhân vật thuộc hệ Sĩ</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-center">
                  Khám phá các nhân vật thuộc hệ Sĩ với tài năng học thuật và quản lý.
                </p>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Đặc điểm:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Học thức uyên thâm</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Quản lý giỏi</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Hỗ trợ đội nhóm</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white brush-cursor">
                  <Link href="/characters/si">Xem Chi Tiết</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 calligraphy">Hệ Thống Nhân Vật</h3>
                <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Mỗi hệ nhân vật có những đặc điểm và kỹ năng riêng biệt. <strong>Hệ Thiên</strong> tập trung vào trí
                  tuệ và cân bằng,
                  <strong> Hệ Hầu</strong> chuyên về sức mạnh và chiến đấu, còn <strong>Hệ Sĩ</strong> nổi bật với học
                  thức và khả năng quản lý. Hãy khám phá và tìm hiểu từng nhân vật để xây dựng đội hình phù hợp!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
