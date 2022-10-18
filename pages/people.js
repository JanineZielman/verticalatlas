import Head from "next/head";
import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Person } from "../components/Person";


const Index = ({ page, people, navigation, settings }) => {
  return (
    <Layout
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
        <meta name="description" content={prismicH.asText(settings.data.description)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={prismicH.asText(settings.data.name)} />
        <meta property="og:description" content={prismicH.asText(settings.data.description)} />
      </Head>
      <div className="people">
				<h1>{page.data.title}</h1>
				<div className="people-flex">
					{people.map((item, i) => {
						return(
							<Person item={item} key={`person-${i}`}/>
						)
					})}
				</div>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const people = await client.getAllByType("person", {
    orderings: [
      { field: "my.person.order", direction: "asc" },
    ],
  });
	const page = await client.getSingle("people");
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
			page,
      people,
      navigation,
      settings,
    },
  };
}
