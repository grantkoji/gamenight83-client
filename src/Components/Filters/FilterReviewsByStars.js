

import React, {useEffect, useState} from 'react';
import { Dropdown, Menu, Label } from 'semantic-ui-react'
import ReactStars from 'react-rating-stars-component'

const FilterReviewsByStars = props => {
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
      const ratingChanged = (newRating) => {
        props.setNumStars(newRating);
      };
      let [starsClicked, setStarsClicked] = useState(0)
        const optionsMin = [
        { key: 0, text: 'No Minimum Rating', value: "noMinStars" },
        { key: 1, text: <ReactStars count={5} value={props.numStars} onChange={ratingChanged} size={18} />, value: 'yesMinStars' }
      ]


      // useEffect(()=> {
      //   setStarsClicked(props.numStars)
      // }, [props.numStars])
  
    // <label htmlFor="numStars">Number of Stars:</label><br/>
    // <input type="number" autoComplete="off" name="numStars" value={numStars} onChange={(e) => setNumStars(e.target.value)}/><br/>


      const optionsMax = [
        { key: 0, text: 'No Maximum Rating', value: "noMaxStars" },
        { key: 1, text: 'Zero Stars', value: "0" },
        { key: 2, text: 'One Star', value: "1" },
        { key: 3, text: 'Two Stars', value: "2" },
        { key: 4, text: 'Three Stars', value: "3" },
        { key: 5, text: 'Four Stars', value: "4" },
        { key: 6, text: 'Five Stars', value: "5" },
      ]

    
    return (
        <div>
            <Label>Minimum Review Rating:</Label>
              <Menu compact>
                <Dropdown 
                    placeholder='Number of Stars'
                    options={optionsMin} 
                    simple item 
                    onChange={(e, data) => props.setTypeMinStars(data.value)}/>
            </Menu>
            <Label>Maximum Review Rating:</Label>
              <Menu compact>
                <Dropdown 
                    placeholder='Number of Stars'
                    options={optionsMax} 
                    simple item 
                    onChange={(e, data) => props.setTypeMaxStars(data.value)}/>
            </Menu>
            
        </div>
    )

    

}
  
  export default FilterReviewsByStars;
  