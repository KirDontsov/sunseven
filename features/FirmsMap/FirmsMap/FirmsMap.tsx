'use client';

import { $firmsPage, Category, City, Firm } from '@/api';
import { transliterate } from '@/shared';
import { useUnit } from 'effector-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, MouseEvent, memo, useRef, useState } from 'react';
import Map, {
  FullscreenControl,
  GeoJSONSource,
  GeolocateControl,
  Layer,
  MapLayerMouseEvent,
  MapRef,
  MapboxGeoJSONFeature,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from 'react-map-gl';
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from './Layers';
import styles from './map.module.scss';

export interface MarkersComponentProps {
  items: MapboxGeoJSONFeature[] | null;
  zoomToSelectedLoc: (e: MouseEvent<HTMLButtonElement>, item: MapboxGeoJSONFeature) => void;
}

export interface FirmsMapProps {
  firmsForMap: Firm[] | null;
  city: City | null;
  category: Category | null;
}

/** Работаем с гео-json и itemsInViewPort иначе тормозит */
const MarkersComponent: FC<MarkersComponentProps> = ({ zoomToSelectedLoc, items }) => {
  const markerRef = useRef<mapboxgl.Marker>(null);

  return (
    <>
      {!!items?.length &&
        items?.map((item, index) => {
          return (
            <Marker
              ref={markerRef}
              key={index}
              longitude={Number(item?.properties?.longitude ?? 0)}
              latitude={Number(item?.properties?.latitude ?? 0)}
              pitchAlignment="viewport"
            >
              <button type="button" className="cursor-pointer" onClick={(e) => zoomToSelectedLoc(e, item)}>
                <div className={styles.marker} />
              </button>
            </Marker>
          );
        })}
    </>
  );
};

export const Markers = memo(MarkersComponent);

export const FirmsMap: FC<FirmsMapProps> = ({ firmsForMap, city, category }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const searchParams = useSearchParams();
  const [selectedMarker, setSelectedMarker] = useState<MapboxGeoJSONFeature | null>(null);
  const [itemsInViewPort, setItemsInViewPort] = useState<MapboxGeoJSONFeature[] | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number | null>(null);
  const mapRef = useRef<MapRef>(null);

  const { page } = useUnit({
    page: $firmsPage,
  });

  const zoomToSelectedLoc = (e: MouseEvent<HTMLButtonElement>, item: MapboxGeoJSONFeature) => {
    e.stopPropagation();

    setSelectedMarker(item);
    mapRef.current?.flyTo({
      center: [item?.properties?.longitude ?? 0, item?.properties?.latitude ?? 0],
      zoom: 17,
      duration: 2000,
    });
  };

  const geojson = {
    type: 'FeatureCollection',
    features: firmsForMap
      ?.filter((x) => !!x?.coords && x?.coords !== `0`)
      ?.map((firm) => {
        const coords = firm?.coords?.split(', ');
        return {
          id: firm?.url,
          type: 'Feature',
          properties: {
            name: firm?.name,
            address: firm?.address,
            url: firm?.url,
            longitude: Number(coords[0]),
            latitude: Number(coords[1]),
          },
          geometry: { type: 'Point', coordinates: [Number(coords[0]), Number(coords[1])] },
        };
      }),
  };

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event?.features?.[0];
    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource('my-data') as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !feature) {
        return;
      }

      mapRef.current?.easeTo({
        // @ts-ignore
        center: feature?.geometry?.coordinates,
        zoom,
        duration: 500,
      });
    });
  };

  const initialCoords = city?.coords?.split(', ');

  return (
    <div className={styles.mainStyle}>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/kirdontsov/ck6cbhtnf27vu1inwoo33gdcx"
        // @ts-ignore
        className={styles.mapStyle}
        style={{ width: '100%', height: '100svh' }}
        initialViewState={{
          longitude: Number(initialCoords?.[0] ?? 0),
          latitude: Number(initialCoords?.[1] ?? 0),
          zoom: 10,
        }}
        maxZoom={20}
        minZoom={3}
        pitch={45}
        bearing={-18}
        interactiveLayerIds={[clusterLayer?.id ?? '']}
        onClick={onClick}
        onMove={() => {
          const _currentZoom = mapRef?.current?.getZoom() ?? 0;
          setCurrentZoom(_currentZoom);
          if (!!currentZoom && currentZoom >= 13) {
            const featuresInViewport: MapboxGeoJSONFeature[] | null =
              // @ts-ignore
              mapRef?.current?.getMap().queryRenderedFeatures({ layers: ['unclustered-point'] }) ?? null;
            if ((featuresInViewport?.length ?? 0) < 300) {
              setItemsInViewPort(featuresInViewport || null);
            }
          }
        }}
      >
        {!!firmsForMap?.length && (
          <>
            {!!currentZoom && currentZoom >= 13 && (
              <Markers items={itemsInViewPort} zoomToSelectedLoc={zoomToSelectedLoc} />
            )}
            <Source
              id="my-data"
              type="geojson"
              // @ts-ignore
              data={geojson}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              {/* <Layer {...layerStyle} /> */}
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          </>
        )}

        {selectedMarker ? (
          <Popup
            latitude={Number(selectedMarker?.properties?.latitude ?? 0)}
            longitude={Number(selectedMarker?.properties?.longitude ?? 0)}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeButton={true}
            closeOnClick={true}
            className={`${styles.popupMain} dark:text-white`}
            anchor="bottom-left"
          >
            <h3 className={styles.popupTitle}>{selectedMarker?.properties?.name}</h3>
            <div className={`${styles.popupInfo} dark:text-white dark:bg-eboni-800`}>
              <label className={`${styles.popupLabel} text-negroni-400 dark:text-negroni-400`}>Адрес: </label>
              <p>{selectedMarker?.properties?.address}</p>
              <br />

              <Link
                href={`/${city?.abbreviation}/${category?.abbreviation}/${selectedMarker?.properties?.url || transliterate(selectedMarker?.properties?.name ?? '')}?firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
                // target={selectedMarker?.firm?.url === '' ? null : '_blank'}
                className={styles.popupWebUrl}
              >
                Подробнее
              </Link>
            </div>
          </Popup>
        ) : null}

        <GeolocateControl position="top-left" style={{ marginTop: '154%' }} />
        <NavigationControl position="top-left" />
        <FullscreenControl position="bottom-right" />
      </Map>
    </div>
  );
};
