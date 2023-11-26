import React from 'react';

const GMap = ({longitude, latitude}) => {
    const [map, setMap] = React.useState(null);
    const googleMapRef = React.useRef(null);

    const initGoogleMap = () => {
        return new window.google.maps.Map(googleMapRef.current, { 
            // center: { lat: 6.6342, lng: 5.9304 },
            center: { lat: latitude, lng: longitude },
            zoom: 8
        });
    }

    React.useEffect(() => {
        const googleMap = initGoogleMap();
        setMap(googleMap);

        // eslint-disable-next-line 
    }, [latitude, longitude]);

    React.useEffect(() => {
        if (!map) {
            return;
        }

        new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map
        });

        // eslint-disable-next-line
    }, [map]);

    // const initGoogleMap = () => {
    //     return new window.google.maps.Map(googleMapRef.current, { 
    //         // center: { lat: 6.6342, lng: 5.9304 },
    //         center: { lat: latitude, lng: longitude },
    //         zoom: 8
    //     });
    // }

    return (
        <div className="prop-map" ref={googleMapRef} 
            style={{height: '100%', width: '100%'}}
        />
    );
}

export default GMap;