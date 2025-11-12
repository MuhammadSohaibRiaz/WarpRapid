export default function Head() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RapidXTech",
    url: "https://rapidxtech.com",
    sameAs: ["https://www.linkedin.com/company/rapidxtech"],
    logo: "https://rapidxtech.com/logo.png",
    description:
      "RapidXTech is a software development company offering web, mobile, AI, and automation solutions.",
    hiringOrganization: {
      "@type": "Organization",
      name: "RapidXTech",
      sameAs: "https://rapidxtech.com/careers",
    },
  }

  return (
    <>
      <title>Careers at RapidXTech | Join Our Remote Software Team</title>
      <meta
        name="description"
        content="Join RapidXTech — a remote-first, innovation-driven team building next-gen web, mobile, and AI solutions."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  )
}
