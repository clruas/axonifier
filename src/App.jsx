import { RecoilRoot } from 'recoil'
import InsertQuestion from './components/InsertQuestion'
import Questions from './components/Questions'
import SearchQuestion from './components/SearchQuestion'
import './app.sass'

/*
[ ] adicionar categoria, tema e nivel da pergunta
[ ] opção de editar perguntas
[ ] inserir sumario de perguntas (quantidade de perguntas listadas)
*/

function App() {
	return (
		<RecoilRoot>
			<div className="app">
				<div className='header'>
					Axonifier 3.0
				</div>
				<InsertQuestion />
				<SearchQuestion />
				<Questions />
			</div>
		</RecoilRoot>
	)
}
export default App