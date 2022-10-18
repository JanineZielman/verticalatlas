import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from '@prismicio/react'

import { createClient, linkResolver } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";

const Page = ({ page, navigation, settings }) => {
  return (
    <Layout navigation={navigation} settings={settings}>
      <Head>
        <title>
          {page.data.title} |{" "}
          {prismicH.asText(settings.data.name)}
        </title>
        <meta name="description" content={prismicH.asText(settings.data.description)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={prismicH.asText(settings.data.name)} />
        <meta property="og:description" content={prismicH.asText(settings.data.description)} />
      </Head>
      <div className="page">
        <div className="container">
          {page.data.title && <h1>{page.data.title}</h1>}
          {page.data.text && <PrismicRichText field={page.data.text}/>}
          {page.data.image?.url && 
            <div className="page-image">
              <img src={page.data.image?.url}/>
            </div>
          }
          <br/>
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => prismicH.asLink(page, linkResolver)),
    fallback: false,
  };
}
