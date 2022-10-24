import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import React, {useEffect, useState} from "react";
import Modal from 'react-modal';


export const Header = ({navigation, settings}) => {
  
  const customStyles = {
		content: {
			top: '-1px',
			left: '-1px',
			right: 'auto',
			bottom: 'auto',
			width: '250px',
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
    window?.addEventListener('scroll', scrollPlay)

    // const vid = document.getElementById('v0'); 
    // vid.pause(); 
    
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
          {navigation.data?.links.map((item, i) => (
            <div key={`link${i}`}>
              <a href={item.link.uid}>
                <PrismicText field={item.label} />
              </a>
            </div>
          ))}
          <div className="extra-links">
            {settings.data.links.map((item, i) => (
              <a href={item.link.uid} key={`link${i}`}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="socials">
            {settings.data.socials.map((social, i) => (
              <a href={social.link.url} target="_blank" rel="noreferrer" key={`social${i}`}>
                <img src={social.icon.url}/>
              </a>
            ))}
          </div>
        </nav>
      </Modal>
      <div className="scroll-bound">
        <div className="scroll-wrapper">
          <p>Vertical Atlas</p>
          <video id="v0" width="600" height="100" muted>
            <source src="/scroll.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
    </div>
  );
};
