import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Sword, Shield, Heart, Sparkles } from "lucide-react"

// Sample data for Tien characters
const tienCharacters = [
  {
    id: 1,
    name: "Hằng Nga",
    title: "Tiên Nữ Quảng Hàn",
    rarity: 6,
    element: "Băng",
    weapon: "Nguyệt Hoa Phiến",
    hp: 16500,
    attack: 3500,
    defense: 1200,
    description: "Tiên nữ xinh đẹp sống trên cung trăng, nắm giữ sức mạnh của ánh trăng và băng tuyết.",
    skills: ["Quảng Hàn Cung", "Nguyệt Hoa Vũ", "Băng Tinh Phong Bạo", "Tiên Nữ Giáng Thế"],
  },
  {
    id: 2,
    name: "Chức Nữ",
    title: "Tiên Nữ Dệt Vải",
    rarity: 5,
    element: "Vân",
    weapon: "Thiên Tằm Tơ",
    hp: 14800,
    attack: 3200,
    defense: 1100,
    description: "Tiên nữ khéo léo trong việc dệt vải, có thể tạo ra những tấm vải có phép thuật kỳ diệu.",
    skills: ["Thiên Tằm Biến", "Vân Cẩm Chương", "Ngân Hà Cầu"],
  },
  {
    id: 3,
    name: "Lục Đồng Tử",
    title: "Tiên Đồng Thanh Liêm",
    rarity: 4,
    element: "Mộc",
    weapon: "Trúc Tiêu",
    hp: 12200,
    attack: 2800,
    defense: 950,
    description: "Tiên đồng trong sáng với khả năng điều khiển cây cối và thiên nhiên.",
    skills: ["Trúc Lâm Phong", "Thanh Liêm Khúc", "Mộc Hệ Thần Thông"],
  },
  {
    id: 4,
    name: "Bạch Tố Trinh",
    title: "Xà Tinh",
    rarity: 5,
    element: "Thủy",
    weapon: "Bích Ngọc Tiêu",
    hp: 15500,
    attack: 3300,
    defense: 1000,
    description: "Xà tinh tu luyện thành tiên, có tình cảm sâu đậm và lòng trung thành bất diệt.",
    skills: ["Bạch Xà Truyền Thuyết", "Thủy Mãn Kim Sơn", "Tình Ái Vĩnh Cửu"],
  },
]

export default function TienCharactersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cyan-800 mb-4 font-serif">Nhân Vật Tiên</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Khám phá các tiên nhân huyền bí với sức mạnh siêu nhiên và vẻ đẹp thoát tục
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tienCharacters.map((character) => (
            <Card
              key={character.id}
              className="bg-white/80 backdrop-blur-sm border-cyan-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Special glow effect for legendary characters */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 animate-pulse"></div>

              <CardHeader className="pb-4 relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="text-xl text-cyan-800 font-serif flex items-center gap-2">
                      {character.name}
                      {character.rarity === 6 && <Sparkles className="w-5 h-5 text-cyan-500" />}
                    </CardTitle>
                    <p className="text-cyan-600 font-medium">{character.title}</p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: character.rarity }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                    {character.element}
                  </Badge>
                  <Badge variant="outline" className="border-cyan-300 text-cyan-700">
                    {character.weapon}
                  </Badge>
                  {character.rarity === 6 && (
                    <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white">Thần Tiên</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 relative z-10">
                <p className="text-gray-700 text-sm leading-relaxed">{character.description}</p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-red-50 rounded-lg p-3">
                    <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">HP</div>
                    <div className="font-semibold text-red-600">{character.hp.toLocaleString()}</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <Sword className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">ATK</div>
                    <div className="font-semibold text-orange-600">{character.attack.toLocaleString()}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <Shield className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">DEF</div>
                    <div className="font-semibold text-blue-600">{character.defense.toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-cyan-800 mb-2">Tiên Thuật:</h4>
                  <div className="space-y-1">
                    {character.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-700 bg-cyan-50 rounded px-2 py-1 border border-cyan-200"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-cyan-100 to-blue-100 border-cyan-200">
            <CardContent className="p-8">
              <Sparkles className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-cyan-800 mb-2">Tiên Giới Huyền Bí</h3>
              <p className="text-cyan-700">
                Các nhân vật tiên sở hữu sức mạnh siêu nhiên và vẻ đẹp thoát tục. Họ đến từ những cõi tiên khác nhau và
                mang theo những câu chuyện tình yêu, hy sinh đầy cảm động.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
