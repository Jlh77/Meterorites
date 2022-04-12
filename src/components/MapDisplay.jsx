import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { easeOut } from 'ol/easing';
import { getVectorContext } from 'ol/render';
import { unByKey } from 'ol/Observable';
import { useState, useRef, useEffect } from 'react';

import './MapDisplay.css';

const MapDisplay = ({ meteoriteData }) => {
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [tileLayer, setTileLayer] = useState();
  const [source, setSource] = useState();
  const mapElement = useRef();

  // Page loads, makes map
  useEffect(() => {
    const tileLayer = new TileLayer({
      source: new OSM({
        wrapX: false,
      }),
    });

    const source = new VectorSource({
      wrapX: false,
    });
    const vector = new VectorLayer({
      source: source,
    });
    const initialMap = new Map({
      target: mapElement.current,
      layers: [tileLayer, vector],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 1,
      }),
    });
    setMap(initialMap);
    setFeaturesLayer(vector);
    setTileLayer(tileLayer);
    setSource(source);
    console.log(initialMap);
  }, []);

  useEffect(() => {
    const delayLoop = (func, delay) => {
      return (name, i) => {
        setTimeout(() => {
          func();
        }, i * 1000);
      };
    };

    const addPlace = () => {
      meteoriteData.forEach((meteorite) => {
        console.log('adding place', '>>>>>>>', meteorite);
        console.log(meteoriteData.length);
        if (!meteorite.geolocation) return;
        //console.log("Here");
        const geom = new Point(
          fromLonLat([
            meteorite.geolocation.longitude,
            meteorite.geolocation.latitude,
          ])
        );
        const feature = new Feature(geom);
        setSource((currentSource) => {
          const newSource = { ...currentSource };
          newSource.addFeature(feature);
          return newSource;
        });
      }, 1000);
    };
    const duration = 3000;
    const flash = (feature) => {
      const animate = (event) => {
        const frameState = event.frameState;
        const elapsed = frameState.time - start;
        if (elapsed >= duration) {
          unByKey(listenerKey);
          return;
        }
        const vectorContext = getVectorContext(event);
        const elapsedRatio = elapsed / duration;
        // radius will be 5 at start and 30 at end.
        const radius = easeOut(elapsedRatio) * 25 + 5;
        const opacity = easeOut(1 - elapsedRatio);

        const style = new Style({
          image: new CircleStyle({
            radius: radius,
            stroke: new Stroke({
              color: 'rgba(255, 0, 0, ' + opacity + ')',
              width: 0.25 + opacity,
            }),
          }),
        });

        vectorContext.setStyle(style);
        const flashGeom = feature.getGeometry().clone();
        vectorContext.drawGeometry(flashGeom);
        // tell OpenLayers to continue postrender animation
        map.render();
        console.log('definitely here');
      };
      const start = Date.now();
      const listenerKey = tileLayer.on('postrender', animate);
    };
    setSource((currentSource) => {
      const newSource = { ...currentSource };
      newSource.on('addfeature', function (e) {
        flash(e.feature);
      });
      return newSource;
    });

    addPlace();
  }, [meteoriteData]);
  return (
    <div className='mapRow'>
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.14.1/css/ol.css'
        type='text/css'
      ></link>
      <div className='map-container' ref={mapElement}></div>
    </div>
  );
};

export default MapDisplay;
