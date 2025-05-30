"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Upload,
  FileSpreadsheet,
  Download,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import {
  type ThienCharacter,
  getAllThienCharacters,
  addThienCharacter,
  updateThienCharacter,
  deleteThienCharacter,
  importThienCharacters,
} from "@/lib/firebase-service"

interface ImportPreviewData {
  [key: string]: string
}

export default function ThienCharactersPage() {
  const [characters, setCharacters] = useState<ThienCharacter[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState<ThienCharacter | null>(null)
  const [formData, setFormData] = useState<Partial<ThienCharacter>>({})
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  // Import states
  const [importFile, setImportFile] = useState<File | null>(null)
  const [importData, setImportData] = useState<ImportPreviewData[]>([])
  const [columnMapping, setColumnMapping] = useState<{ [key: string]: string }>({})
  const [importStep, setImportStep] = useState<"upload" | "mapping" | "preview" | "importing" | "complete">("upload")
  const [importProgress, setImportProgress] = useState(0)
  const [importErrors, setImportErrors] = useState<string[]>([])

  const characterFields = [
    { key: "name", label: "Tên nhân vật", required: true },
    { key: "image", label: "URL ảnh nhân vật", required: false },
    { key: "note1", label: "Chú thích 1", required: false },
    { key: "star2", label: "2*", required: true },
    { key: "star3", label: "3*", required: true },
    { key: "star4", label: "4*", required: true },
    { key: "construction", label: "Xây dựng", required: true },
    { key: "farming", label: "Trồng trọt", required: true },
    { key: "production", label: "Sản xuất", required: true },
    { key: "finance", label: "Tài chính", required: true },
    { key: "exploration", label: "Thám hiểm", required: true },
    { key: "treasureName", label: "Tên pháp bảo", required: true },
    { key: "treasureImage", label: "URL ảnh pháp bảo", required: false },
    { key: "level50Stats", label: "Thuộc tính level 50", required: true },
    { key: "note2", label: "Chú thích 2", required: false },
  ]

  // Load characters from Firebase on component mount
  useEffect(() => {
    loadCharacters()
  }, [])

  const loadCharacters = async () => {
    try {
      setLoading(true)
      const data = await getAllThienCharacters()
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
        await updateThienCharacter(editingCharacter.id, formData)
        setCharacters(characters.map((char) => (char.id === editingCharacter.id ? { ...char, ...formData } : char)))
        toast({
          title: "Thành công",
          description: "Đã cập nhật nhân vật",
        })
      } else {
        // Add new character
        const newCharacterData = {
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
        }

        const newCharacter = await addThienCharacter(newCharacterData)
        setCharacters([newCharacter, ...characters])
        toast({
          title: "Thành công",
          description: "Đã thêm nhân vật mới",
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

  const handleEdit = (character: ThienCharacter) => {
    setEditingCharacter(character)
    setFormData(character)
    setIsAddDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa nhân vật này?")) return

    try {
      await deleteThienCharacter(id)
      setCharacters(characters.filter((char) => char.id !== id))
      toast({
        title: "Thành công",
        description: "Đã xóa nhân vật",
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

  // Import functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImportFile(file)
      parseFile(file)
    }
  }

  const parseFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length < 2) {
        setImportErrors(["File phải có ít nhất 2 dòng (header và data)"])
        return
      }

      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
      const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
        const row: ImportPreviewData = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ""
        })
        return row
      })

      setImportData(data)

      // Auto-map columns if possible
      const autoMapping: { [key: string]: string } = {}
      characterFields.forEach((field) => {
        const matchingHeader = headers.find(
          (header) =>
            header.toLowerCase().includes(field.label.toLowerCase()) ||
            header.toLowerCase().includes(field.key.toLowerCase()),
        )
        if (matchingHeader) {
          autoMapping[field.key] = matchingHeader
        }
      })
      setColumnMapping(autoMapping)
      setImportStep("mapping")
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    setImportStep("importing")
    setImportProgress(0)
    const errors: string[] = []
    const validCharacters: Omit<ThienCharacter, "id" | "createdAt" | "updatedAt">[] = []

    // Validate data first
    for (let i = 0; i < importData.length; i++) {
      const row = importData[i]
      try {
        const character = {
          name: row[columnMapping.name] || "",
          image: row[columnMapping.image] || "/placeholder.svg?height=100&width=100",
          note1: row[columnMapping.note1],
          star2: row[columnMapping.star2] || "",
          star3: row[columnMapping.star3] || "",
          star4: row[columnMapping.star4] || "",
          construction: row[columnMapping.construction] || "",
          farming: row[columnMapping.farming] || "",
          production: row[columnMapping.production] || "",
          finance: row[columnMapping.finance] || "",
          exploration: row[columnMapping.exploration] || "",
          treasureName: row[columnMapping.treasureName] || "",
          treasureImage: row[columnMapping.treasureImage] || "/placeholder.svg?height=60&width=60",
          level50Stats: row[columnMapping.level50Stats] || "",
          note2: row[columnMapping.note2],
        }

        // Validate required fields
        const missingFields = characterFields
          .filter((field) => field.required && !character[field.key as keyof typeof character])
          .map((field) => field.label)

        if (missingFields.length > 0) {
          errors.push(`Dòng ${i + 2}: Thiếu ${missingFields.join(", ")}`)
        } else {
          validCharacters.push(character)
        }
      } catch (error) {
        errors.push(`Dòng ${i + 2}: Lỗi xử lý dữ liệu`)
      }

      setImportProgress(((i + 1) / importData.length) * 50) // 50% for validation
    }

    setImportErrors(errors)

    // Import valid characters to Firebase
    if (validCharacters.length > 0) {
      try {
        const importedCharacters = await importThienCharacters(validCharacters)
        setCharacters((prev) => [...importedCharacters, ...prev])

        toast({
          title: "Thành công",
          description: `Đã import ${importedCharacters.length} nhân vật`,
        })
      } catch (error) {
        errors.push("Lỗi khi lưu dữ liệu lên Firebase")
        setImportErrors(errors)
      }
    }

    setImportProgress(100)
    setImportStep("complete")
  }

  const resetImport = () => {
    setImportFile(null)
    setImportData([])
    setColumnMapping({})
    setImportStep("upload")
    setImportProgress(0)
    setImportErrors([])
    setIsImportDialogOpen(false)
  }

  const downloadTemplate = () => {
    const headers = characterFields.map((field) => field.label).join(",")
    const sampleRow = [
      "Lý Bạch",
      "/placeholder.svg?height=100&width=100",
      "Thi tiên",
      "Tăng 10% hiệu quả xây dựng",
      "Tăng 15% hiệu quả tài chính",
      "Tăng 20% hiệu quả thám hiểm",
      "85",
      "70",
      "75",
      "90",
      "95",
      "Kiếm Thanh Liên",
      "/placeholder.svg?height=60&width=60",
      "HP: 2500, ATK: 180, DEF: 120",
      "Chuyên gia thám hiểm và tài chính",
    ].join(",")

    const csvContent = `${headers}\n${sampleRow}`
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "nhan-vat-thien-template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4 calligraphy">Nhân Vật Hệ Thiên</h1>
              <p className="text-lg text-gray-700">Quản lý thông tin chi tiết các nhân vật hệ Thiên với Firebase</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Refresh Button */}
              <Button
                variant="outline"
                onClick={loadCharacters}
                disabled={loading}
                className="whitespace-nowrap brush-cursor"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Làm mới
              </Button>

              {/* Import Button */}
              <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="whitespace-nowrap brush-cursor"
                    onClick={() => setImportStep("upload")}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Import File
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5" />
                      Import Nhân Vật từ File
                    </DialogTitle>
                  </DialogHeader>

                  {/* Step 1: Upload */}
                  {importStep === "upload" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                          <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Chọn file CSV hoặc Excel</h3>
                          <p className="text-gray-600 mb-4">Hỗ trợ file .csv, .xlsx, .xls</p>
                          <input
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label htmlFor="file-upload">
                            <Button asChild className="brush-cursor">
                              <span>Chọn File</span>
                            </Button>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={downloadTemplate} className="brush-cursor">
                          <Download className="w-4 h-4 mr-2" />
                          Tải Template Mẫu
                        </Button>
                        <Button variant="outline" onClick={resetImport} className="brush-cursor">
                          Hủy
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Column Mapping */}
                  {importStep === "mapping" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ánh xạ cột dữ liệu</h3>
                        <p className="text-gray-600 mb-4">
                          Chọn cột tương ứng trong file của bạn cho mỗi trường dữ liệu
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {characterFields.map((field) => (
                          <div key={field.key} className="space-y-2">
                            <Label className="flex items-center gap-2">
                              {field.label}
                              {field.required && <span className="text-red-500">*</span>}
                            </Label>
                            <select
                              value={columnMapping[field.key] || ""}
                              onChange={(e) =>
                                setColumnMapping((prev) => ({
                                  ...prev,
                                  [field.key]: e.target.value,
                                }))
                              }
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="">-- Chọn cột --</option>
                              {importData.length > 0 &&
                                Object.keys(importData[0]).map((header) => (
                                  <option key={header} value={header}>
                                    {header}
                                  </option>
                                ))}
                            </select>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setImportStep("upload")} className="brush-cursor">
                          Quay lại
                        </Button>
                        <Button
                          onClick={() => setImportStep("preview")}
                          className="bg-gray-800 hover:bg-gray-900 brush-cursor"
                          disabled={!columnMapping.name}
                        >
                          Xem trước
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Preview */}
                  {importStep === "preview" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Xem trước dữ liệu</h3>
                        <p className="text-gray-600">
                          Kiểm tra dữ liệu trước khi import ({importData.length} nhân vật)
                        </p>
                      </div>

                      <div className="max-h-96 overflow-auto border rounded-lg">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-2 text-left">Tên</th>
                              <th className="p-2 text-left">2*</th>
                              <th className="p-2 text-left">3*</th>
                              <th className="p-2 text-left">4*</th>
                              <th className="p-2 text-left">Xây dựng</th>
                              <th className="p-2 text-left">Pháp bảo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {importData.slice(0, 5).map((row, index) => (
                              <tr key={index} className="border-t">
                                <td className="p-2">{row[columnMapping.name] || "-"}</td>
                                <td className="p-2">{row[columnMapping.star2] || "-"}</td>
                                <td className="p-2">{row[columnMapping.star3] || "-"}</td>
                                <td className="p-2">{row[columnMapping.star4] || "-"}</td>
                                <td className="p-2">{row[columnMapping.construction] || "-"}</td>
                                <td className="p-2">{row[columnMapping.treasureName] || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {importData.length > 5 && (
                          <div className="p-2 text-center text-gray-500 bg-gray-50">
                            ... và {importData.length - 5} nhân vật khác
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setImportStep("mapping")} className="brush-cursor">
                          Quay lại
                        </Button>
                        <Button onClick={handleImport} className="bg-green-600 hover:bg-green-700 brush-cursor">
                          Import {importData.length} nhân vật
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Importing */}
                  {importStep === "importing" && (
                    <div className="space-y-6 text-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Đang import dữ liệu lên Firebase...
                        </h3>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${importProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-gray-600 mt-2">{Math.round(importProgress)}% hoàn thành</p>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Complete */}
                  {importStep === "complete" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Import hoàn thành!</h3>
                        <p className="text-gray-600">
                          Đã import thành công {importData.length - importErrors.length} nhân vật lên Firebase
                        </p>
                      </div>

                      {importErrors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <h4 className="font-semibold text-red-800">Có {importErrors.length} lỗi:</h4>
                          </div>
                          <ul className="text-sm text-red-700 space-y-1 max-h-32 overflow-y-auto">
                            {importErrors.map((error, index) => (
                              <li key={index}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex justify-center">
                        <Button onClick={resetImport} className="bg-gray-800 hover:bg-gray-900 brush-cursor">
                          Đóng
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Add Character Button */}
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
                        {submitting ? "Đang lưu..." : editingCharacter ? "Cập Nhật" : "Thêm Mới"}
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
                        onClick={() => toggleRowExpansion(character.id!)}
                        className="text-gray-600 hover:text-gray-800 p-1 brush-cursor"
                      >
                        {expandedRows.has(character.id!) ? (
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
                        onClick={() => handleDelete(character.id!)}
                        className="text-red-600 hover:text-red-800 p-1 brush-cursor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {expandedRows.has(character.id!) && (
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
                      <div className="bg-blue-50 rounded p-3 text-center">
                        <div className="text-xs text-gray-600">Xây dựng</div>
                        <div className="font-semibold text-blue-600">{character.construction}</div>
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
                    <div className="flex gap-2 mt-4">
                      <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white brush-cursor">
                        <Link href={`/characters/thien/${character.id}`}>Xem Chi Tiết</Link>
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {characters.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Chưa có nhân vật nào được thêm vào Firebase</p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gray-800 hover:bg-gray-900 brush-cursor">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm Nhân Vật Đầu Tiên
                </Button>
                <Button onClick={() => setIsImportDialogOpen(true)} variant="outline" className="brush-cursor">
                  <Upload className="w-4 h-4 mr-2" />
                  Import từ File
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
