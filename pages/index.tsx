import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const inter = Inter({ subsets: ["latin"] });

export class User {
  id!: number;

  userName!: string;
}

export default function Home() {
  const [response, setResponse] = useState([] as User[]);
  const [name, setname] = useState("");

  async function fetchData() {
    await axios.get("http://localhost:4000/user").then((response) => {
      if (response.status === 200) {
        setResponse(response.data);
      }
    });
  }

  async function handleSubmit() {
    await axios
      .post("http://localhost:4000/user", {
        userName: name,
      })
      .then((response) => {
        console.log(response);
        window.location.reload()
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1
        style={{
          color: "white",
        }}
      >
        Hello World
      </h1>
      {/* <div
        style={{
          color: "white",
        }}
      >
        {response.map((x) => (
          <div key={x.id}>{x.userName}</div>
        ))}
      </div> */}
      <div className="card">
        <DataTable value={response} responsiveLayout="scroll">
          <Column field="id" header="Id"></Column>
          <Column field="userName" header="UserName"></Column>
        </DataTable>
      </div>
      <InputText value={name} onChange={(e) => setname(e.target.value)} />
      <Button label="Submit" onClick={handleSubmit} />
      <Link href={"/users"}>Go to Users Page</Link>
    </>
  );
}
