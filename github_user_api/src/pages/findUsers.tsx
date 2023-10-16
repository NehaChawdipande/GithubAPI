"use client"; // This is a client component
import React, { useState } from "react";
import UserData from "./userData";

import Link from "next/link";
import Image from "next/image";
import "../app/globals.css";
import styles from "../app/page.module.scss";
import styles1 from "./findUsers.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function FindUser() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [userDetails, setUserDetails] = useState();
  const submitForm = async (e) => {
    // We don't want the page to refresh
    e.preventDefault();
    const res = await fetch(`https://api.github.com/users/${formData.name}`);
    const data = await res.json();
    setUserDetails(data);
  };

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>Find Users</h2>
          </a>
        </div>
        <div>
          <a
            href="https://github.com/NehaChawdipande"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developer here{" "}
            <Image
              src="/github-mark-white.png"
              alt="Github Mark"
              width={50}
              height={40}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/Github_Logo.png"
          alt="Github Logo"
          width={180}
          height={56}
          priority
        />
        {userDetails ? (
          <div
            style={{
              transform: "translateZ(10px)",
              display: "grid",
              marginTop: "24px",
            }}
          >
            {userDetails.login ? (
              <UserData props={userDetails} />
            ) : (
              "User Not Found!"
            )}

            <button className={styles1.submit} onClick={() => setUserDetails()}>
              Find Other User
            </button>
          </div>
        ) : (
          <form
            method="POST"
            action=""
            onSubmit={submitForm}
            style={{ transform: "translateZ(10px)" }}
          >
            <div>
              <input
                type="text"
                name="name"
                className={styles.input}
                placeholder="Enter a username"
                onChange={handleInput}
                value={formData.name}
                required
              />
            </div>
            <button type="submit" className={styles.submit}>
              Search
            </button>
            {/* <p>
          Note: This is a personal project that uses Github User API. In no way do we intend to impersonate Github as a company.
          </p> */}
          </form>
        )}
      </div>

      <div className={styles.grid}>
        <Link className={styles.card} href="/" target="_self">
          <h2>
            All Users <i className="bi bi-caret-right-fill"></i>
          </h2>
          <p>Find a specific user on Github</p>
        </Link>

        <a
          href="https://nehachawdipande.github.io/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Portfolio <i className="bi bi-caret-right-fill"></i>
          </h2>
          <p>Developer portfolio here!</p>
        </a>
      </div>
    </main>
  );
}
