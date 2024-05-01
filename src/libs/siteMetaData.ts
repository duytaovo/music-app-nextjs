const siteMetadata = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return {
    title,
    author: "DuyTaoDev",
    headerTitle: "Music App",
    description,
    language: "vi-ve",
    theme: "system", // system, dark or light
    siteUrl: process.env.NEXTAUTH_URL, // your website URL
    locale: "vi-ve",
  };
};

export default siteMetadata;

