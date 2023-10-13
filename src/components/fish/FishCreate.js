// FishCreate is going to render a form
// this form will build a fish object in state
// the form will submit an axios POST request when submitted
// I should send a success or failure message
// on success, redirect to the new fish show page
// on failure, component should send the message and remain visible
import { useState } from 'react'
import { createFish } from '../../api/fish'
import { createFishSuccess, createFishFailure } from '../shared/AutoDismissAlert/messages'
import FishForm from '../shared/FishForm'

// to redirect to a different component(page) I can use a hook from react-router
import { useNavigate } from 'react-router-dom'

const FishCreate = (props) => {
    // pull out props for easy reference
    const { user, msgAlert } = props

    // to utilize the navigate hook from react-router-dom
    const navigate = useNavigate()

    const [fish, setFish] = useState({
        species: '',
        size: '',
        location: ''
    })

    const onChange = (e) => {
        // e is the placeholder for event
        e.persist()

        setFish(prevFish => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // the above is enough for string inputs
            // but I have a number and a boolean to handle
            if (e.target.type === 'number') {
                // if the target type is a number - updateValue must be a number
                updatedValue = parseInt(e.target.value)
            }

            // to handle the checkbox, I need to tell it when to send a true, and when to send a false. I can target it by the unique name(adoptable) and handle it the way checkboxes are meant to be handled.
            // a checkbox only sends the value 'checked' not the boolean I need
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }
            
            // build the fish object, grab the attribute name from the field and assign it the respective value.
            const updatedFish = { [updatedName] : updatedValue }

            // keep all the old fish stuff and add the new fish stuff(each keypress)
            return {
                ...prevFish, ...updatedFish
            }
        })
    }

    const onSubmit = (e) => {
        // I'm still using a form - the default behavior of a form is to refresh the page
        e.preventDefault()

        // I'm making an api call here
        // so I want to handle the promise with then and catch
        // first I want to send the create request
        createFish(user, fish)
            // then navigate the user to the show page if successful
            .then(res => { navigate(`/fish/${res.data.fish.id}`)})
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createFishSuccess,
                    variant: 'success'
                })
            })
            // if it fails, keep the user on the create page and send a message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createFishFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <FishForm 
            fish={fish} 
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new fish!"
        />
    )
}

export default FishCreate