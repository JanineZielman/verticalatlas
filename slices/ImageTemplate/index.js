import React from 'react'
import { PrismicRichText } from '@prismicio/react'

const ImageTemplate = ({ slice }) => (
  <section className='image-template'>
    {slice.items.map((item, i) => {
      const size = item.image_size
      return(
        <div key={`image-template-item-${i}`} className="content-wrapper">
          {item.image.url &&
            <img src={item.image[size]?.url ? item.image[size].url : item.image.url}/>
          }
        </div>
      )
    })}
    {slice.primary.text[0] &&
      <div className='text-wrapper'>
        <PrismicRichText field={slice.primary.text}/>
      </div>
    }
  </section>
)

export default ImageTemplate