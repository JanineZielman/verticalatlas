import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'

export const Contribution = ({item}) => {
	const router = useRouter();

	const [selectedItems, setSelectedItems] = useState([]);
	const [selectedId, setSelectedId] = useState();

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
			router.push('#'+id);
		}, 100);
  };

  return (
		<div className={`contribution-wrapper ${item.data.black_background ? 'black-bg' : ''}`} id={item.uid}>
			<div className="contribution" onClick={AddClass}>
				<div className='close' onClick={RemoveClass}></div>
				<div className="wrapper">
					<h2 className={item.data.longtitle ? 'longtitle' : ''}>{item.data.title.toLowerCase()}</h2>
					{item.data.cover_image.url &&
						<div className="image">
							<img src={item.data.cover_image.url}/>
						</div>
					}
				</div>
				<p className="name">{item.data.full_name}</p>
			</div>

			<div className="content">
				<SliceZone slices={item.data.slices} components={components} />
				<div className='endnotes' id="endnotes">
					<PrismicRichText field={item.data.endnotes}/>
				</div>
			</div>
		</div>
  );
};
