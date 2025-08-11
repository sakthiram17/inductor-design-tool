import React, { useEffect, useState } from "react";
import type { Design } from "../common/Design";
import InfoBubble from "../components/ui/info-card/InfoBubble";
import "./YourDesigns.css";
import Button, { ButtonStyle } from "../components/ui/Button/Button";
import { convertToMM4, formatIndianNumber } from "../common/Utils";
import { AnimatePresence, motion } from "framer-motion";

const YourDesigns: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);

  useEffect(() => {
    loadDesigns();
  }, []);

  const loadDesigns = () => {
    const stored = localStorage.getItem("savedDesigns");
    if (stored) {
      try {
        setDesigns(JSON.parse(stored) as Design[]);
      } catch (err) {
        console.error("Error parsing designs from localStorage", err);
      }
    } else {
      setDesigns([]);
    }
  };

  const deleteDesign = (index: number) => {
    const updated = designs.filter((_, i) => i !== index);
    localStorage.setItem("designs", JSON.stringify(updated));
    setDesigns(updated);
  };

  return (
    <AnimatePresence>
      <div className="designs-container">
        <h1>Your Designs</h1>
        {designs.length === 0 ? (
          <p>No saved designs found.</p>
        ) : (
          <div className="designs-grid">
            {designs.map((d, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div key={idx} className="design-card">
                  <div className="design-header">
                    <h2>{d.projectTitle}</h2>
                  </div>

                  <div className="design-details">
                    <InfoBubble
                      label="Created On"
                      value={new Date(d.savedAt).toLocaleString()}
                    />
                    <InfoBubble
                      label="Inductance"
                      value={d.inductance}
                      unit="H"
                    />
                    <InfoBubble
                      label="RMS Current"
                      value={d.rmsCurrent}
                      unit="A"
                    />
                    <InfoBubble
                      label="Peak Current"
                      value={d.peakCurrent}
                      unit="A"
                    />
                    <InfoBubble
                      label="Winding Factor"
                      value={d.windingFactor}
                      unit=""
                    />
                    <InfoBubble
                      label="Area Product"
                      value={
                        formatIndianNumber(convertToMM4(d.areaProduct || 0)) ??
                        "N/A"
                      }
                      unit="mm²"
                    />
                    <InfoBubble label="Turns" value={d.turns} unit="" />
                    <InfoBubble
                      label="Resistance"
                      value={d.resistance.toFixed(2)}
                      unit="mΩ"
                    />
                    <InfoBubble
                      label="Power Loss"
                      value={d.powerLoss.toFixed(2)}
                      unit="W"
                    />
                    <InfoBubble
                      label="Core"
                      value={d.core?.sku ?? "N/A"}
                      unit=""
                    />
                    {d.selectedWire && (
                      <InfoBubble
                        label="Wire"
                        value={d.selectedWire.name}
                        unit=""
                      />
                    )}
                    <InfoBubble
                      label="Valid"
                      value={d.isValid ? "Yes" : "No"}
                      unit=""
                    />
                  </div>

                  <div className="design-actions">
                    <Button
                      className="delete-btn"
                      styleType={ButtonStyle.Danger}
                      label="Delete"
                      onClick={() => deleteDesign(idx)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default YourDesigns;
