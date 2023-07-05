"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const NavBar = () => {
  const isUserLogedIn = true;
  //create a provider state and asign their value from next-auth providers using useffect
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setProviders = async () => {
      const Response = await getProviders();
      setProviders(Response);
    };
    setProviders(Response);
  }, []);

  return (
    <nav className=" flex-between w-full mb-16 pt-3">
      <Link href="/" className=" flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="PromptHub logo"
          width={30}
          height={30}
          className=" object-contain"
        ></Image>
        <p className="logo_text">PromtHub</p>
      </Link>
      {/* Mobile Navigation */}
      <div className=" sm:flex hidden">
        {isUserLogedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create_prompt"} className=" black_btn">
              create post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              SignOut
            </button>
            <Link href={"profile"}>
              <Image
                src={"/assets/images/logo.svg"}
                width={37}
                height={37}
                className=" rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className=" black_btn"
                >
                  {" "}
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation  */}
      <div className="sm:hidden flex relative">
        {isUserLogedIn ? (
          <div className=" flex">
            <Image
              src={"/assets/images/logo.svg"}
              width={37}
              height={37}
              className=" rounded-full"
              alt="profile"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  {" "}
                  My Profile
                </Link>
                <Link
                  href="/create_prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  {" "}
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className=" mt-5 w-full black_btn"
                >
                  {" "}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className=" black_btn"
                >
                  {" "}
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;