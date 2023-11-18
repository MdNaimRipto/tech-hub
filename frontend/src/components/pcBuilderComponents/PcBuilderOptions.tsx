"use-client";
import { useState, useEffect } from "react";
import cpu from "@/assets/pc-builder/cpu.webp";
import cooler from "@/assets/pc-builder/cooler.webp";
import motherboard from "@/assets/pc-builder/motherboard.webp";
import ram from "@/assets/pc-builder/ram.webp";
import storage from "@/assets/pc-builder/storage.webp";
import psu from "@/assets/pc-builder/psu.webp";
import gpu from "@/assets/pc-builder/gpu.webp";
import casing from "@/assets/pc-builder/casing.webp";
import monitor from "@/assets/pc-builder/monitor.webp";
import keyboard from "@/assets/pc-builder/keyboard.webp";
import mouse from "@/assets/pc-builder/mouse.webp";
import headphone from "@/assets/pc-builder/headphone.webp";
import { IProducts } from "@/types/productTypes/productsTypes";

interface IOption {
  img: any;
  title: string;
  path: string;
  product?: IProducts | null;
}

export function PcBuilderOptions() {
  const [products, setProducts] = useState<IProducts[]>([]);

  // Check if running in the browser environment
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedProducts = window.localStorage.getItem("pc-builder-products");

      // Use the nullish coalescing operator to provide an empty array if storedProducts is null
      const allProducts = storedProducts ? JSON.parse(storedProducts) : [];
      console.log(allProducts);
      setProducts(allProducts);
    }
  }, []);

  const options: IOption[] = [
    {
      img: cpu,
      title: "Processor / CPU",
      path: "/pc-builder/products?category=CPU",
      product: products?.find(p => p.category === "CPU") || null,
    },
    {
      img: cooler,
      title: "CPU Cooler",
      path: "/pc-builder/products?category=COOLER",
      product: products?.find(p => p.category === "COOLER") || null,
    },
    {
      img: motherboard,
      title: "Motherboard",
      path: "/pc-builder/products?category=MOTHERBOARD",
      product: products?.find(p => p.category === "MOTHERBOARD") || null,
    },
    {
      img: ram,
      title: "Ram",
      path: "/pc-builder/products?category=RAM",
      product: products?.find(p => p.category === "RAM") || null,
    },
    {
      img: storage,
      title: "Storage / HDD or SSD",
      path: "/pc-builder/products?category=STORAGE",
      product: products?.find(p => p.category === "STORAGE") || null,
    },
    {
      img: psu,
      title: "Power Supply",
      path: "/pc-builder/products?category=PSU",
      product: products?.find(p => p.category === "PSU") || null,
    },
    {
      img: gpu,
      title: "Graphics Card",
      path: "/pc-builder/products?category=GPU",
      product: products?.find(p => p.category === "GPU") || null,
    },
    {
      img: casing,
      title: "Casing",
      path: "/pc-builder/products?category=CASING",
      product: products?.find(p => p.category === "CASING") || null,
    },
    {
      img: monitor,
      title: "Monitor / Display",
      path: "/pc-builder/products?category=MONITOR",
      product: products?.find(p => p.category === "MONITOR") || null,
    },
    {
      img: keyboard,
      title: "Keyboard",
      path: "/pc-builder/products?category=KEYBOARD",
      product: products?.find(p => p.category === "KEYBOARD") || null,
    },
    {
      img: mouse,
      title: "Mouse",
      path: "/pc-builder/products?category=MOUSE",
      product: products?.find(p => p.category === "MOUSE") || null,
    },
    {
      img: headphone,
      title: "Headphone",
      path: "/pc-builder/products?category=HEADPHONE",
      product: products?.find(p => p.category === "HEADPHONE") || null,
    },
  ];

  return { products, setProducts, options };
}
