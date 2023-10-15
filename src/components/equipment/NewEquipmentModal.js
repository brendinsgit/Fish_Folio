// this modal is rendered by FishShow component
// the state that controls this modal, whether the modal is open or not will live in the FishShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EquipmentForm from '../shared/EquipmentForm'
import { createEquipmentSuccess, createEquipmentFailure } from '../shared/AutoDismissAlert/messages'
import { createEquipment } from '../../api/equipment'
// this modal has its own props that it needs in order to open and close
// since I will be using the EquipmentForm as well, I'll need those props

const NewEquipmentModal = (props) => {
    const { fish, show, handleClose, msgAlert, triggerRefresh } = props

    const [equipment, setEquipment] = useState({})

    // I'll use updateFish in the onSubmit
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
        createEquipment(fish._id, equipment)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: createEquipmentSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createEquipmentFailure,
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
                    heading={`Give ${fish.species} some equipment!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewEquipmentModal