// this modal is rendered by FishShow component
// the state that controls this modal, whether the modal is open or not will live in the FishShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FishForm from '../shared/FishForm'
import { updateFishSuccess, updateFishFailure} from '../shared/AutoDismissAlert/messages'
import { updateFish } from '../../api/fish'

// this modal has its own props that it needs in order to open and close
// since I will be using the FishForm as well, I'll need those props

const EditFishModal = (props) => {
    const { user, show, handleClose, updateFish, msgAlert, triggerRefresh } = props

    const [fish, setFish] = useState(props.fish)

    // I'll use updateFish in onSubmit
    const onChange = (e) => {
        e.persist()

        setFish(prevFish => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedFish = { [updatedName] : updatedValue }

            return {
                ...prevFish, ...updatedFish
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // make an api call -> updateFish
        updateFish(user, fish)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: updateFishSuccess,
                    variant: 'success'
                })
            })
            // trigger a refresh of the FishShow component
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: updateFishFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <FishForm 
                    fish={fish}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Fish"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditFishModal