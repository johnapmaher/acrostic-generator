import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setnameInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  function replaceWithBr(input) {
    if(input) {
      console.log(input);
      const replaced = input.replace(/\/\nn/g, "<br />");
      console.log(replaced);
      return replaced;
    }
    
  }
  

  return (
    <div>
      <Head>
        <title>Itinerary Generator</title>
        <link rel="icon" href="/Tinder-Emblem.png" />
      </Head>

      <main className={styles.main}>
        <img src="/Tinder-Emblem.png" className={styles.icon} />
        <h3>Enter name</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setnameInput(e.target.value)}
          />
          <input type="submit" value="Generate Acrostic" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
