import FishIndex from "./fish/FishIndex"
import { Container } from 'react-bootstrap'

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container style={{ textAlign: 'center'}}>
			<h2>See All The Fish</h2>
			<FishIndex msgAlert={msgAlert}/>
		</Container>
	)
}

export default Home
