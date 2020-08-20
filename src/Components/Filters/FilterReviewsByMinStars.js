import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import ReactStars from 'react-rating-stars-component'

const FilterReviewsByMinStars = props => { 

      const ratingChanged = (newRating) => {
        props.setMinNumStars(newRating);    
      };
    
        const optionsMin = [
        { key: 0, text: 'No Minimum Rating', value: "noMinStars" },
        { key: 1, text: <ReactStars count={5} value={props.minNumStars} onChange={ratingChanged} size={18} />, value: 'yesMinStars' }
      ]


    
    return (
        <div>
            <div>
              <label className='sort-reviews-label'>Minimum Review Rating</label>
            </div>
              <Menu compact>
                <Dropdown 
                    placeholder='Number of Stars'
                    options={optionsMin} 
                    simple item 
                    onChange={(e, data) => props.setTypeMinStars(data.value)}/>
            </Menu>
        </div>
    )

    

}
  
  export default FilterReviewsByMinStars;
  

    // const optionsMin = [
    //     { key: 0, text: 'No Minimum Rating', value: "noMinStars" },
    //     { key: 1, text: 'Zero Stars', value: "0" },
    //     { key: 2, text: 'One Star', value: "1" },
    //     { key: 3, text: 'Two Stars', value: "2" },
    //     { key: 4, text: 'Three Stars', value: "3" },
    //     { key: 5, text: 'Four Stars', value: "4" },
    //     { key: 6, text: 'Five Stars', value: "5" },
    //     { key: 7, text: <ReactStars count={5} value={5} rating={5} size={18} />}
    //   ]

 // let [starsClicked, setStarsClicked] = useState(0)
      // useEffect(()=> {
      //   setStarsClicked(props.numStars)
      // }, [props.numStars])
  
    // <label htmlFor="numStars">Number of Stars:</label><br/>
    // <input type="number" autoComplete="off" name="numStars" value={numStars} onChange={(e) => setNumStars(e.target.value)}/><br/>


      // const optionsMax = [
      //   { key: 0, text: 'No Maximum Rating', value: "noMaxStars" },
      //   { key: 1, text: 'Zero Stars', value: "0" },
      //   { key: 2, text: 'One Star', value: "1" },
      //   { key: 3, text: 'Two Stars', value: "2" },
      //   { key: 4, text: 'Three Stars', value: "3" },
      //   { key: 5, text: 'Four Stars', value: "4" },
      //   { key: 6, text: 'Five Stars', value: "5" },
      // ]