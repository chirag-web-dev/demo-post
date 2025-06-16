import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [snapshotUrl, setSnapshotUrl] = useState(null);

  // useEffect(() => {
  //   console.log("count_changed i am webapp", count);
  //   // newCount =
  //   // Send message using postMessage
  //   window.postMessage(
  //     {
  //       type: "count_changed",
  //       payload: { count },
  //     },
  //     "*" // You can restrict this to specific origins if needed
  //   );
  // }, [count]);

  // Add listener for messages from Chrome extension
  useEffect(() => {
    const handleMessage = (event) => {
      // Verify the message is from your extension if needed
      // if (event.origin !== "chrome-extension://your-extension-id") return;

      const message = event.data;
      if (message.type === "extension_message") {
        alert(message.payload.message);
      } else if (
        message.type === "EnableVueLens" ||
        message.payload?.key === "vuetraChrome"
      ) {
        console.log("finish got the message from chrome extension ");
        // console.log(
        //   "Snapshot enabled with URL: i am web ",
        //   message.payload.imageUrl
        // );
        setTimeout(() => {
          window.postMessage(
            {
              type: "SnapshotCapturedFromWebApp",
              payload: {
                chartData: [
                  {
                    datetime: "2025-06-12T11:45:00.000Z",
                    open: 1.1586,
                    close: 1.15892,
                    high: 1.15911,
                    low: 1.15827,
                    volume: 2113,
                    indicators: {},
                    drawings: {},
                    idx: {
                      date: 1749708900000,
                      index: 47,
                      level: 7,
                    },
                  },
                ],
                images: [
                  "https://staging.storage.vuetest.com/public/ai/agents/67_66/scanned_images/14b8d02d-936e-48fc-a300-d4e6d4c61e71.png",
                ],
                symbol: "EURUSD",
                currency: "USD",
                current_price: 0,
                startTime: "2025-06-12T11:45:00.000Z",
                endTime: "2025-06-13T02:45:00.000Z",
                skipImageUpload: true,
              },
            },
            "*" // Optional: restrict to specific origin if needed
          );
        }, 5000);

        // setSnapshotUrl(message.payload.imageUrl);
        // You can do something with the snapshot URL here
        // For example, display it in an image element
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {/* {snapshotUrl && (
        <div className="snapshot-preview">
          <h3>Snapshot Preview:</h3>
          <img src={snapshotUrl} alt="Snapshot" style={{ maxWidth: "100%" }} />
        </div>
      )} */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
