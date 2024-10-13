import React, { useState, useEffect } from "react";

const HardLevelUseEffectTest = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [doubleCount, setDoubleCount] = useState(0);

  // 1. Basic useEffect with dependency on `count`
  useEffect(() => {
    console.log("Effect 1: Count changed");
    setDoubleCount(count * 2);
  }, [count]);

  // 2. useEffect with an empty dependency array (runs once)
  useEffect(() => {
    console.log("Effect 2: Component mounted");

    // Cleanup to test candidates understanding of cleanup functions
    return () => {
      console.log("Effect 2: Component will unmount");
    };
  }, []);

  // 3. Conditional useEffect based on the length of `text`
  useEffect(() => {
    if (text.length > 5) {
      console.log("Effect 3: Text length is greater than 5");
    }
  }, [text]);

  // 4. Recursive update that can trigger an infinite loop if not handled correctly
  useEffect(() => {
    console.log("Effect 4: Double count changed");

    if (doubleCount > 10 && count <= 10) {
      console.log("Effect 4: Adjusting count to avoid infinite loop");
      setCount(10);
      // Can lead to infinite loops if not handled carefully
    }
  }, [doubleCount]);

  // 5. An intentional delayed state update to trick candidates about when the render happens
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Effect 5: Delayed effect after 2 seconds");
      setCount((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
    // Cleanup to clear the timer if component unmounts
  }, []);

  return (
    <div>
      <h1>useEffect Interview Challenge</h1>
      <p>Count: {count}</p>
      <p>Double Count: {doubleCount}</p>
      <p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something"
        />
      </p>
    </div>
  );
};

export default HardLevelUseEffectTest;
