import { slides as blockchain } from './blockchain.mdx'
import { slides as ethereum } from './ethereum.mdx'
import { slides as solidity } from './solidity.mdx'
import { slides as security } from './security.mdx'
import { slides as coding } from './coding.mdx'
import { slides as intro } from './intro.mdx'
import { slides as outro } from './outro.mdx'

export { default as theme } from './theme'

export const slides = [
	...intro,
	...blockchain,
	...ethereum,
	...solidity,
	...coding,
	...security,
	...outro,
]
