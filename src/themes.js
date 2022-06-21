import { createGlobalStyle } from 'styled-components';

export function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

export var user_settings = null;
var default_values = {
  "profile":{
    "refresh_interval": 60
  },
}
try {
  user_settings = JSON.parse(localStorage.getItem("user")) || localStorage.setItem("user", JSON.stringify(default_values));
  if(Object.entries(user_settings).length !== Object.entries(default_values).length){
  	localStorage.setItem("user", JSON.stringify(default_values))
  }
} catch(err) {
  console.log(err);
}

export const lightTheme = {
  body: '#d9d9d9',
  fontColor: "black",
  linksFontColor: "#B369DB",
  title1FontColor: "white",
  title2FontColor: "white",
  contentBack: "#6f7085",
}

export const darkTheme = {
  body: '#282c34',
  fontColor: "white",
  linksFontColor: "#91DB69",
  title1FontColor: "#91DB69",
  title2FontColor: "#B369DB",
  contentBack: "#4c4c60",
}

export const GlobalStyles = createGlobalStyle`
	html {
		background: ${props => props.theme.body};
		color: ${props => props.theme.fontColor};
	}
	.App-header {
		color: ${props => props.theme.fontColor};		
	}
	.App-footer {
		color: ${props => props.theme.footerFontColor};
	}
	.title_1 {
		color: ${props => props.theme.title1FontColor};				
	}
	.title_2 {
		color: ${props => props.theme.title2FontColor};				
	}
	.App-link {
		color: ${props => props.theme.linksFontColor};				
	}
  .content_list, .content_stats{
    background: ${props => props.theme.contentBack};
  }
`
