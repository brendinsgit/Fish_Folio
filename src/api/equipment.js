import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE -> Add Equipment
// '/equipment/:fishId'
export const createEquipment = (fishId, newEquipment) => {
    return axios({
        url: `${apiUrl}/equipment/${fishId}`,
        method: 'POST',
        data: { equipment: newEquipment }
    })
}

// UPDATE -> Change Fish
// '/equipment/:fishId/:equipmentId'
export const updateEquipment = (user, fishId, updatedEquipment) => {
    return axios({
        url: `${apiUrl}/equipment/${fishId}/${updatedEquipment._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { equipment: updatedEquipment }
    })
}

// DELETE -> Set a fish free
// '/equipment/:fishId/:equipmentId'
export const removeEquipment = (user, fishId, equipmentId) => {
    return axios({
        url: `${apiUrl}/equipment/${fishId}/${equipmentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}