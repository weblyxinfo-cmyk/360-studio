"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Green coverage zone polygon around Brno (~15-20km radius)
const coveragePolygon: [number, number][] = [
  [49.30, 16.50],
  [49.31, 16.55],
  [49.32, 16.60],
  [49.31, 16.67],
  [49.30, 16.73],
  [49.28, 16.78],
  [49.25, 16.82],
  [49.22, 16.84],
  [49.19, 16.85],
  [49.16, 16.84],
  [49.13, 16.82],
  [49.10, 16.78],
  [49.08, 16.73],
  [49.07, 16.67],
  [49.07, 16.60],
  [49.08, 16.53],
  [49.10, 16.48],
  [49.13, 16.44],
  [49.16, 16.42],
  [49.19, 16.41],
  [49.22, 16.42],
  [49.25, 16.44],
  [49.28, 16.48],
];

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [49.195, 16.608],
      zoom: 11,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Green coverage zone
    L.polygon(coveragePolygon, {
      color: "#22c55e",
      weight: 2,
      fillColor: "#22c55e",
      fillOpacity: 0.18,
    }).addTo(map);

    // Brno center marker
    const icon = L.divIcon({
      html: `<div style="width:14px;height:14px;background:#22c55e;border-radius:50%;border:2px solid #fff;box-shadow:0 0 10px rgba(34,197,94,0.6)"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      className: "",
    });

    L.marker([49.195, 16.608], { icon }).addTo(map)
      .bindPopup("<strong>KAJO STUDIO 360</strong><br>Brno — hlavní region");

    // Attribution
    L.control.attribution({ prefix: false, position: "bottomright" })
      .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a> &copy; <a href="https://carto.com/" target="_blank">CARTO</a>')
      .addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        aspectRatio: "4/3",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    />
  );
}
