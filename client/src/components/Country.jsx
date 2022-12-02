import { useNavigate, useParams } from 'react-router-dom'

const Country = ({ match }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    return (
        <div>
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                Country: {id}
            </div>
        </div>
    )
}
export default Country