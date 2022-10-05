import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import { PrismicRichText } from '@prismicio/react'

export const Person = ({item}) => {
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
		<div className={`person-wrapper`} id={item.uid}>
			<div className="person" onClick={AddClass}>
				<div className='close' onClick={RemoveClass}></div>
				<div className="wrapper">
					<h2>{item.data.full_name}</h2>
				</div>
				<p className="role">{item.data.role}</p>
				<div className="content">
					<PrismicRichText field={item.data.bio}/>
				</div>
			</div>
		</div>
  );
};
