import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Form, Input } from "antd";

export const LatLngInput = ({ value, onChange, country, height = 300, disabled = false }) => {
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    });

    useEffect(() => {
        if (country) {
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: country }).then(({ results }) => {
                if (results?.length > 0) {
                    const lat = results[0]?.geometry?.location?.lat();
                    const lng = results[0]?.geometry?.location?.lng();
                    setCenter({ lat, lng });
                    setZoom(13);
                }
            });
        }
    }, [country]);

    useEffect(() => {
        if (value?.lat && value?.lng) {
            setCenter({
                lat: value.lat,
                lng: value.lng
            });
            setZoom(13);
        }
    }, [value]);

    const handleMarkerDragEnd = (e) => {
        const geocoder = new google.maps.Geocoder();
        const location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        geocoder.geocode({ location }).then((response) => {
            if (response.results[0]) {
                const result = response.results[0];
                const country = result.address_components.find((c) => c.types.includes('country'))?.short_name;
                const country_long = result.address_components.find((c) => c.types.includes('country'))?.long_name;
                const city = result.address_components.find((c) => c.types.includes('locality'))?.long_name;
                const formatted_address = result.formatted_address;
    
                onChange({
                    name: formatted_address,
                    lat: location.lat,
                    lng: location.lng,
                    country: country,
                    country_long: country_long,
                    city: city,
                });
            }
        });
    };

    const handleLatLngChange = (field, e) => {
        const newValue = { ...value, [field]: e.target.value };
        onChange(newValue);
    };

    return (
        <>
            <Form.Item label="Latitude">
                <Input
                    disabled={disabled}
                    value={value?.lat}
                    onChange={(e) => handleLatLngChange('lat', e)}
                />
            </Form.Item>
            <Form.Item label="Longitude">
                <Input
                    disabled={disabled}
                    value={value?.lng}
                    onChange={(e) => handleLatLngChange('lng', e)}
                />
            </Form.Item>
            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: height,
                    borderRadius: 5,
                    marginBottom: 8
                }}
                className="rounded"
                center={center}
                zoom={zoom}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoomControlOptions: {
                        position: 9
                    }
                }}
            >
                {value?.lat && value?.lng && <Marker position={{
                    lat: value.lat,
                    lng: value.lng
                }} draggable={true} onDragEnd={handleMarkerDragEnd} />}
            </GoogleMap>
        </>
    );
};
