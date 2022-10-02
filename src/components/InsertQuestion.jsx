import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { supabase } from '../client'
import { QuestionState } from '../database/store'
import Button from "./Button"

const InsertQuestion = () => {
	const setQuestionState = useSetRecoilState(QuestionState)
	const [question, setQuestion] = useState({ statement: '', answer: '' })
	const [mode, setMode] = useState('normal')
	const { statement, answer } = question
	function saveQuestion(){
		async function createQuestion(){
			const { data, error } = await supabase.from('questions').insert([{ statement, answer }]).single()
			setQuestionState( state => [data, ...state])
			cancelInsert()
		}
		createQuestion()
	}
	function cancelInsert(e){
		setQuestion({ statement: '', answer: '' })
		setMode('normal')
	}
	return <div className='question-form'>
		{
			mode == 'insert'
			? <>
				<div className="control">
					<label htmlFor="statement">Pergunta:</label>
					<textarea 
						id="statement" 
						value={statement} 
						onChange={({ target })=>setQuestion({ ...question, statement: target.value })}
					></textarea>
				</div>
				<div className="control">
					<label htmlFor="answer">Resposta:</label>
					<textarea 
						id="answer" 
						value={answer}
						onChange={({ target })=>setQuestion({ ...question, answer: target.value })}
					></textarea>
				</div>
				<button onClick={saveQuestion}>Save question</button>
				<button onClick={cancelInsert}>Cancel</button>
			</>
			: <>
				<button onClick={e => setMode('insert')}>New question</button>
			</>
		}
	</div>
}
export default InsertQuestion