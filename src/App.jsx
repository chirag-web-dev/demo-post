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
                data: {
                  images: [
                    "data:image/png;base64,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",
                  ],
                  symbol: "EURUSD",
                  currency: "USD",
                  current_price: 1.17087,
                },
                chart: {
                  chartData: [
                    {
                      datetime: "2025-06-26T00:30:00.000Z",
                      open: 1.16878,
                      close: 1.16845,
                      high: 1.16889,
                      low: 1.16819,
                      volume: 1331,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750878000000,
                        index: 68,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T00:45:00.000Z",
                      open: 1.1684,
                      close: 1.16822,
                      high: 1.1685,
                      low: 1.1679,
                      volume: 1359,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750878900000,
                        index: 69,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T01:00:00.000Z",
                      open: 1.16823,
                      close: 1.16757,
                      high: 1.1683,
                      low: 1.16754,
                      volume: 1425,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750879800000,
                        index: 70,
                        level: 9,
                      },
                    },
                    {
                      datetime: "2025-06-26T01:15:00.000Z",
                      open: 1.16754,
                      close: 1.16715,
                      high: 1.16767,
                      low: 1.16668,
                      volume: 1433,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750880700000,
                        index: 71,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T01:30:00.000Z",
                      open: 1.16716,
                      close: 1.16782,
                      high: 1.1682,
                      low: 1.1669,
                      volume: 1397,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750881600000,
                        index: 72,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T01:45:00.000Z",
                      open: 1.16781,
                      close: 1.16863,
                      high: 1.16878,
                      low: 1.16776,
                      volume: 1594,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750882500000,
                        index: 73,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T02:00:00.000Z",
                      open: 1.16859,
                      close: 1.16846,
                      high: 1.16883,
                      low: 1.1683,
                      volume: 1315,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750883400000,
                        index: 74,
                        level: 10,
                      },
                    },
                    {
                      datetime: "2025-06-26T02:15:00.000Z",
                      open: 1.16847,
                      close: 1.1687,
                      high: 1.16884,
                      low: 1.1681,
                      volume: 1371,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750884300000,
                        index: 75,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T02:30:00.000Z",
                      open: 1.16878,
                      close: 1.16876,
                      high: 1.16883,
                      low: 1.1683,
                      volume: 1297,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750885200000,
                        index: 76,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T02:45:00.000Z",
                      open: 1.1688,
                      close: 1.16905,
                      high: 1.1696,
                      low: 1.1685,
                      volume: 1723,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750886100000,
                        index: 77,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T03:00:00.000Z",
                      open: 1.16902,
                      close: 1.16958,
                      high: 1.17173,
                      low: 1.1689,
                      volume: 2439,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750887000000,
                        index: 78,
                        level: 11,
                      },
                    },
                    {
                      datetime: "2025-06-26T03:15:00.000Z",
                      open: 1.16953,
                      close: 1.16949,
                      high: 1.17036,
                      low: 1.1693,
                      volume: 1829,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750887900000,
                        index: 79,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T03:30:00.000Z",
                      open: 1.16944,
                      close: 1.16939,
                      high: 1.1695,
                      low: 1.1688,
                      volume: 1599,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750888800000,
                        index: 80,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T03:45:00.000Z",
                      open: 1.16938,
                      close: 1.16947,
                      high: 1.16961,
                      low: 1.1691,
                      volume: 1106,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750889700000,
                        index: 81,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T04:00:00.000Z",
                      open: 1.16947,
                      close: 1.16842,
                      high: 1.16949,
                      low: 1.1682,
                      volume: 1582,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750890600000,
                        index: 82,
                        level: 10,
                      },
                    },
                    {
                      datetime: "2025-06-26T04:15:00.000Z",
                      open: 1.16843,
                      close: 1.1684,
                      high: 1.1686,
                      low: 1.168,
                      volume: 1013,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750891500000,
                        index: 83,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T04:30:00.000Z",
                      open: 1.16843,
                      close: 1.16829,
                      high: 1.16864,
                      low: 1.1681,
                      volume: 998,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750892400000,
                        index: 84,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T04:45:00.000Z",
                      open: 1.16825,
                      close: 1.1681,
                      high: 1.16833,
                      low: 1.1677,
                      volume: 999,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750893300000,
                        index: 85,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T05:00:00.000Z",
                      open: 1.16797,
                      close: 1.16813,
                      high: 1.16837,
                      low: 1.1674,
                      volume: 1378,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750894200000,
                        index: 86,
                        level: 9,
                      },
                    },
                    {
                      datetime: "2025-06-26T05:15:00.000Z",
                      open: 1.16808,
                      close: 1.16834,
                      high: 1.16842,
                      low: 1.1679,
                      volume: 1157,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750895100000,
                        index: 87,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T05:30:00.000Z",
                      open: 1.16835,
                      close: 1.16783,
                      high: 1.1685,
                      low: 1.16766,
                      volume: 1295,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750896000000,
                        index: 88,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T05:45:00.000Z",
                      open: 1.16781,
                      close: 1.16852,
                      high: 1.1686,
                      low: 1.1676,
                      volume: 1484,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750896900000,
                        index: 89,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T06:00:00.000Z",
                      open: 1.16852,
                      close: 1.16753,
                      high: 1.16852,
                      low: 1.1672,
                      volume: 2620,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750897800000,
                        index: 90,
                        level: 12,
                      },
                    },
                    {
                      datetime: "2025-06-26T06:15:00.000Z",
                      open: 1.16747,
                      close: 1.16775,
                      high: 1.16816,
                      low: 1.1671,
                      volume: 2147,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750898700000,
                        index: 91,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T06:30:00.000Z",
                      open: 1.16776,
                      close: 1.16859,
                      high: 1.16871,
                      low: 1.1674,
                      volume: 1962,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750899600000,
                        index: 92,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T06:45:00.000Z",
                      open: 1.16859,
                      close: 1.1699,
                      high: 1.17003,
                      low: 1.1685,
                      volume: 2334,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750900500000,
                        index: 93,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T07:00:00.000Z",
                      open: 1.16994,
                      close: 1.17,
                      high: 1.17013,
                      low: 1.169,
                      volume: 2437,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750901400000,
                        index: 94,
                        level: 9,
                      },
                    },
                    {
                      datetime: "2025-06-26T07:15:00.000Z",
                      open: 1.17008,
                      close: 1.17024,
                      high: 1.17133,
                      low: 1.1698,
                      volume: 2843,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750902300000,
                        index: 95,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T07:30:00.000Z",
                      open: 1.17025,
                      close: 1.17023,
                      high: 1.17045,
                      low: 1.1691,
                      volume: 2332,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750903200000,
                        index: 96,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T07:45:00.000Z",
                      open: 1.17023,
                      close: 1.17102,
                      high: 1.17124,
                      low: 1.17007,
                      volume: 2336,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750904100000,
                        index: 97,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T08:00:00.000Z",
                      open: 1.17104,
                      close: 1.17322,
                      high: 1.17323,
                      low: 1.1705,
                      volume: 2559,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750905000000,
                        index: 98,
                        level: 10,
                      },
                    },
                    {
                      datetime: "2025-06-26T08:15:00.000Z",
                      open: 1.17312,
                      close: 1.17294,
                      high: 1.17329,
                      low: 1.1721,
                      volume: 2513,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750905900000,
                        index: 99,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T08:30:00.000Z",
                      open: 1.17295,
                      close: 1.17387,
                      high: 1.17456,
                      low: 1.1726,
                      volume: 2752,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750906800000,
                        index: 100,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T08:45:00.000Z",
                      open: 1.17386,
                      close: 1.17277,
                      high: 1.17388,
                      low: 1.1726,
                      volume: 2525,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750907700000,
                        index: 101,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T09:00:00.000Z",
                      open: 1.17273,
                      close: 1.17215,
                      high: 1.1729,
                      low: 1.172,
                      volume: 2132,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750908600000,
                        index: 102,
                        level: 11,
                      },
                    },
                    {
                      datetime: "2025-06-26T09:15:00.000Z",
                      open: 1.17218,
                      close: 1.17192,
                      high: 1.17236,
                      low: 1.1712,
                      volume: 2504,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750909500000,
                        index: 103,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T09:30:00.000Z",
                      open: 1.17188,
                      close: 1.17262,
                      high: 1.17272,
                      low: 1.17169,
                      volume: 2044,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750910400000,
                        index: 104,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T09:45:00.000Z",
                      open: 1.17258,
                      close: 1.17252,
                      high: 1.1729,
                      low: 1.1721,
                      volume: 1881,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750911300000,
                        index: 105,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T10:00:00.000Z",
                      open: 1.17249,
                      close: 1.17207,
                      high: 1.17281,
                      low: 1.1718,
                      volume: 2045,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750912200000,
                        index: 106,
                        level: 10,
                      },
                    },
                    {
                      datetime: "2025-06-26T10:15:00.000Z",
                      open: 1.17203,
                      close: 1.17286,
                      high: 1.17297,
                      low: 1.1719,
                      volume: 1703,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750913100000,
                        index: 107,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T10:30:00.000Z",
                      open: 1.17287,
                      close: 1.17157,
                      high: 1.17312,
                      low: 1.1714,
                      volume: 1849,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750914000000,
                        index: 108,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T10:45:00.000Z",
                      open: 1.17156,
                      close: 1.17149,
                      high: 1.17202,
                      low: 1.1712,
                      volume: 1941,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750914900000,
                        index: 109,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T11:00:00.000Z",
                      open: 1.17149,
                      close: 1.17059,
                      high: 1.17157,
                      low: 1.1704,
                      volume: 2050,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750915800000,
                        index: 110,
                        level: 9,
                      },
                    },
                    {
                      datetime: "2025-06-26T11:15:00.000Z",
                      open: 1.17064,
                      close: 1.17022,
                      high: 1.17078,
                      low: 1.16946,
                      volume: 1918,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750916700000,
                        index: 111,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T11:30:00.000Z",
                      open: 1.17023,
                      close: 1.16985,
                      high: 1.17053,
                      low: 1.16936,
                      volume: 2069,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750917600000,
                        index: 112,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T11:45:00.000Z",
                      open: 1.16986,
                      close: 1.16947,
                      high: 1.1703,
                      low: 1.1693,
                      volume: 2265,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750918500000,
                        index: 113,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T12:00:00.000Z",
                      open: 1.16948,
                      close: 1.16974,
                      high: 1.16989,
                      low: 1.1689,
                      volume: 2334,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750919400000,
                        index: 114,
                        level: 13,
                      },
                    },
                    {
                      datetime: "2025-06-26T12:15:00.000Z",
                      open: 1.16975,
                      close: 1.17081,
                      high: 1.17092,
                      low: 1.1695,
                      volume: 2079,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750920300000,
                        index: 115,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T12:30:00.000Z",
                      open: 1.1707,
                      close: 1.17096,
                      high: 1.17119,
                      low: 1.16895,
                      volume: 3890,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750921200000,
                        index: 116,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T12:45:00.000Z",
                      open: 1.17097,
                      close: 1.17068,
                      high: 1.17129,
                      low: 1.1703,
                      volume: 3452,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750922100000,
                        index: 117,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T13:00:00.000Z",
                      open: 1.17065,
                      close: 1.17032,
                      high: 1.17115,
                      low: 1.1694,
                      volume: 3222,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750923000000,
                        index: 118,
                        level: 9,
                      },
                    },
                    {
                      datetime: "2025-06-26T13:15:00.000Z",
                      open: 1.17031,
                      close: 1.17189,
                      high: 1.1719,
                      low: 1.1699,
                      volume: 2885,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750923900000,
                        index: 119,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T13:30:00.000Z",
                      open: 1.1719,
                      close: 1.17147,
                      high: 1.17211,
                      low: 1.1707,
                      volume: 3016,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750924800000,
                        index: 120,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T13:45:00.000Z",
                      open: 1.17146,
                      close: 1.1717,
                      high: 1.1721,
                      low: 1.17135,
                      volume: 3074,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750925700000,
                        index: 121,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T14:00:00.000Z",
                      open: 1.17169,
                      close: 1.17158,
                      high: 1.17177,
                      low: 1.1705,
                      volume: 3016,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750926600000,
                        index: 122,
                        level: 10,
                      },
                    },
                    {
                      datetime: "2025-06-26T14:15:00.000Z",
                      open: 1.17147,
                      close: 1.17092,
                      high: 1.17191,
                      low: 1.1707,
                      volume: 3301,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750927500000,
                        index: 123,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T14:30:00.000Z",
                      open: 1.17097,
                      close: 1.17143,
                      high: 1.1718,
                      low: 1.1708,
                      volume: 3075,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750928400000,
                        index: 124,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T14:45:00.000Z",
                      open: 1.17147,
                      close: 1.17077,
                      high: 1.1719,
                      low: 1.1705,
                      volume: 3481,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750929300000,
                        index: 125,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T15:00:00.000Z",
                      open: 1.17084,
                      close: 1.16993,
                      high: 1.17116,
                      low: 1.16893,
                      volume: 3009,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750930200000,
                        index: 126,
                        level: 11,
                      },
                    },
                    {
                      datetime: "2025-06-26T15:15:00.000Z",
                      open: 1.16992,
                      close: 1.16977,
                      high: 1.1703,
                      low: 1.1693,
                      volume: 2485,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750931100000,
                        index: 127,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T15:30:00.000Z",
                      open: 1.16977,
                      close: 1.17117,
                      high: 1.17121,
                      low: 1.1696,
                      volume: 2309,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750932000000,
                        index: 128,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T15:45:00.000Z",
                      open: 1.17121,
                      close: 1.17165,
                      high: 1.17174,
                      low: 1.1709,
                      volume: 2017,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750932900000,
                        index: 129,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T16:00:00.000Z",
                      open: 1.17168,
                      close: 1.17182,
                      high: 1.17194,
                      low: 1.1713,
                      volume: 1952,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750933800000,
                        index: 130,
                        level: 10,
                      },
                    },
                    {
                      datetime: "2025-06-26T16:15:00.000Z",
                      open: 1.17182,
                      close: 1.17262,
                      high: 1.17271,
                      low: 1.17093,
                      volume: 2120,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750934700000,
                        index: 131,
                        level: 7,
                      },
                    },
                    {
                      datetime: "2025-06-26T16:30:00.000Z",
                      open: 1.17258,
                      close: 1.17373,
                      high: 1.17403,
                      low: 1.1724,
                      volume: 2239,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750935600000,
                        index: 132,
                        level: 8,
                      },
                    },
                    {
                      datetime: "2025-06-26T16:45:00.000Z",
                      open: 1.17376,
                      close: 1.17294,
                      high: 1.17384,
                      low: 1.1728,
                      volume: 2020,
                      indicators: {},
                      drawings: {},
                      idx: {
                        date: 1750936500000,
                        index: 133,
                        level: 7,
                      },
                    },
                  ],
                  drawings: {
                    shapes: [],
                    trendLines: [],
                    fibonaccies: [],
                    projections: [],
                    triangles: [],
                  },
                  settings: {
                    alerts: {
                      alertLines: false,
                      alertLinesColor: "#8A96A6",
                      alertLinesStyle: "Dash",
                      onlyActiveAlerts: false,
                    },
                    cursor: {
                      typeValue: "CROSSHAIR",
                      cursorHair: "#37474F",
                      sensetivity: 6,
                      crossHairCursorStyle: "Dash",
                    },
                    events: {
                      showMarketEventsOnChart: false,
                      showOnlyFutureMarketEvents: false,
                    },
                    candles: {
                      bodyBearishColor: "#13043E",
                      bodyBullishColor: "#C6BC00",
                      wickBearishColor: "#2B313A",
                      wickBullishColor: "#4B5565",
                      borderBearishColor: "#000000",
                      borderBullishColor: "#000000",
                    },
                    margins: {
                      top: 12,
                      right: 0,
                      bottom: 12,
                    },
                    trading: {
                      buySellButtons: true,
                      instantTrading: false,
                      journalRedirectAfterAction: false,
                      journalRedirectAfterActionValue: "ALL_ACTIONS",
                    },
                    satusBar: {
                      OHLC: true,
                      symbol: true,
                    },
                    appearance: {
                      profitLoss: false,
                      profitLossValue: "MONEY",
                      modificationLabelsValue: "VISIBLE",
                    },
                    controlBar: {
                      controlBar: true,
                      zoomControl: true,
                      nudgeBarValue: "ONE_CLICK",
                      controlBarValue: "VISIBLE",
                    },
                    riskManagement: {
                      setupRequired: false,
                      instantTrading: 12,
                      stopLossRequired: false,
                      takeProfitRequired: false,
                      instantTradingValue: "ACCOUNT_BALANCE",
                    },
                    dataModification: {
                      timeZoneValue: "UTC",
                      precisionValue: "6",
                    },
                  },
                },
                startTime: "2025-06-26T00:30:00.000Z",
                endTime: "2025-06-26T16:45:00.000Z",
                indicators: [],
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
