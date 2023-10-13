import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllFish = () => {
    return axios(`${apiUrl}/fish`)
}

// READ -> Show
export const getOneFish = (id) => {
    return axios(`${apiUrl}/fish/${id}`)
}

// CREATE -> Add Fish
export const createFish = (user, newFish) => {
    return axios({
        url: `${apiUrl}/fish`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { fish: newFish }
    })
}
// UPDATE -> Change Fish
export const updateFish = (user, updatedFish) => {
    return axios({
        url: `${apiUrl}/fish/${updatedFish._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { fish: updatedFish }
    })
}

// DELETE -> Set a fish free
export const removeFish = (user, fishId) => {
    return axios({
        url: `${apiUrl}/fish/${fishId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}