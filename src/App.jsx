function App() {
	return (
		<div className="App">
			<h1>Axonifier 3.0</h1>
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