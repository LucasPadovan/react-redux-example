/*
* Action which enacts the browser get current location api and once that promise is resolved,
* gets a place object from the browser, then runs a search against that data.
*/
export const getUserCurrentLocation = () => (
    async(dispatch) => {
        const locationPermission = await getBrowserLocationPermission()
            .catch(() => 'permissionsNotSupported');

        if (locationPermission === 'denied') {
            dispatch(trackUserCurrentLocation({
                label: GA_USER_CURRENT_LOCATION_DENIED_LABEL,
            }));

            return dispatch(showLocationDeniedNotification());
        }

        dispatch(setWaitingForLocation(true));

        const browserLocation = await getBrowserLocation()
            .catch(({code}) => {
                if (code === LOCATION_DENIED_CODE && locationPermission === 'permissionsNotSupported') {
                    dispatch(showLocationDeniedNotification());
                }

                /* prompt is status returned from browser location permissions object
                when no permission is set for accessing user location
                https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions */
                if (code === LOCATION_DENIED_CODE && locationPermission === 'prompt') {
                    dispatch(setWaitingForLocation(false));
                }

                /* tracking the type of error that occurred for GA */
                let label = GA_USER_CURRENT_LOCATION_ERROR_LABEL;

                if (code === LOCATION_DENIED_CODE) {
                    label = GA_USER_CURRENT_LOCATION_DENIED_LABEL;
                }

                dispatch(trackUserCurrentLocation({
                    label,
                }));
            });

        if (!browserLocation) {
            return undefined;
        }

        const {latitude, longitude} = browserLocation.coords;

        const {place} = await getPlaceFromCoordinatesApi({latitude, longitude})
            .catch(() => getPlaceFromCoordinatesApi({latitude, longitude, placeType: 'region'}));

        const transformedPlaceObject = transformGeoPlaceObject(place);

        dispatch(trackUserCurrentLocation({
            label: transformedPlaceObject.currentPlace,
        }));

        return dispatch(locationChange({
            ...transformedPlaceObject,
            isUsingCurrentLocation: true,
        }));
    }
);
