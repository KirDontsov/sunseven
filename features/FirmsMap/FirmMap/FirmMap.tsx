'use client';
import { Firm } from '@/api';
import { Button } from '@/widgets';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, MouseEvent, useRef, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl';
import styles from './map.module.scss';

export interface FirmMapProps {
  firm: Firm | null;
}

export const FirmMap: FC<FirmMapProps> = ({ firm }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [showMap, setShowMap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<{ firm: Firm | null } | null>(null);
  const mapRef = useRef(null);

  const zoomToSelectedLoc = (e: MouseEvent<HTMLButtonElement>, firm: Firm | null) => {
    // stop event bubble-up which triggers unnecessary events
    e.stopPropagation();
    const coords = firm?.coords?.split(', ');

    setSelectedMarker({ firm });
    // @ts-ignore
    mapRef.current?.flyTo({ center: [coords?.[0] ?? 0, coords?.[1] ?? 0], zoom: 17 });
  };

  const coords = firm?.coords?.split(', ');

  return (
    <div className={styles.mainStyle}>
      {showMap ? (
        <Map
          ref={mapRef}
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/kirdontsov/ck6cbhtnf27vu1inwoo33gdcx"
          // @ts-ignore
          className={styles.mapStyle}
          style={{ width: '100%', height: '500px' }}
          initialViewState={{
            longitude: Number(coords?.[0] ?? 0),
            latitude: Number(coords?.[1] ?? 0),
            zoom: 16,
          }}
          maxZoom={20}
          minZoom={1}
          pitch={45}
          bearing={-17.6}
        >
          <Marker longitude={Number(coords?.[0] ?? 0)} latitude={Number(coords?.[1] ?? 0)}>
            <button type="button" className="cursor-pointer" onClick={(e) => zoomToSelectedLoc(e, firm)}>
              <div className={styles.marker} />
            </button>
          </Marker>

          {selectedMarker ? (
            <Popup
              latitude={Number(selectedMarker?.firm?.coords?.split(', ')[0] ?? 0)}
              longitude={Number(selectedMarker?.firm?.coords?.split(', ')[0] ?? 0)}
              onClose={() => {
                setSelectedMarker(null);
              }}
              closeButton={true}
              closeOnClick={true}
              // offset={-30}
              className={`${styles.popupMain} dark:text-white`}
              style={{
                top: '7%',
                left: '59%',
              }}
              anchor="bottom-left"
            >
              <h3 className={styles.popupTitle}>{selectedMarker?.firm?.name}</h3>
              <div className={`${styles.popupInfo} dark:text-white dark:bg-eboni-800`}>
                <label className={`${styles.popupLabel} text-negroni-400 dark:text-negroni-400`}>Адрес: </label>
                <p>{selectedMarker?.firm?.address}</p>
                <br />
                {selectedMarker?.firm?.default_phone && (
                  <>
                    <label className={`${styles.popupLabel} text-negroni-400 dark:text-negroni-400`}>Тел: </label>
                    <p>{selectedMarker?.firm?.default_phone}</p>
                    <br />
                  </>
                )}
              </div>
            </Popup>
          ) : null}

          <GeolocateControl position="top-left" />
          <NavigationControl position="top-left" />
          <FullscreenControl position="bottom-right" />
        </Map>
      ) : (
        <Button onClick={() => setShowMap(true)}>Показать карту</Button>
      )}
    </div>
  );
};
