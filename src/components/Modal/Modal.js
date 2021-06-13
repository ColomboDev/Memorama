import React from "react";
import { useSpring, animated } from "react-spring";
import "./Modal.css";

export function Modal({ showModal, handleShowModal, children }) {
  const animiation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? "translateY(0%)" : "translateY(-100%)",
  });
  return (
    <>
      {showModal && (
        <div className="modal">
          <animated.div style={animiation}>
            <div className="moda-wrapper">{children}</div>
          </animated.div>
        </div>
      )}
    </>
  );
}
