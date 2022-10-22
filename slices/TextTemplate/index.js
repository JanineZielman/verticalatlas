import React, { useEffect, useState } from 'react'
import { PrismicRichText } from '@prismicio/react'

const TextTemplate = ({ slice }) => {

  function toggleClass(e) {
    var element = document.getElementById(e.currentTarget.id);
    element.classList.toggle("toggle");
  }

  useEffect(() => {
    const boldText = document.querySelectorAll('strong');
    let id = '';
    if(window.location.hash) {
			id = window.location.hash.replace('#','');
		} 
    boldText.forEach(function(element, index) {       
      // const number = element.innerHTML.match(/\b([0-9]|[1-9][0-9])\b/)?.[0];
      const number = element.innerHTML.match(/\d/g)?.[0];
      const numberDot = element.innerHTML.match(/^[0-9]*\./)
      const chinese = element.innerHTML.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/);
      if (number) {
        if(!chinese){
          if(!numberDot){
            element.classList.add('footnote')
            element.onclick = function() { 
              window.scrollTo({
                top: document.getElementById(id).clientHeight + document.getElementById(id).offsetTop - window.innerHeight,
                left: 0,
                behavior: 'smooth'
              });
            };
          }
        }
      } else {
        if(!chinese){
          element.classList.add('subtitle');
        }
        
      }
      if(numberDot){
        element.classList.add('subtitle');
      }
    })
  })



  return(
    <section className='text-template' id={slice.id}>
      {slice.items.map((item, i) => {
        const size = item.image_size
        return(
          <div key={`text-template-item-${i}`} className="content-wrapper">
            {item.image.url &&
              <div className='thumbnail' id={`${item.image.url}-${i}`} onClick={toggleClass}>
                <img src={item.image[size]?.url ? item.image[size].url : item.image.url}/>
                {item.image_caption[0] &&
                  <div className='caption'>
                    <PrismicRichText field={item.image_caption}/>
                  </div>
                }
              </div>
            }
            {item.text[0] &&
              <div className='text'>
                <PrismicRichText field={item.text}/>
              </div>
            }
            {item.quote[0] &&
              <div className='text quote'>
                <PrismicRichText field={item.quote}/>
              </div>
            }
          </div>
        )
      })}
    </section>
  )
}

export default TextTemplate