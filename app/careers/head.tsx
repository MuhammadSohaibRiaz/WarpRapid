export default function Head() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RapidNexTech",
    url: "https://rapidnextech.com",
    sameAs: ["https://www.linkedin.com/company/rapidnextech"],
    logo: "https://rapidnextech.com/logo.png",
    description:
      "RapidNexTech is a software development company offering web, mobile, AI, and automation solutions.",
    hiringOrganization: {
      "@type": "Organization",
      name: "RapidNexTech",
      sameAs: "https://rapidnextech.com/careers",
    },
  }

  return (
    <>
      <title>Careers at RapidNexTech | Join Our Remote Software Team</title>
      <meta
        name="description"
        content="Join RapidNexTech — a remote-first, innovation-driven team building next-gen web, mobile, and AI solutions."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  )
}
