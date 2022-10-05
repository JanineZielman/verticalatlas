import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import React, {useEffect} from "react";
import Modal from 'react-modal';


export const Header = ({navigation, settings}) => {
  
  const customStyles = {
		content: {
			top: '-1px',
			left: '-1px',
			right: 'auto',
			bottom: 'auto',
			width: '600px',
			height: '100vh',
			backgroundColor: '#FDFBDA',
			zIndex: '999',
		},
	};

	const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

	function closeAfterClick(){
		setTimeout(setIsOpen(false), 3000);
	}

  return (
    <div className="header">
      <div onClick={openModal} className="hamburger"></div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={500}
      >
        <nav>
          <div className="close" onClick={closeModal}></div>
          <div>
            <PrismicLink href="/">
              <PrismicText field={navigation.data.homepageLabel} />
            </PrismicLink>
          </div>
          {navigation.data?.links.map((item) => (
            <div key={item}>
              <PrismicLink field={item.link}>
                <PrismicText field={item.label} />
              </PrismicLink>
            </div>
          ))}
        </nav>
      </Modal>
    </div>
  );
};
