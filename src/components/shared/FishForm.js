// this form will take several props, and be used by both Create and Update
// the action will be dependent upon the parent component(create or update)
// however, the form will look the same on both pages.
import { Form, Button, Container } from 'react-bootstrap'

const FishForm = (props) => {

    const { fish, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Species:</Form.Label>
                    <Form.Control 
                        placeholder="What is your fish's species?"
                        id="species"
                        name="species"
                        value={ fish.species }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control 
                        placeholder="Where was this fish caught?"
                        id="location"
                        name="location"
                        value={ fish.location }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Size:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How big is your fish?"
                        id="size"
                        name="size"
                        value={ fish.size }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Weight:</Form.Label>
                    <Form.Control 
                        placeholder="How much does your fish weigh?"
                        id="weight"
                        name="weight"
                        value={ fish.weight }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )

}

export default FishForm