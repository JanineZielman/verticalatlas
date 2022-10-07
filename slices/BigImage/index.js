import React from 'react'
import { PrismicRichText } from '@prismicio/react'

const BigImage = ({ slice }) => {
  function zoom(e){
    var zoomer = e.currentTarget;
    const pos = e.currentTarget.getBoundingClientRect();

    var x = (e.clientX - pos.left) / 16;
    var y = (e.clientY - pos.top) / 10;

    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }


  return(
    <section className='big-image'>
      <div className="image-zoom" onMouseMove={zoom} style={{ 'background-image': `url(${slice.primary.image.url})` }}>
        <img src={slice.primary.image.url} />
      </div>
      {slice.primary.caption &&
        <div className='caption'>
          <PrismicRichText field={slice.primary.caption}/>
        </div>
      }
    </section>
  )
}

export default BigImage