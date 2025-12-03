import React, { useEffect, useRef } from 'react';
import { Network as VisNetwork } from 'vis-network';

const Network = ({ locations, edges, onSelectLocation }) => {
  const container = useRef(null);
  const network = useRef(null);

  useEffect(() => {
    if (!container.current || locations.length === 0) return;

    // Convert locations to vis-network nodes
    const nodes = locations.map(loc => ({
      id: loc.id,
      label: loc.name,
      title: `${loc.name} - Risk: ${loc.riskLevel}`,
      color: {
        background: loc.riskLevel === 'High' ? '#ff4444' : loc.riskLevel === 'Moderate' ? '#ffaa00' : '#44ff44',
        border: '#333',
      },
      font: { size: 14 },
    }));

    // Convert edges to vis-network edges
    const visEdges = edges.map((edge, idx) => ({
      id: idx,
      from: edge.from,
      to: edge.to,
      label: edge.label,
      color: '#888',
      font: { size: 12 },
    }));

    const data = { nodes, edges: visEdges };

    const options = {
      physics: {
        enabled: true,
        stabilization: { iterations: 200 },
        barnesHut: {
          gravitationalConstant: -26000,
          centralGravity: 0.3,
          springLength: 200,
          springConstant: 0.04,
        },
      },
      interaction: {
        navigationButtons: true,
        keyboard: true,
      },
    };

    if (network.current) {
      network.current.destroy();
    }

    network.current = new VisNetwork(container.current, data, options);

    network.current.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const location = locations.find(loc => loc.id === nodeId);
        if (location) {
          onSelectLocation(location);
        }
      }
    });

    return () => {
      if (network.current) {
        network.current.destroy();
      }
    };
  }, [locations, edges, onSelectLocation]);

  return (
    <div 
      ref={container} 
      style={{ 
        width: '100%', 
        height: '100%', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }} 
    />
  );
};

export default Network;
