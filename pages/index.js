import Head from "next/head";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Contribution } from "../components/Contribution";


const Index = ({ contributions, navigation, settings }) => {
  console.log(contributions)
  return (
    <Layout
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>
      <div className="contributions">
        {contributions.map((item, i) => {
          return(
            <Contribution item={item} key={`contribution-${i}`}/>
          )
        })}
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const contributions = await client.getAllByType("contribution", {
    orderings: [
      { field: "my.contribution.order", direction: "asc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      contributions,
      navigation,
      settings,
    },
  };
}
