import React from "react";

const Footer = (  ) => {
	return (
	<div id="box" 
        style={{ 
            clear: "both",
            position: "absolute",
            bottom: "0",
            padding: "0.5rem",
            backgroundColor: "#000000",
            width: "100%",
        }
    }>
    <h1  style={{ 
        color: "white",
				textAlign: "center",
                margin: "0",
                fontSize: "1rem"
                 }}>
		<small>&copy; 2023 | Created by Tarik Ozturk</small>
	</h1>
	</div>
);
};
export default Footer;