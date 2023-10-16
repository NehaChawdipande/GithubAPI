"use client"; // This is a client component
import Image from "next/image";
import "../app/globals.css";
import styles from "../app/page.module.scss";
import styles1 from "./findUsers.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function UserData(props) {
  const userDetails = props.props;
  console.log(userDetails);
  return (
    <>
      <div className={styles1.userDataContainer}>
        <Image
          className={styles.avatar}
          src={userDetails.avatar_url}
          alt={userDetails.login}
          width={80}
          height={80}
        ></Image>
        <div>
          <h2> {userDetails.name}</h2>
          <p> {userDetails.bio}</p>
          <p> Company: {userDetails.company}</p>
          <p> Followers: {userDetails.followers}</p>
          <p> Following: {userDetails.following}</p>
          <p> Repos: {userDetails.public_repos}</p>
        </div>
      </div>
      <a href={userDetails.html_url} className={styles1.redirect}>
        Visit Profile
      </a>
      <a className={styles1.submit} href="/">
        Back to All Users
      </a>
    </>
  );
}
