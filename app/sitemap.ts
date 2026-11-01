import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.dedikusniadi.my.id", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://www.dedikusniadi.my.id/#about", lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: "https://www.dedikusniadi.my.id/#case-studies", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://www.dedikusniadi.my.id/#experience", lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: "https://www.dedikusniadi.my.id/#contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}