import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export interface ThienCharacter {
  id?: string
  name: string
  image: string
  note1?: string
  star2: string
  star3: string
  star4: string
  construction: string
  farming: string
  production: string
  finance: string
  exploration: string
  treasureName: string
  treasureImage: string
  level50Stats: string
  note2?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface ThienCharacterDetail extends ThienCharacter {
  rarity: number
  element: string
  weapon: string
  hp: number
  attack: number
  defense: number
  description: string
  skills: string[]
}

const COLLECTION_NAME = "thien-characters"

// Thêm nhân vật mới
export const addThienCharacter = async (character: Omit<ThienCharacter, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...character,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return { id: docRef.id, ...character }
  } catch (error) {
    console.error("Error adding character:", error)
    throw new Error("Không thể thêm nhân vật")
  }
}

// Lấy tất cả nhân vật
export const getAllThienCharacters = async (): Promise<ThienCharacter[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ThienCharacter,
    )
  } catch (error) {
    console.error("Error getting characters:", error)
    throw new Error("Không thể tải danh sách nhân vật")
  }
}

// Lấy nhân vật theo ID
export const getThienCharacterById = async (id: string): Promise<ThienCharacterDetail | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data() as ThienCharacter
      // Convert to detailed character with default values for missing fields
      return {
        ...data,
        id: docSnap.id,
        rarity: 5, // Default rarity
        element: "Kim", // Default element
        weapon: "Kiếm", // Default weapon
        hp: 2500, // Default HP
        attack: 180, // Default attack
        defense: 120, // Default defense
        description: data.note2 || "Mô tả nhân vật chưa được cập nhật",
        skills: ["Kỹ năng 1", "Kỹ năng 2", "Kỹ năng 3", "Kỹ năng 4"], // Default skills
      } as ThienCharacterDetail
    }

    return null
  } catch (error) {
    console.error("Error getting character:", error)
    throw new Error("Không thể tải thông tin nhân vật")
  }
}

// Cập nhật nhân vật
export const updateThienCharacter = async (id: string, character: Partial<ThienCharacter>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...character,
      updatedAt: Timestamp.now(),
    })
    return { id, ...character }
  } catch (error) {
    console.error("Error updating character:", error)
    throw new Error("Không thể cập nhật nhân vật")
  }
}

// Xóa nhân vật
export const deleteThienCharacter = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
    return id
  } catch (error) {
    console.error("Error deleting character:", error)
    throw new Error("Không thể xóa nhân vật")
  }
}

// Import nhiều nhân vật cùng lúc
export const importThienCharacters = async (characters: Omit<ThienCharacter, "id" | "createdAt" | "updatedAt">[]) => {
  try {
    const promises = characters.map((character) =>
      addDoc(collection(db, COLLECTION_NAME), {
        ...character,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }),
    )

    const results = await Promise.all(promises)
    return results.map((docRef, index) => ({
      id: docRef.id,
      ...characters[index],
    }))
  } catch (error) {
    console.error("Error importing characters:", error)
    throw new Error("Không thể import nhân vật")
  }
}
