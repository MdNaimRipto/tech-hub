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
import { IPcBuildCard } from "@/types/pc-buildTypes/PcBuildTypes";

interface IOption {
  img: any;
  title: string;
  path: string;
  product?: IPcBuildCard | null;
  required: boolean;
}

export function PcBuilderOptions() {
  const [products, setProducts] = useState<IPcBuildCard[]>([]);

  // Check if running in the browser environment
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedProducts = window.localStorage.getItem("pc-builder-products");
      const allProducts = storedProducts ? JSON.parse(storedProducts) : [];
      setProducts(allProducts);
    }
  }, []);

  const options: IOption[] = [
    {
      img: cpu,
      title: "Processor / CPU",
      path: "/pc-builder/products?category=CPU",
      product: products.find(p => p.category === "CPU") || null,
      required: true,
    },
    {
      img: cooler,
      title: "CPU Cooler",
      path: "/pc-builder/products?category=COOLER",
      product: products?.find(p => p.category === "COOLER") || null,
      required: false,
    },
    {
      img: motherboard,
      title: "Motherboard",
      path: "/pc-builder/products?category=MOTHERBOARD",
      product: products?.find(p => p.category === "MOTHERBOARD") || null,
      required: true,
    },
    {
      img: ram,
      title: "Ram",
      path: "/pc-builder/products?category=RAM",
      product: products?.find(p => p.category === "RAM") || null,
      required: true,
    },
    {
      img: storage,
      title: "Storage / HDD or SSD",
      path: "/pc-builder/products?category=STORAGE",
      product: products?.find(p => p.category === "STORAGE") || null,
      required: true,
    },
    {
      img: psu,
      title: "Power Supply",
      path: "/pc-builder/products?category=PSU",
      product: products?.find(p => p.category === "PSU") || null,
      required: true,
    },
    {
      img: gpu,
      title: "Graphics Card",
      path: "/pc-builder/products?category=GPU",
      product: products?.find(p => p.category === "GPU") || null,
      required: false,
    },
    {
      img: casing,
      title: "Casing",
      path: "/pc-builder/products?category=CASING",
      product: products?.find(p => p.category === "CASING") || null,
      required: true,
    },
    {
      img: monitor,
      title: "Monitor / Display",
      path: "/pc-builder/products?category=MONITOR",
      product: products?.find(p => p.category === "MONITOR") || null,
      required: false,
    },
    {
      img: keyboard,
      title: "Keyboard",
      path: "/pc-builder/products?category=KEYBOARD",
      product: products?.find(p => p.category === "KEYBOARD") || null,
      required: false,
    },
    {
      img: mouse,
      title: "Mouse",
      path: "/pc-builder/products?category=MOUSE",
      product: products?.find(p => p.category === "MOUSE") || null,
      required: false,
    },
    {
      img: headphone,
      title: "Headphone",
      path: "/pc-builder/products?category=HEADPHONE",
      product: products?.find(p => p.category === "HEADPHONE") || null,
      required: false,
    },
  ];

  return { products, setProducts, options };
}
