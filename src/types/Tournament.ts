export interface participants {
	id: number
	name: string
	image: string
}

export interface tournaments {
  id: number
  name: string
  type: string
	participants: participants[]
}