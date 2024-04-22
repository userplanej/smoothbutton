"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "./loading-spinner";

const buttonCopy = {
  idle: "Send me a login link",
  loading: <Spinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  success: "Login link sent!",
} as const;

export default function SmoothButton() {
  const [buttonState, setButtonState] =
    useState<keyof typeof buttonCopy>("idle");

  return (
    <button
      className="blue-button"
      disabled={buttonState === "loading"}
      onClick={() => {
        // This is just for the sake of this demo
        if (buttonState === "success") return;

        // These `setTimeouts` should not be used in prod
        // and are here only to demonstrate the animation
        setButtonState("loading");

        setTimeout(() => {
          setButtonState("success");
        }, 1750);

        setTimeout(() => {
          setButtonState("idle");
        }, 3500);
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          key={buttonState}
        >
          {buttonCopy[buttonState]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
