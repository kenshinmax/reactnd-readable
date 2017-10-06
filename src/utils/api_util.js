const URL = `http://localhost:3001`

export function getCategories () {
   return
     fetch(`${URL}/categories`,{
        headers: { 'Authorization': '1234' }
    })
     .then((res) => res.json())
}