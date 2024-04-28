"use client";
import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Data, Marker, useJsApiLoader } from '@react-google-maps/api';
import {setKey ,setLanguage, fromLatLng} from "react-geocode";

setKey("AIzaSyDEUn0SkXdf3WDGmSEjfICnURdXO22I9j0");
setLanguage("en");

const containerStyle = {
    width: '600px',
    height: '400px'
};

const arrayToObj = arr => {
    const mapView = []
    for (let i = 0; i < arr?.length; i++) {
        mapView.push({ lat: arr[i][1], lng: arr[i][0] })
    }
    return mapView
}


function ServiceLocationMap({ setLocation, editLocation, form }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDEUn0SkXdf3WDGmSEjfICnURdXO22I9j0",
    })
    
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        if (!!editLocation?.lat) {
            setCurrentLocation(editLocation)
        }
    }, [editLocation?.lat])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    setLocation({ lat: latitude, lng: longitude })
                },
                error => {
                    console.error('Error getting the current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const handleMapClick = event => {
        const latLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setLocation(latLng)
        setCurrentLocation(latLng)
        handleAddress({ lat: event.latLng.lat(), lng: event.latLng.lng() })
    };

    const onLoad = marker => { }

    const handleAddress = ({ lat, lng }) => {
        if (lat > 0) {
            fromLatLng(lat, lng).then(
                (response) => {
                    const addr = response.results[0].formatted_address;
                    form.setFieldsValue({ address: addr })
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }

    return (
        <LoadScript
            googleMapsApiKey={"AIzaSyDEUn0SkXdf3WDGmSEjfICnURdXO22I9j0"}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation}
                zoom={12}
                onClick={handleMapClick}
            >
                <Marker
                    onLoad={onLoad}
                    position={currentLocation}
                    clickable={true}
                />
            </GoogleMap>
        </LoadScript>
    )
}

export default ServiceLocationMap
