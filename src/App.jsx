import { useState, useEffect } from 'react'
import { supabase } from './client'
import './app.sass'
import InsertQuestion from './components/InsertQuestion'
import { RecoilRoot } from 'recoil'
import Questions from './components/Questions'
import SearchQuestion from './components/SearchQuestion'

function App() {
	return (
		<RecoilRoot>
			<div className="app">
				<div className='header'>
					<h1>Axonifier 3.0</h1>
				</div>
				<InsertQuestion />
				<SearchQuestion />
				<Questions />
			</div>
		</RecoilRoot>
	)
}
export default App