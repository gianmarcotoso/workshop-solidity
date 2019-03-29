import base from '@mdx-deck/themes/src/base'
import syntax from '@mdx-deck/themes/src/syntax-highlighter'

const white = '#fffaf0'
const black = '#11111f'
const blue = '#2d5dd7'

export default {
	...base,
	...syntax,
	font: '"Crimson Text", serif',
	colors: {
		text: black,
		background: white,
		link: blue,
		code: '#333334',
	},
	css: {
		boxSizing: 'border-box',
		textAlign: 'center',
		fontSize: '1.5em',
		'@media screen and (min-width:64em)': {
			fontSize: '3em',
		},
		'& .Slide > div': {
			minWidth: '80vw',
			minHeight: '60vh',
		},
	},
	blockquote: {
		backgroundColor: '#eee',
		color: '#333',
		fontStyle: 'italic',
		borderLeft: '10px solid #ccc',
	},
	ul: {
		marginLeft: 20,
		'& > li > code': {
			color: '#33338a !important',
			fontWeight: 'bold',
		},
	},
}
