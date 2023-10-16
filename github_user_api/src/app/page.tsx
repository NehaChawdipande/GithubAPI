"use client"; // This is a client component
import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import UserData from "../pages/userData";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.github.com/search/users?q=type:user&&per_page=10`
      );
      const data = await res.json();
      setUserList(data.items);
      console.log(data.items);
    };
    fetchData();
  }, []);

  const loadUserDetails = async (user) => {
    const res = await fetch(`https://api.github.com/users/${user.login}`);
    const data = await res.json();
    console.log(data);
    setSelectedUserDetails(data);
    setSelectedUser(true);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <a
            href="https://github.com/NehaChawdipande/GithubAPI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>Github Users</h2>
          </a>
        </div>
        <div>
          <a
            href="https://github.com/NehaChawdipande"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developer here
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

        {userList.length && !selectedUser ? (
          <ul className={styles.userList}>
            {userList.map((user) => {
              return (
                <div
                  // href="/userData"
                  // target="_self"
                  key={user.login}
                  className={styles.card}
                >
                  <li
                    className={styles.userItem}
                    onClick={() => loadUserDetails(user)}
                  >
                    <Image
                      className={styles.avatar}
                      src={user.avatar_url}
                      alt={user.login}
                      width={40}
                      height={40}
                    ></Image>
                    <label> {user.login}</label>
                  </li>
                </div>
              );
            })}
          </ul>
        ) : userList.length && selectedUser ? (
          <UserData props={selectedUserDetails} />
        ) : (
          <h3>Loading...</h3>
        )}
      </div>

      <div className={styles.grid}>
        <Link className={styles.card} href="/findUsers" target="_self">
          <h2>
            Find Users <i className="bi bi-caret-right-fill"></i>
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
