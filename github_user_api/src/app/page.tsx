"use client"; // This is a client component
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  const [userList, setUserList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
  });

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.github.com/search/users?q=type:user&&per_page=10`
      );
      // setUserList(res.json());
      const data = await res.json();
      setUserList(data.items);
    };
    fetchData();
  }, []);
  console.log(userList);

  const submitForm = async (e) => {
    // We don't want the page to refresh
    e.preventDefault();
    await fetch(`https://api.github.com/users/${formData.name}`)
      .then((response) => response.json()) // Converting the response to a JSON object
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => console.error(error));

    console.log(formData);
    console.log(userDetails);
    console.log(`https://api.github.com/users/${formData.name}`);
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
            <h2>All Users</h2>
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
        {/* <form method="POST" action="" onSubmit={submitForm}>
          <div>
            <input type="text" name="name" className={styles.input} placeholder="Enter a username" onChange={handleInput} value={formData.name} required />
          </div>
          <button type="submit" className={styles.submit}>Search</button> */}
        {/* <p>
          Note: This is a personal project that uses Github User API. In no way do we intend to impersonate Github as a company.
          </p> */}
        {/* </form> */}

        {userList.length ? (
          <ul className={styles.userList}>
            {userList.map((user) => {
              return (
                <li className={styles.userItem} key={user.login}>
                  <Image
                  className={styles.avatar}
                    src={user.avatar_url}
                    alt={user.login}
                    width={40}
                    height={40}
                  ></Image>
                  <label> {user.login}</label>
                </li>
              );
            })}
          </ul>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Find Users <i className="bi bi-caret-right-fill"></i>
          </h2>
          <p>Get a list of all Users on Github</p>
        </a>

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
