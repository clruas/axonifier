import { useState, useEffect } from 'react'
import { supabase } from './client'

const Question = ({ question }) => {
	console.log(question)
	const { statement, answer, created_at } = question
	return <div className='question'>
		<div>{new Date(created_at).toLocaleString()}</div>
		<div className='statement'>
			<span>Pergunta:</span>
			<p>{statement}</p>
		</div>
		<div className='answer'>
			<span>Resposta:</span>
			<p>{answer}</p>
		</div>
	</div>
}

const Questions = ({ questions }) => {
	return <div className='questions'>
		{questions.map(question => <Question key={question.id} question={question}/>)}
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