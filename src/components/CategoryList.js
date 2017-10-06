import React from 'react'

export default function CategoryList ({ categories }) {
  
  return (
      <ul className='category-list'>
       {categories.map((category) => (
          <li key={category}>
             {category}
           </li>
       	))}
      </ul>
  )
}