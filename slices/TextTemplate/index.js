import React, { useEffect, useState } from 'react'
import { PrismicRichText } from '@prismicio/react'
import { useRouter } from 'next/router';

const TextTemplate = ({ slice }) => {
  const router = useRouter();
  function toggleClass(e) {
    var element = document.getElementById(e.currentTarget.id);
    element.classList.toggle("toggle");
  }

  useEffect(() => {
    const boldText = document.querySelectorAll('strong');
    boldText.forEach(function(element, index) {       
      const number = element.innerHTML.match(/\b([0-9]|[1-9][0-9])\b/)?.[0];
      if (number) {
        element.classList.add('footnote')
        element.onclick = function() { 
          window.scrollTo({
            top: document.getElementById(element.parentElement.parentElement.parentElement.parentElement.id).scrollHeight + document.getElementById(element.parentElement.parentElement.parentElement.parentElement.id).offsetTop,
            left: 0,
            behavior: 'smooth'
          });
        };
      }
    })
  }, [])



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