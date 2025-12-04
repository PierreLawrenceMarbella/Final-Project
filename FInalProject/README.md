# EarthSafe GIS Analyzer

A web-based MVP disaster management application that showcases the use of a **graph data structure** for analyzing spatial relationships between disaster locations.

## Features

- **Location Management**: Add disaster-affected locations with latitude, longitude, and risk levels
- **Graph Visualization**: Interactive network graph showing locations as nodes and connections as edges
- **Risk Analysis**: Color-coded risk levels (Low=Green, Moderate=Yellow, High=Red)
- **Spatial Connections**: Define relationships between locations with distance metrics
- **Path Analysis**: Built-in algorithms for analyzing connectivity between locations

## Data Structure: Graph

The application uses a **graph data structure** where:

- **Nodes** represent disaster locations (buildings, fault zones, etc.)
- **Edges** represent spatial relationships and distances between locations

This enables efficient queries such as:

- Which buildings are within X km of a fault line?
- What is the shortest evacuation path between two locations?
- Which areas are most connected in the disaster network?

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Visualization**: vis-network
- **Styling**: CSS3

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

## Build

```bash
npm run build
```

## Usage

1. **Add Locations**: Fill in the location name, coordinates (latitude/longitude), and select a risk level
2. **Create Connections**: Once you have 2+ locations, create connections by selecting source and destination locations and specifying distance
3. **Visualize Network**: The graph updates in real-time showing the disaster network
4. **Analyze Data**: Click on nodes to view detailed information about each location

## Graph Algorithms Implemented

- **BFS (Breadth-First Search)**: For finding shortest paths between locations
- **Connectivity Analysis**: Identifying isolated vs. connected disaster zones

## Future Enhancements

- Shortest path highlighting
- Risk propagation simulation
- Real-time earthquake data integration
- GIS layer integration
- Export reports for LGUs (Local Government Units)
