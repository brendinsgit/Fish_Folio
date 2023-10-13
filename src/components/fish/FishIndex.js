import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function call from api file
import { getAllFish } from '../../api/fish'

// need messages from the autodismiss alert messaged file
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const FishIndex = (props) => {
    const [fish, setFish] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    // useEffect takes two arguments
    // first a callback function
    // second a 'dependency array'
    useEffect(() => {
        getAllFish()
            .then(res => {
        
                setFish(res.data.fish)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Fish',
                    message: messages.indexFishFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])


    if (error) {
        return <LoadingScreen />
    }

    // if the fish aren't even loaded yet
    if (!fish) {
        return <LoadingScreen />

    } else if (fish.length === 0) {
        return <p>No fish yet, go add some!</p>
    }


    const fishCards = fish.map(fish => (
        <Card key={ fish.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ fish.species }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/fish/${fish.id}`} className='btn btn-info'>
                        View { fish.location }
                    </Link>
                </Card.Text>
                { fish.owner ? 
                    <Card.Footer>owner: {fish.owner.email}</Card.Footer>
                : null }
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { fishCards }
        </div>
    )
}


export default FishIndex