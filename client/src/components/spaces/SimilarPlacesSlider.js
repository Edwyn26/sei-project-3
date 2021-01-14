import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { getAllSpaces } from '../lib/api'



function SimilarPlacesSlider ({ space }) {

  // const { id } = useParams()
  
  const [spaces, setSpaces] = React.useState([])
  // const [hasError, setHasError] = React.useState(false)
  

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true
  }

  React.useEffect(() => {
    const getSpaces = async () => {
      try {
        const { data } = await getAllSpaces()
        setSpaces(data)
      } catch (err) {
        console.log(err)
      }
    }
    getSpaces()
  }, [])
  // console.log(spaces)



  const similarPlaces = []
  const filteredSimilarPlaces = []

  const addSimilarPlaces = () => {
    if (space.tags) {
      const filterSpaces = () => spaces.filter(item=> {
        if (item.tags.includes(space.tags[0])) {
          return similarPlaces.push(item)
        }
      })
      filterSpaces()
    }
  }
  
  addSimilarPlaces()
  // console.log(similarPlaces)

  // const filterSimilarPlaces = () => {
  //   if (space.tags) {
  //     for (let i = 0; i <= 3; i++) {
  //       const randomIndex = Math.floor(Math.random() * similarPlaces.length)
  //       filteredSimilarPlaces.push(similarPlaces[randomIndex])
  //     }
  //   }
  // }
  
  // filterSimilarPlaces()

  // const [filteredSimilarPlaces, setFilteredSimilarPlaces] = React.useState([])

  const filterSimilarPlaces = () => {
    // const currentChoices = [] // empty array 
    if (space.tags) {
      for (let i = 0; i <= 5; i++) {
        const randomIndex = similarPlaces[Math.floor(Math.random() * similarPlaces.length)]
        console.log(randomIndex)
        if (!filteredSimilarPlaces.includes(randomIndex) && (filteredSimilarPlaces.length < 3)){
          filteredSimilarPlaces.push(randomIndex)
        }
      }
    
    }
  }

  filterSimilarPlaces()

  // console.log(filteredSimilarPlaces)


  // console.log(filteredSimilarPlaces)



  // console.log(recommendedSpaces)

  // filter spaces
  // if the spaces have favourite tags 

  // const randomIndex = Math.floor(Math.random() * 8)

  // const randomIndex = Math.floor(Math.random() * recommendedSpaces.length)
      
  



  return (
    <>
      <h2 className="featured-list">{'Similar Places'}</h2>
      {spaces ?
        <div className="slider-container">
          <Slider {...settings}>
            {filteredSimilarPlaces.map(item => (
              <div key={item.name} className="similar-slider-tag">
                <Link to={`/spaces/${item._id}`}>
                  <div className="card">
                    <div className="ui-card img-wrapper">
                      <img className="images" src={item.image} />
                    </div>     
                  </div>
                </Link>
              </div>
          
            ))
            }
          </Slider>
        </div>
        :
        <h2 className="title has-text-centered">
          ...Loading
        </h2>
      }
    </>
  )
}

export default SimilarPlacesSlider