import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { supabase } from '../client'
import { QuestionState, SearchQuestionState } from "../database/store"

const Question = ({ question }) => {
	const [questions, setQuestions] = useRecoilState(QuestionState)
	const { id, statement, answer, created_at } = question
	function removeQuestion(){
		async function remove(){
			const { data, error } = await supabase
				.from('questions')
				.delete()
				.eq('id', id)
			const newQuestions = questions.filter(quest => quest.id != data.id)
			setQuestions(newQuestions)
		}
		remove()
	}
	return <div className='question'>
		<div>#{id}</div>
		<div>{new Date(created_at).toLocaleString()}</div>
		<div className='statement'>
			<span>Pergunta:</span>
			<p style={{ whiteSpace: 'pre-line' }}>{statement}</p>
		</div>
		<div className='answer'>
			<span>Resposta:</span>
			<p style={{ whiteSpace: 'pre-line' }}>{answer}</p>
		</div>
		<div className="actions">
			<button onClick={removeQuestion}>Remove</button>
		</div>
	</div>
}

const Questions = () => {
    const [questions, setQuestions] = useRecoilState(QuestionState)
    const searchText = useRecoilValue(SearchQuestionState)
    let filteredQuestions = questions.filter(question => question.statement.toLowerCase().includes(searchText.toLowerCase()))
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

    return <div className="questions">
		{filteredQuestions.map(question => <Question key={question.id} question={question}/>)}
    </div>
}
export default Questions