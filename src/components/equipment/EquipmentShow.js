import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeEquipment } from '../../api/equipment'
import { removeEquipmentSuccess, removeEquipmentFailure } from '../shared/AutoDismissAlert/messages'
import EditEquipmentModal from './EditEquipmentModal'

const EquipmentShow = (props) => {
    const { equipment, msgAlert, triggerRefresh, user, fish } = props

    // hook/piece of state that displays the editEquipmentModal
    const [editModalShow, setEditModalShow] = useState(false)



    const destroyEquipment = () => {
        // I want to remove the fish
        removeEquipment(user, fish._id, equipment._id)
            // send a success message
            .then(() =>
                msgAlert({
                    heading: `Equipment Deleted!`,
                    message: removeEquipmentSuccess,
                    variant: 'success',
                })
            )
            // triggerRefresh
            .then(() => triggerRefresh())
            // send a fail message if there is an error
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: removeEquipmentFailure,
                    variant: 'danger',
                })
            )
    }

    return (
        <>
            <Card className='m-2'>
                <Card.Header style={{ backgroundColor: '#293241', color: '#e0fbfc' }}>{equipment.rod}</Card.Header>
                <Card.Body style={{ backgroundColor: '#3d5a80', color: '#e0fbfc' }}>
                    <small>{equipment.reel}</small><br/>
                    <small>{equipment.line}</small><br/>
                    <small>{equipment.description}</small><br/>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: '#3d5a80', color: '#e0fbfc' }}>
                    {
                        user && fish.owner && user._id === fish.owner._id
                        ?
                        <>
                            <Button 
                                className="m-2" variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Equipment
                            </Button>
                            <Button 
                                className="m-2" variant="danger"
                                onClick={() => destroyEquipment()}
                            >
                                Delete Equipment
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditEquipmentModal 
                user={user}
                fish={fish}
                equipment={equipment}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default EquipmentShow