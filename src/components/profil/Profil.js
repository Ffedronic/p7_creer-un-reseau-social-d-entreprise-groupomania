import { useParams } from 'react-router-dom';
function Profil() {
    const params = useParams();
    return(
        <div>
            <p>profil {params.id} </p>
        </div>
    )
}

export default Profil;