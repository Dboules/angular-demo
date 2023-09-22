import { Component, OnInit } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';
import Link from 'ol/interaction/Link';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';
import { Style, Fill, Stroke } from 'ol/style';
import colormap from 'colormap';
import { getArea } from 'ol/sphere';
import { Geometry } from 'ol/geom';
@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.less'],
})
export class WorkplaceComponent implements OnInit {
  map!: Map;
  source!: VectorSource;
  layer!: VectorLayer<any>;
  constructor() {}
  ngOnInit(): void {
    this.map = new Map({
      target: 'map',
      view: new View({ center: fromLonLat([104.06, 30.67]), zoom: 2 }),
      layers: [
        new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: 'assets/data/countries.json',
          }),
        }),
      ],
    });
    this.map.addInteraction(new Link());
    this.source = new VectorSource();
    this.layer = new VectorLayer({
      source: this.source,
      style: (feature) => {
        return new Style({
          fill: new Fill({
            color: this.getColor(feature),
          }),
          stroke: new Stroke({
            color: 'rgba(255,255,255,0.8)',
            width: 4,
          }),
        });
      },
    });
    this.map.addLayer(this.layer);
    this.map.addInteraction(
      new DragAndDrop({
        source: this.source,
        formatConstructors: [GeoJSON],
      })
    );
    this.map.addInteraction(
      new Modify({
        source: this.source,
      })
    );
    this.map.addInteraction(
      new Draw({
        type: 'Polygon',
        source: this.source,
      })
    );
    this.map.addInteraction(
      new Snap({
        source: this.source,
      })
    );
  }
  clamp(value: number, low: number, high: number) {
    return Math.max(low, Math.min(value, high));
  }
  getColor(feature: any) {
    const min = 1e8; // the smallest area
    const max = 2e13; // the biggest area
    const steps = 50;
    const ramp = colormap({
      colormap: 'blackbody',
      nshades: steps,
    });
    const area = getArea(feature.getGeometry());
    const f = Math.pow(this.clamp((area - min) / (max - min), 0, 1), 1 / 2);
    const index = Math.round(f * (steps - 1));
    return ramp[index];
  }
  onClear() {
    this.source.clear();
  }
}
