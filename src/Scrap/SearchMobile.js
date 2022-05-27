import React from 'react'
import "../../styles/searchmobile.css"
export default function SearchMobile({setMobileSearchModal}) {
    return (
        <>
            	
         
		{/*
		=========================================
			SEARCH CONTENT INNER
		=========================================
		*/}
		<div className="search_row search-button" onClick={()=>setMobileSearchModal(true)}>
			<form>
				<div className="search-box">
				<input type="text" placeholder="Aodour Search ..."/>
				<i className="icon-search"></i>
				</div>
			</form>
		</div>
		{/*
		=========================================
			SEARCH CONTENT INNER ENDS
		=========================================
		*/}
	
        </>
    )
}
