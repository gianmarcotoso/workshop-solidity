import React, { useState, useEffect, useRef } from 'react'
import Web3 from 'web3'
import EventExample from '../../../build/contracts/EventExample.json'
import { useForm } from '../hooks/use-form.hook'

const CONTRACT_ADDRESS = '0x203189C7574DDdb5446e877DE45dE561467Ae49D'

export function App() {
	const [web3, setWeb3] = useState(false)
	const [accounts, setAccounts] = useState([])
	const [currentAccount, setCurrentAccount] = useState(null)
	const [balance, setBalance] = useState(0)
	const [contract, setContract] = useState(null)
	const [donationAmount, setDonationAmount] = useState(0)
	const [donations, setDonations] = useState([])
	const [accountNames, onChangeAccountName] = useForm({})
	const donationRef = useRef()

	useEffect(() => {
		const web3 = new Web3('ws://127.0.0.1:8545')
		web3.eth.getAccounts().then(accounts => {
			setAccounts(accounts)
			setCurrentAccount(accounts[0])
		})

		setContract(new web3.eth.Contract(EventExample.abi, CONTRACT_ADDRESS))

		setWeb3(web3)

		donationRef.current = donations
	}, [])

	useEffect(() => {
		if (!contract) {
			return
		}
		contract.events.MoneyReceived({ fromBlock: 0 }).on('data', ev => {
			const { sender, value } = ev.returnValues
			donationRef.current = [...donationRef.current, { sender, value }]
			setDonations(donationRef.current)
		})

		contract.events.DonorNameSet({ fromBlock: 0 }).on('data', ev => {
			const { sender, name } = ev.returnValues

			onChangeAccountName({ [sender]: name })
		})
	}, [contract])

	useEffect(() => {
		if (!web3) {
			return
		}
		web3.eth.getBalance(currentAccount).then(balance => {
			setBalance(balance)
		})
	}, [currentAccount])

	function handleChangeAccountName() {
		contract.methods.setDonorName(accountNames[currentAccount]).send({
			from: currentAccount,
		})
	}

	function handleDonateMoney() {
		contract.methods
			.donate()
			.send({
				from: currentAccount,
				value: donationAmount,
			})
			.then(() => {
				web3.eth.getBalance(currentAccount).then(balance => {
					setBalance(balance)
				})
			})
	}

	if (!web3) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<h1>Eth Playground</h1>
			<p>
				Current Account: {currentAccount} ({(balance * 10e-19).toFixed(2)} ETH)
			</p>
			<label>
				Select Account:{' '}
				<select
					value={currentAccount || ''}
					onChange={e => setCurrentAccount(e.target.value)}
				>
					{accounts.map(a => (
						<option value={a} key={a}>
							{a}
						</option>
					))}
				</select>
			</label>
			<span style={{ marginLeft: 20 }} />
			<label>
				Account Name:{' '}
				<input
					name={currentAccount}
					value={accountNames[currentAccount] || ''}
					onChange={onChangeAccountName}
				/>
				<button onClick={handleChangeAccountName}>Save Account Name</button>
			</label>
			<div>
				<h3>Donate Money</h3>
				<label>Amount (wei):</label>
				<input
					type="text"
					value={donationAmount || 0}
					onChange={e => setDonationAmount(+e.target.value)}
				/>
				<button onClick={handleDonateMoney}>Donate!</button>
			</div>
			<hr />
			<div>
				<h3>Donation List</h3>
				{donations.map((d, i) => (
					<div key={i}>
						<strong>{accountNames[d.sender] || d.sender}</strong> has donated {d.value}{' '}
						wei!
					</div>
				))}
			</div>
		</div>
	)
}
