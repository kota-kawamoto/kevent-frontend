interface Group {
  id: string
  group_name: string
}

export async function getGroups(): Promise<Group[]> {
  const response = await fetch(`${process.env.API_URL}/api/groups`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  return response.json()
}
