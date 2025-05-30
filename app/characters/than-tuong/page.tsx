import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Sword, Shield, Heart, Zap } from "lucide-react"

// Sample data for Than Tuong characters
const thanTuongCharacters = [
  {
    id: 1,
    name: "Tôn Ngộ Không",
    title: "Tề Thiên Đại Thánh",
    rarity: 6,
    element: "Kim",
    weapon: "Như Ý Kim Cô Bổng",
    hp: 18500,
    attack: 4200,
    defense: 1300,
    description: "Thần tướng huyền thoại với 72 phép biến hóa, sở hữu sức mạnh có thể lay chuyển núi non.",
    skills: ["72 Biến", "Cân Đẩu Vân", "Pháp Thiên Tượng Địa", "Hỏa Nhãn Kim Tinh"],
  },
  {
    id: 2,
    name: "Nezha",
    title: "Tam Thái Tử",
    rarity: 5,
    element: "Hỏa",
    weapon: "Hỏa Tiêm Thương",
    hp: 16800,
    attack: 3800,
    defense: 1150,
    description: "Thần đồng với ba đầu sáu tay, nắm giữ sức mạnh của lửa thiêng và có thể bay lượn trên không.",
    skills: ["Tam Đầu Lục Tý", "Hỏa Liên Hoa", "Càn Khôn Quyển", "Phong Hỏa Luân"],
  },
  {
    id: 3,
    name: "Lý Tĩnh",
    title: "Thác Tháp Thiên Vương",
    rarity: 5,
    element: "Thổ",
    weapon: "Linh Long Bảo Tháp",
    hp: 17200,
    attack: 3500,
    defense: 1400,
    description: "Thiên đình tứ đại thiên vương, nắm giữ Linh Long Bảo Tháp có thể trấn áp muôn ma.",
    skills: ["Linh Long Tháp", "Thiên Vương Uy Nghiêm", "Kim Cang Bất Hoại", "Trấn Ma Thần Chú"],
  },
]

export default function ThanTuongCharactersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4 font-serif">Nhân Vật Thần Tướng</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Khám phá các thần tướng với sức mạnh siêu nhiên và phép thuật huyền bí
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {thanTuongCharacters.map((character) => (
            <Card
              key={character.id}
              className="bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Special glow effect for legendary characters */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 animate-pulse"></div>

              <CardHeader className="pb-4 relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="text-xl text-amber-800 font-serif flex items-center gap-2">
                      {character.name}
                      {character.rarity === 6 && <Zap className="w-5 h-5 text-yellow-500" />}
                    </CardTitle>
                    <p className="text-amber-600 font-medium">{character.title}</p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: character.rarity }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    {character.element}
                  </Badge>
                  <Badge variant="outline" className="border-amber-300 text-amber-700">
                    {character.weapon}
                  </Badge>
                  {character.rarity === 6 && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white">Huyền Thoại</Badge>
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
                  <h4 className="font-semibold text-amber-800 mb-2">Thần Thông:</h4>
                  <div className="space-y-1">
                    {character.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-700 bg-amber-50 rounded px-2 py-1 border border-amber-200"
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
          <Card className="bg-gradient-to-r from-yellow-100 to-amber-100 border-amber-200">
            <CardContent className="p-8">
              <Zap className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-amber-800 mb-2">Thần Tướng Huyền Thoại</h3>
              <p className="text-amber-700">
                Các thần tướng sở hữu sức mạnh vượt trội và kỹ năng đặc biệt. Hãy thu thập và nâng cấp để khám phá toàn
                bộ tiềm năng của họ!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
