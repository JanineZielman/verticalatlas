import React from 'react'
import { PrismicRichText } from '@prismicio/react'

const TextTemplate = ({ slice }) => {
  return(
    <section className='text-template'>
      {slice.items.map((item, i) => {
        const size = item.image_size
        return(
          <div key={`text-template-item-${i}`} className="content-wrapper">
            {item.image.url &&
              <img src={item.image[size]?.url ? item.image[size].url : item.image.url}/>
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