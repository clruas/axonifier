import { useState, useEffect } from 'react'
import { supabase } from './client'

const Question = ({ question }) => {
	console.log(question)
	const { statement, answer } = question
	return <div className='question'>
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

const Questions = () => {
	const [questions, setQuestions] = useState([])
	useEffect(()=>{
		async function getQuestions(){
			let { data: questions, error } = await supabase
  				.from('questions')
  				.select('*')
			setQuestions(questions)
		}
		getQuestions()
	}, [])
	return <div className='questions'>
		{questions.map(question => <Question key={question.id} question={question}/>)}
	</div>
} 

function App() {
	
	return (
		<div className="App">
			<h1>Axonifier 3.0</h1>
			<Questions />
		</div>
	)
}
export default App


/*
1) create a project

	npm create vite@latest

2) install all dependencies for the project and test

	cd <PROJECT-NAME>	// go to project folder
	npm install		// install all dependencies
	npm run dev		// run project

3) stop the project
	
	CTRL+C

4) create a github repository


5) initialize a git repository and make the first commit

	git init
	git add .
	git commit -m "Create project"

6) add a git remote from repository created

	git branch -M main
	git remote add origin https://github.com/clruas/axonifier.git
	git push -u origin main

7) change vite config

	
	export default defineConfig({
	  base: '/axonifier/',
	  plugins: [react()]
	})


8) deploy the project

	npm run build
	
9) add and commit the deploy

	git add .
	git add dist -f
	git commit -m "deploy project"

10) deploy project

	git subtree push --prefix dist origin gh-pages
*/