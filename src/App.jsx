import { RecoilRoot } from 'recoil'
import InsertQuestion from './components/InsertQuestion'
import Questions from './components/Questions'
import SearchQuestion from './components/SearchQuestion'
import './app.sass'

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