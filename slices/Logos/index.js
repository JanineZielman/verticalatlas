import React from 'react'
import { PrismicRichText } from '@prismicio/react'

const Logos = ({ slice }) => {
  return(
    <section className='logo-section'>
      <h1>{slice.primary.title}</h1>
      <div className='logos'>
        {slice.items.map((item, i) => {
          return(
            <div className='logo' key={`logo${i}`}>
              <img src={item.image.url}/>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Logos