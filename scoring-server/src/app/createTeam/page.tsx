'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

async function submit(teamName: string) {
	const send = await fetch('/api/route-name', {
	  	method: 'POST',
	  	headers: {
	  	  'Content-Type': 'application/json',
	  	},
	  	body: JSON.stringify({ "teamname": teamName, "score": 0, "found": {}}),
	})
}

export default function Home() {
	const [ text, setText ] = useState('');
  	var teamName = "";

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    	setText(e.target.value);
  	};

	const handleSubmit = async () => {
    if (!text.trim()) {
		alert("You need a team name")
      	return;
    }

    try {
      const res = await fetch('/api/create', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "teamname": text, "score": 0, "found": {}}),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
	  
      setText(''); // Clear input after successful submission
    } catch (err) {
		alert(err)
    } finally {
		console.log("Works")
    }
  };

  	return (
      	<div className="main">
        	<form>
          		<input type="text" value={text} onChange={handleChange} />

          		<button onClick={handleSubmit}>submit</button>
        	</form>
      	</div>
  	);
}
