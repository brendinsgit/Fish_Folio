import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import EditFishModal from './EditFishModal'
import NewEquipmentModal from '../equipment/NewEquipmentModal'
import EquipmentShow from '../equipment/EquipmentShow'
import { useNavigate } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

//need to import an api function to grab an individual fish
import { getOneFish, updateFish, removeFish } from '../../api/fish'

import { showFishFailure, showFishSuccess, removeFishSuccess, removeFishFailure } from '../shared/AutoDismissAlert/messages'

// use route parameters to get the id of the fish I'm trying to retrieve from the server.
// then I use that id with our api call function
// when I finally retrieve the fish, render the details on the screen

const equipmentCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const FishShow = (props) => {
    const [fish, setFish] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [equipmentModalShow, setEquipmentModalShow] = useState(false)
    // this is a boolean that I can alter to trigger a page re-render
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    // need to pull the id from the url
    // localhost:3000/fish/<fish_id>
 
    const { id } = useParams()
    const { user, msgAlert } = props

  
    useEffect(() => {
        getOneFish(id)
            .then(res => setFish(res.data.fish))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting fish',
                    message: showFishFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    const setFishFree = () => {
        // remove the fish
        removeFish(user, fish._id)
            // send a success message
            .then(() =>
                msgAlert({
                    heading: `${fish.name} has been set free!`,
                    message: removeFishSuccess,
                    variant: 'success',
                })
            )
            // navigate the user to the home page(index)
            .then(() => navigate('/'))
            // send a fail message if there is an error
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: removeFishFailure,
                    variant: 'danger',
                })
            )
    }

    let equipmentCards
    if (fish) {
        if (fish.equipment.length > 0) {
            equipmentCards = fish.equipment.map(equipment => (
                <EquipmentShow 
                    key={equipment.id}
                    equipment={equipment}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    user={user}
                    fish={fish}
                />
            ))
        } else {
            equipmentCards = <p>Fish has no equipment, ain't that sad?</p>
        }
    }

    if(!fish) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
                <Card>
                    <Card.Header>{ fish.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Species: {fish.species}</small><br/>
                            <small>Size: {fish.size}</small><br/>
                            <small>Location: {fish.location}</small><br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button className="m-2" variant="info"
                            onClick={() => setEquipmentModalShow(true)}
                        >
                            Add some equipment details!
                        </Button>
                        {
                            fish.owner && user && fish.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setFishFree()}
                                >
                                    Delete
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className='m-2' style={equipmentCardContainerLayout}>
                {equipmentCards}
            </Container>
            <EditFishModal 
                user={user}
                show={editModalShow}
                updateFish={updateFish}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
                fish={fish}
            />
            <NewEquipmentModal 
                fish={fish}
                show={equipmentModalShow}
                msgAlert={msgAlert}
                handleClose={() => setEquipmentModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default FishShow