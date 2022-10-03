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
			const newQuestions = questions.filter(quest => quest.id != id)
			setQuestions(newQuestions)
		}
		remove()
	}
	return <div className='question'>
		<div className='statement'>
			<p style={{ whiteSpace: 'pre-line' }}>{statement}</p>
		</div>
		<div className='answer'>
			<p style={{ whiteSpace: 'pre-line' }}>{answer}</p>
		</div>
		<div className="actions">
			<div>#{id}</div>
			<div>{new Date(created_at).toLocaleString()}</div>
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
		<div className="summary">
			{filteredQuestions.length} questions listed.
		</div>
		<div className="items">
			{filteredQuestions.map(question => <Question key={question.id} question={question}/>)}
		</div>
    </div>
}
export default Questions