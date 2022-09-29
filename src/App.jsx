import { useState, useEffect } from 'react'
import { supabase } from './client'
import './app.sass'

const Question = ({ question }) => {
	const { id, statement, answer, created_at } = question
	return <div className='question'>
		<div>{id}</div>
		<div>{new Date(created_at).toLocaleString()}</div>
		<div className='statement'>
			<span>Pergunta:</span>
			<p style={{ whiteSpace: 'pre-line' }}>{statement}</p>
		</div>
		<div className='answer'>
			<span>Resposta:</span>
			<p style={{ whiteSpace: 'pre-line' }}>{answer}</p>
		</div>
		<hr/>
	</div>
}

const Questions = ({ questions }) => {
	const [filterText, setFilterText] = useState('')
	let filteredQuestions = questions.filter(question => question.statement.toLowerCase().includes(filterText.toLowerCase()))
	return <div className='questions'>
		<div className='filter'>
			<input type="search" placeholder='Pesquisar' value={filterText} onChange={e => setFilterText(e.target.value)}/>
		</div>
		<div className='summary'>{filteredQuestions.length} perguntas listadas.</div>
		<div className='items'>
			{filteredQuestions.map(question => <Question key={question.id} question={question}/>)}
		</div>
	</div>
}

const InsertQuestion = ({ onChange }) => {
	const [question, setQuestion] = useState({ statement: '', answer: '' })
	const { statement, answer } = question
	const handleClick = e => {
		async function createQuestion(){
			await supabase.from('questions').insert([{ statement, answer }]).single()
			onChange()
			setQuestion({ statement: '', answer: '' })
		}
		createQuestion()
	}
	return <div className='question-form'>
		<div className='field'>
			<label for="statement">Statement</label>
			<textarea id="statement" 
				value={statement}
				onChange={({ target })=>setQuestion({ ...question, statement: target.value })}></textarea>
		</div>
		<div className='field'>
			<label for="answer">Answer</label>
			<textarea id="answer" 
				value={answer} 
				onChange={({ target })=>setQuestion({ ...question, answer: target.value })}></textarea>
		</div>
		<button onClick={handleClick}>Insert new question</button>
	</div>
}

function App() {
	const [questions, setQuestions] = useState([])
	const [update, setUpdate] = useState(false)
	async function getQuestions(){
		let { data: questions, error } = await supabase
			  .from('questions')
			  .select('*')
			.order('id', { ascending: false })
		setQuestions(questions)
	}
	useEffect(()=>{
		getQuestions()
	}, [])
	return (
		<div className="App">
			<h1>Axonifier 3.0</h1>
			<InsertQuestion onChange={e => getQuestions()} />
			<Questions questions={questions} />
		</div>
	)
}
export default App