import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// api function call from our api file
import { getAllFish } from '../../api/fish'

// need messages from autodismiss alert messages file
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
        return <p>Error!</p>
    }

    if (!fish) {
        return <p>Loading...</p>
    } else if (fish.length === 0) {
        return <p>No fish yet, go add some!</p>
    }

    const fishCards = fish.map(fish => (
        <Card key={ fish.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ fish.species }</Card.Header>
            <Card.Body>
                <Card.Text>{ fish.location }</Card.Text>
                <Card.Text>{ fish.date }</Card.Text>
            </Card.Body>
        </Card>
    ))

    return(
        <div className='container-md' style = { cardContainerLayout }>
            { fishCards }
        </div>
    )
}

export default FishIndex