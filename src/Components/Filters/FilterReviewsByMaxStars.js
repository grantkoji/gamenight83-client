import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import ReactStars from 'react-rating-stars-component'

const FilterReviewsByMaxStars = props => {
  
    // minNumStars={minNumStars}
    // maxNumStars={maxNumStars}
    // setMaxNumStars={setMinNumStars}
    // setMaxNumStars={setMaxNumStars}

      const ratingChanged = (newRating) => {
          props.setMaxNumStars(newRating);
      };

     
      const optionsMax = [
        { key: 0, text: 'No Maximum Rating', value: "noMaxStars" },
        { key: 1, text: <ReactStars count={5} value={props.maxNumStars} onChange={ratingChanged} size={18} />, value: 'yesMaxStars' }
      ]
    
    return (
        <div>
            <div>
              <label className='sort-reviews-label'>Maximum Review Rating</label>
            </div>
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
  
  export default FilterReviewsByMaxStars;