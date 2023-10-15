// this modal is rendered by EquipmentShow component
// the state that controls this modal, whether the modal is open or not will live in the EquipmentShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EquipmentForm from '../shared/EquipmentForm'
import { updateEquipmentSuccess, updateEquipmentFailure } from '../shared/AutoDismissAlert/messages'
import { updateEquipment } from '../../api/equipment'
// this modal has its own props that it needs in order to open and close
// since I will be using the EquipmentForm as well, I'll need those props

const EditEquipmentModal = (props) => {
    const { user, fish, show, handleClose, msgAlert, triggerRefresh } = props

    const [equipment, setEquipment] = useState(props.equipment)

    // I'll use updateFish in our onSubmit
    const onChange = (e) => {
        e.persist()

        setEquipment(prevEquipment => {
            const updatedName = e.target.name
            let updatedValue = e.target.value


            const updatedEquipment = { [updatedName] : updatedValue }

            return {
                ...prevEquipment, ...updatedEquipment
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // make the api call -> createEquipment
        updateEquipment(user, fish._id, equipment)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: updateEquipmentSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: updateEquipmentFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <EquipmentForm 
                    equipment={equipment}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update the Equipment"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditEquipmentModal