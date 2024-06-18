
export interface IAuthLoader {
  buttonList: string[]
}

export default async function AuthLoader() {
  return {
    id: 'AuthLoader'
  }
}
