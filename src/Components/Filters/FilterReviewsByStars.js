

import React from 'react';


const FilterReviewsByStars = props => {

    return (
        <div>
            <label>Minimum Review Rating:</label>
            <div>      
                <select name="typeMinStars" value={props.typeMinStars} onChange={(e) => props.setTypeMinStars(e.target.value)}>
                    <option selected value="noMinStars">No Minimum Rating</option>
                    <option value="0">Zero Stars</option>
                    <option value="1">One Star</option>
                    <option value="2">Two Stars</option>
                    <option value="3">Three Stars</option>
                    <option value="4">Four Stars</option>
                    <option value="5">Five Stars</option>
                </select>
            </div>
            <label>Maximum Review Rating:</label>
            <div>      
                <select name="typeMaxStars" value={props.typeMaxStars} onChange={(e) => props.setTypeMaxStars(e.target.value)}>
                    <option selected value="noMaxStars">No Maximum Rating</option>
                    <option value="0">Zero Stars</option>
                    <option value="1">One Star</option>
                    <option value="2">Two Stars</option>
                    <option value="3">Three Stars</option>
                    <option value="4">Four Stars</option>
                    <option value="5">Five Stars</option>
                </select>
            </div>
        </div>
    )

}
  
  export default FilterReviewsByStars;
  