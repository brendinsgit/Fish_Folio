import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllFish = () => {
    return axios(`${apiUrl}/fish`)
}
// READ -> Show
// CREATE -> Add Pet
// UPDATE -> Change Pet
// DELETE -> Set a fish free