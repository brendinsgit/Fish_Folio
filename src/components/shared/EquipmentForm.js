// this form will take several props, and be used by both Create and Update
// the action will be dependent upon the parent component(create or update)
// however, the form will look the same on both pages.
import { Form, Button, Container } from 'react-bootstrap'

const EquipmentForm = (props) => {
    // we need several props for a working, reusable form
    // we need the object itself(fish), a handleChange, a handleSubmit
    // sometimes it's nice to have a custom heading (to diff b/w our components)
    const { equipment, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Rod:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of rod did you use?"
                        id="rod"
                        name="rod"
                        value={ equipment.rod }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Reel:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of reel did you use?"
                        id="reel"
                        name="reel"
                        value={ equipment.reel }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Line:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of line did you use?"
                        id="line"
                        name="line"
                        value={ equipment.line }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        placeholder="Share any details about your setup"
                        id="description"
                        name="description"
                        value={ equipment.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )

}

export default EquipmentForm