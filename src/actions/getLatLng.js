import { statesCoordsData } from '../utils/data';

const getLatLng = (setLatitude, setLongitude, prop) => {
    const coordinates = statesCoordsData;
    switch (prop) {
        case 'Lagos State': 
            setLatitude(coordinates.lagos.latitude);
            setLongitude(coordinates.lagos.longitude);
            break;
        case 'Cross River State':
            setLatitude(coordinates.crossRiver.latitude);
            setLongitude(coordinates.crossRiver.longitude);
            break;
        case 'Delta State':
            setLatitude(coordinates.delta.latitude);
            setLongitude(coordinates.delta.longitude);
            break;
        case 'Akwa Ibom State':
            setLatitude(coordinates.akwaIbom.latitude);
            setLongitude(coordinates.akwaIbom.longitude);
            break;
        case 'Abuja, FCT':
            setLatitude(coordinates.abuja.latitude);
            setLongitude(coordinates.abuja.longitude);
            break;
        case 'Plateau State':
            setLatitude(coordinates.plateau.latitude);
            setLongitude(coordinates.plateau.longitude);
            break;
        case 'Rivers State':
            setLatitude(coordinates.rivers.latitude);
            setLongitude(coordinates.rivers.longitude);
            break;
        case 'Ogun State':
            setLatitude(coordinates.ogun.latitude);
            setLongitude(coordinates.ogun.longitude);
            break;
        case 'Osun State':
            setLatitude(coordinates.osun.latitude);
            setLongitude(coordinates.osun.longitude);
            break;
        case 'Oyo State':
            setLatitude(coordinates.oyo.latitude);
            setLongitude(coordinates.oyo.longitude);
            break;
        default:
            setLatitude(coordinates.edo.latitude);
            setLongitude(coordinates.edo.longitude);
    }
}

export default getLatLng;