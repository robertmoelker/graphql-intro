
export type User = {
  firstName: String
  middleName: String
  lastName: String
  emailAddress: String
  products?: Product[]
}

export type Product = {
  id: string
  name: string
  description: string
  price: Number
}
