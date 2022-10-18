import Head from "next/head";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'

export const Contribution = ({item}) => {
	const router = useRouter();

	const [selectedItems, setSelectedItems] = useState([]);
	const [selectedId, setSelectedId] = useState();

	// console.log(selectedItems[0]?.children[0]?.children[1]?.children[1]?.children[0]?.src)

	useEffect(() => {
    setSelectedItems(document.getElementsByClassName("selected"));
		if(window.location.hash) {
			const id = window.location.hash.replace('#','');
			document.getElementById(id)?.classList.add('selected');
			setSelectedId(id)
		} 
  }, []);

	const AddClass = (e) => {
		const oldID = selectedItems[0]?.id;
		document.getElementById(oldID)?.classList.remove("selected");
		
		const id = e.currentTarget.parentElement.id;
		e.currentTarget.parentElement.classList.add('selected');
		router.push('#'+id);
		setSelectedId(id)
  };

	const RemoveClass = (e) => {
		setTimeout(() => {
			const id = selectedItems[0].id;
			selectedItems?.[0].classList.remove("selected");
			// router.push('#'+id);
		}, 100);
  };

  return (
		<>
		<Head>
			<meta property="og:image" content={selectedItems[0]?.children[0]?.children[1]?.children[1]?.children[0]?.src} />
			<meta name="description" content={`${selectedItems[0]?.children[0].children[1].children[0].innerHTML} | ${selectedItems[0]?.children[0].children[2].innerHTML}`} />
			<meta property="og:description" content={`${selectedItems[0]?.children[0].children[1].children[0].innerHTML} | ${selectedItems[0]?.children[0].children[2].innerHTML}`} />
		</Head>
		<div className={`contribution-wrapper ${item.data.black_background ? 'black-bg' : ''}`} id={item.uid}>
			<div className="contribution" onClick={AddClass}>
				<div className='close' onClick={RemoveClass}></div>
				<div className={`wrapper ${item.data.cover_image.url ? 'image-wrapper' : 'text-wrapper'}`}>
					<h2 className={item.data.longtitle ? 'longtitle' : ''}>{item.data.title.toLowerCase()}</h2>
					{item.data.cover_image.url ?
						<div className="image">
							<img src={item.data.cover_image.url}/>
						</div>
					:
						<div className="cross"></div>
					}
				</div>
				<p className="name">{item.data.full_name}</p>
			</div>

			<div className="content">
				<a href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fverticalatlas.vercel.app${router.asPath}`} target="_blank" rel="noopener">
						Share on facebook
				</a>
				<SliceZone slices={item.data.slices} components={components} />
				<div className='endnotes' id="endnotes">
					<PrismicRichText field={item.data.endnotes}/>
				</div>
				<div className='close-bottom' onClick={RemoveClass}></div>
			</div>
		</div>
		</>
  );
};
