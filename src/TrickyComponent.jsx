import React, { useState, useEffect, useCallback } from "react";

const TrickyComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [doubleCount, setDoubleCount] = useState(0);
  const [tripleCount, setTripleCount] = useState(0);

  // Callback memoization
  const increment = useCallback(() => {
    if (count < 10) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]); // Dependency on 'count'

  const resetText = useCallback(() => {
    setText("");
  }, []); // No dependency, remains stable

  // First useEffect to watch 'count' and update doubleCount
  useEffect(() => {
    if (doubleCount < 25) {
      setDoubleCount(count * 2);
    }
    console.log("Updating doubleCount:", count * 2);
  }, [count]); // Dependency on 'count'

  // Second useEffect with a dependency on 'increment'
  useEffect(() => {
    console.log("useEffect with increment callback");
    increment(); // This will cause another re-render
  }, [increment]); // Dependency on 'increment'

  // Third useEffect watching 'text' and resetting count
  useEffect(() => {
    if (text === "reset") {
      setCount(0); // Resets count and triggers related effects
      resetText(); // Resets text back to empty
    }
  }, [text]); // Dependency on 'text'

  // Fourth useEffect to simulate an external data fetch when count changes
  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetch
      console.log("Fetching data related to count...");
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(count * 3), 1000)
      );
      if (tripleCount < 50) {
        setTripleCount(response); // Updating tripleCount after fetch
      }
    };
    fetchData();
  }, [count]); // Dependency on 'count'

  // Fifth useEffect to log changes in 'doubleCount' and 'tripleCount'
  useEffect(() => {
    console.log("Double Count or Triple Count changed:", {
      doubleCount,
      tripleCount,
    });
  }, [doubleCount, tripleCount]); // Dependency on 'doubleCount' and 'tripleCount'

  // Sixth useEffect to handle component mount/unmount behavior
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []); // Runs once on mount and cleanup on unmount

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double Count: {doubleCount}</h2>
      <h2>Triple Count (Simulated Fetch): {tripleCount}</h2>
      <button onClick={increment}>Increment</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type 'reset' to reset the count"
      />
    </div>
  );
};

export default TrickyComponent;
