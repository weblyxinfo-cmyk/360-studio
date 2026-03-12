"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const cities: { name: string; lat: number; lng: number; type: "main" | "available" | "ondemand" }[] = [
  { name: "Brno", lat: 49.1951, lng: 16.6068, type: "main" },
  { name: "Zlín", lat: 49.2265, lng: 17.6669, type: "main" },
  { name: "Olomouc", lat: 49.5938, lng: 17.2509, type: "available" },
  { name: "Kroměříž", lat: 49.2977, lng: 17.3933, type: "available" },
  { name: "Přerov", lat: 49.4553, lng: 17.4510, type: "available" },
  { name: "Vyškov", lat: 49.2776, lng: 16.9990, type: "available" },
  { name: "Kuřim", lat: 49.2986, lng: 16.5312, type: "available" },
  { name: "Jihlava", lat: 49.3961, lng: 15.5912, type: "available" },
  { name: "Velké Meziříčí", lat: 49.3553, lng: 16.0123, type: "available" },
  { name: "Boskovice", lat: 49.4879, lng: 16.6601, type: "available" },
  { name: "Břeclav", lat: 48.7590, lng: 16.8820, type: "available" },
  { name: "Hodonín", lat: 48.8493, lng: 17.1322, type: "available" },
  { name: "Mikulov", lat: 48.8056, lng: 16.6377, type: "available" },
  { name: "Znojmo", lat: 48.8555, lng: 16.0488, type: "ondemand" },
];

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const bounds = L.latLngBounds(cities.map((c) => [c.lat, c.lng]));

    const map = L.map(mapRef.current, {
      center: bounds.getCenter(),
      zoom: 8,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
    });

    map.fitBounds(bounds, { padding: [35, 35] });

    // Zoom control top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Large coverage area polygon connecting outer cities
    const coverageArea: [number, number][] = [
      [49.60, 15.50],  // above Jihlava
      [49.55, 17.50],  // above Olomouc/Přerov
      [49.30, 17.75],  // east of Zlín
      [48.70, 17.20],  // below Hodonín
      [48.70, 16.00],  // below Znojmo
      [49.30, 15.50],  // west of Jihlava
    ];

    L.polygon(coverageArea, {
      color: "rgba(200,169,110,0.35)",
      weight: 1.5,
      dashArray: "6,4",
      fillColor: "rgba(200,169,110,0.06)",
      fillOpacity: 1,
    }).addTo(map);

    // Glow circles for main cities
    cities
      .filter((c) => c.type === "main")
      .forEach((c) => {
        L.circle([c.lat, c.lng], {
          radius: 18000,
          color: "rgba(200,169,110,0.4)",
          weight: 1,
          fillColor: "rgba(200,169,110,0.1)",
          fillOpacity: 1,
        }).addTo(map);
      });

    // City markers with labels
    cities.forEach((c) => {
      const isMain = c.type === "main";
      const isOnDemand = c.type === "ondemand";
      const dotSize = isMain ? 12 : 8;
      const color = isOnDemand ? "#888" : isMain ? "#c8a96e" : "#22c55e";
      const labelSize = isMain ? "11px" : "10px";
      const labelWeight = isMain ? "700" : "500";
      const labelColor = isMain ? "#c8a96e" : isOnDemand ? "#888" : "rgba(255,255,255,0.8)";

      const icon = L.divIcon({
        html: `<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
          <div style="width:${dotSize}px;height:${dotSize}px;background:${color};border-radius:50%;border:2px solid rgba(255,255,255,0.9);box-shadow:0 0 ${isMain ? "15" : "8"}px ${color}80${isMain ? ",0 0 30px " + color + "40" : ""}"></div>
          <span style="font-family:'DM Sans',sans-serif;font-size:${labelSize};font-weight:${labelWeight};color:${labelColor};white-space:nowrap;text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 8px rgba(0,0,0,0.7)">${c.name}</span>
        </div>`,
        iconSize: [100, 30],
        iconAnchor: [50, 8],
        className: "",
      });

      L.marker([c.lat, c.lng], { icon, interactive: false }).addTo(map);
    });

    L.control
      .attribution({ prefix: false, position: "bottomright" })
      .addAttribution(
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a> &copy; <a href="https://carto.com/" target="_blank">CARTO</a>'
      )
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
