"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import CartDrawer from "./cartdrawer";

const navigation = [
  { name: "Home", href: "/pages/home" },
  { name: "Products", href: "/pages/productlist" },
  { name: "Contact Us", href: "/pages/contact" },
  { name: "About", href: "/pages/about" },
  { name: "View Gallery", href: "/pages/viewmodel" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    
    <Disclosure as="nav" className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          {/* Logo and Navigation Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src="/images/Logo.png" className="h-auto w-28" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 mt-10">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-red-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Cart and Profile Dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Cart Button */}
            <div className="relative">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View cart</span>
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                0
              </span>
            </div>
  <div className="flex space-x-4 ml-4">
  {status === "loading" ? (
              <p className="text-gray-300  ">Loading...</p>
            ) : session ? (
              <button
              onClick={() => signOut()}
              className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
            <Link
              href="/pages/login"
              className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
             <Link
                  href="/pages/signup"
                  className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Signup
                </Link>
      </div>
          )}

          </div>
        </div>
      </div>
      </div>

      {/* Mobile Menu Items */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
//      {/* Cart Drawer
// {isCartOpen && <CartDrawer />}
// </> */}
  );
  
}
