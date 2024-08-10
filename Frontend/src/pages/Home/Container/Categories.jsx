import React from "react";
import images from "../../../constants/images";

const categories = [
  {
    id: 1,
    title: "Elbise",
    subtitle: "Elbise",
    image: images.bir,
    link: "#",
  },
  {
    id: 2,
    title: "Pantolon",
    subtitle: "Pantolon",
    image: images.iki,
    link: "#",
  },
  {
    id: 3,
    title: "Ayakkabı",
    subtitle: "Ayakkabı",
    image: images.üç,
    link: "#",
  },
  {
    id: 4,
    title: "Bikini",
    subtitle: "Bikini",
    image: images.dört,
    link: "#",
  },
  {
    id: 5,
    title: "Çocuk Giyim",
    subtitle: "Çocuk Giyim",
    image: images.beş,
    link: "#",
  },
  {
    id: 6,
    title: "Evcil Hayvan",
    subtitle: "Evcil Hayvan",
    image: images.altı,
    link: "#",
  },
  {
    id: 7,
    title: "Kozmetik",
    subtitle: "Kozmetik",

    image: images.yedi,
    link: "#",
  },
  {
    id: 8,
    title: "Çanta",
    subtitle: "Çanta",

    image: images.sekiz,
    link: "#",
  },
  {
    id: 9,
    title: "Gözlük",
    subtitle: "Gözlük",
    image: images.dokuz,
    link: "#",
  },
  {
    id: 10,
    title: "Takı",
    subtitle: "Takı",
    image: images.on,
    link: "#",
  },
];

const CategoryCard = ({ category }) => {
  return (
    <a
      href={category.link}
      className="flex flex-col justify-between bg-white rounded-lg shadow-md overflow-hidden"
      style={{ textDecoration: "none" }}
    >
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{category.subtitle}</h3>
        <p className="text-sm text-gray-500">{category.dateRange}</p>
        <p className="text-lg font-semibold mt-2">{category.title}</p>
      </div>
    </a>
  );
};

const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

const Categories = () => {
  return (
    <section className="flex flex-col container mx-auto px-5 py-10">
      <CategoriesGrid />
    </section>
  );
};

export default Categories;
