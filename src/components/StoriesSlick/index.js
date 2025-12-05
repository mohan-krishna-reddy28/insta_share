import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const StoriesSlick = props => {
  const {storiesArray} = props
  return (
    <ul className="slider-container">
      <Slider {...settings}>
        {storiesArray.map(each => {
          const {userId, userName, storyUrl} = each
          return (
            <li className="slick-item" key={userId}>
              <img className="logo-image" src={storyUrl} alt="user story" />
              <p className="story-user-name">{userName}</p>
            </li>
          )
        })}
      </Slider>
    </ul>
  )
}

export default StoriesSlick
