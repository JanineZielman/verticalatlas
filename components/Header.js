import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import React, {useEffect, useState} from "react";
import Modal from 'react-modal';


export const Header = ({navigation, settings}) => {

  const [scrollPos, setScrollPos] = useState(null)
  
  const customStyles = {
		content: {
			top: '-1px',
			left: '-1px',
			right: 'auto',
			bottom: 'auto',
			width: '300px',
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

  useEffect(() => {
    window.addEventListener('scroll', scrollPlay)

    const vid = document.getElementById('v0'); 
    vid.pause(); 

    scrollPos =  window.pageYOffset;


    function scrollPlay(){  
      var body = document.body;
      var html = document.documentElement;

      var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
      const vid = document.getElementById('v0'); 
      var scrollIndex = (height - window.innerHeight) / vid.duration;
      var frameNumber  = window.pageYOffset / scrollIndex * 1.2;
      vid.currentTime  = frameNumber;
    }
  }, []);

  




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
      <div className="scroll-bound">
        <div className="scroll-wrapper">
          <p>Vertical Atlas</p>
          <video id="v0" width="600" height="100" muted autoPlay>
            <source src="/scroll.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
    </div>
  );
};
